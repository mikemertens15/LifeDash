import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useHousehold } from '../household/HouseholdProvider';

// Supabase-backed store for the entertainment watchlist (games / shows / movies).
// Modeled directly on useTasks: items are scoped to the current household (RLS),
// each one optionally belongs to a member, and a realtime subscription keeps the
// list in sync across devices. Surface: { items, addItem, updateItem, removeItem }.
export function useMedia() {
  const { household, members } = useHousehold();
  const householdId = household?.id ?? null;
  const [rows, setRows] = useState([]);

  const nameById = useMemo(() => {
    const m = {};
    for (const mem of members) m[mem.id] = mem.name;
    return m;
  }, [members]);

  const idByName = useMemo(() => {
    const m = {};
    for (const mem of members) m[mem.name] = mem.id;
    return m;
  }, [members]);

  const fetchItems = useCallback(async () => {
    if (!householdId) {
      setRows([]);
      return;
    }
    const { data } = await supabase
      .from('media_items')
      .select('*')
      .eq('household_id', householdId)
      .order('created_at', { ascending: true });
    setRows(data ?? []);
  }, [householdId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Live sync: any insert/update/delete in this household refreshes the list.
  useEffect(() => {
    if (!householdId) return;
    const channel = supabase
      .channel(`media:${householdId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'media_items', filter: `household_id=eq.${householdId}` },
        () => fetchItems(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [householdId, fetchItems]);

  // Map DB rows to the shape the views expect (owner_member_id → owner name).
  const items = useMemo(
    () =>
      rows.map((r) => ({
        id: r.id,
        kind: r.kind,
        title: r.title,
        owner: nameById[r.owner_member_id] ?? null,
        status: r.status,
        platform: r.platform ?? undefined,
        intent: r.intent ?? undefined,
        service: r.service ?? undefined,
        rating: r.rating ?? undefined,
        note: r.note ?? undefined,
      })),
    [rows, nameById],
  );

  const addItem = useCallback(
    async ({ kind, title, owner, platform, intent, service }) => {
      if (!householdId) return;
      const { error } = await supabase.from('media_items').insert({
        household_id: householdId,
        kind,
        title: (title || '').trim() || 'Untitled',
        owner_member_id: idByName[owner] ?? null,
        status: 'backlog',
        platform: platform || null,
        intent: intent || null,
        service: service || null,
      });
      if (!error) fetchItems();
    },
    [householdId, idByName, fetchItems],
  );

  // Generic patch. Accepts an `owner` name and translates it to owner_member_id.
  const updateItem = useCallback(
    async (id, patch) => {
      const db = { ...patch };
      if ('owner' in db) {
        db.owner_member_id = idByName[db.owner] ?? null;
        delete db.owner;
      }
      // Optimistic; realtime + refetch reconcile the truth.
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...db } : r)));
      const { error } = await supabase.from('media_items').update(db).eq('id', id);
      if (error) fetchItems();
    },
    [idByName, fetchItems],
  );

  const removeItem = useCallback(
    async (id) => {
      setRows((rs) => rs.filter((r) => r.id !== id));
      const { error } = await supabase.from('media_items').delete().eq('id', id);
      if (error) fetchItems();
    },
    [fetchItems],
  );

  return { items, addItem, updateItem, removeItem };
}

// Shared label maps so the view and the dashboard card speak the same language.
export const MEDIA_KINDS = [
  ['game', 'Games'],
  ['show', 'Shows'],
  ['movie', 'Movies'],
];

// Full status labels, phrased per kind.
export const STATUS_LABEL = {
  game: { backlog: 'Backlog', active: 'Playing', done: 'Finished' },
  show: { backlog: 'Want to watch', active: 'Watching', done: 'Watched' },
  movie: { backlog: 'Want to watch', active: 'Watching', done: 'Watched' },
};

// Short labels for the compact per-row status control.
export const STATUS_SHORT = {
  game: { backlog: 'Backlog', active: 'Playing', done: 'Done' },
  show: { backlog: 'Want', active: 'Watching', done: 'Watched' },
  movie: { backlog: 'Want', active: 'Watching', done: 'Watched' },
};

export const KIND_NOUN = { game: 'Game', show: 'Show', movie: 'Movie' };

export const INTENT_LABEL = { completion: 'Going for 100%', fun: 'Just for fun' };
export const INTENT_SHORT = { completion: '100%', fun: 'For fun' };

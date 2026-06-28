import { useState } from 'react';
import { colors, fonts } from '../theme';
import { Card, Avatar } from '../components/ui';
import { useHousehold } from '../household/HouseholdProvider';
import { AddMediaModal } from '../components/AddMediaModal';
import { MEDIA_KINDS, STATUS_SHORT, STATUS_LABEL, INTENT_SHORT } from '../data/useMedia';

// Sections render in this lifecycle order, with the kind-aware heading.
const SECTIONS = ['active', 'backlog', 'done'];
const SECTION_HEADING = {
  game: { active: 'Playing now', backlog: 'Backlog', done: 'Finished' },
  show: { active: 'Watching', backlog: 'Want to watch', done: 'Watched' },
  movie: { active: 'Watching', backlog: 'Want to watch', done: 'Watched' },
};

export function WatchlistView({ items, addItem, updateItem, removeItem }) {
  const { order } = useHousehold();
  const [kind, setKind] = useState('game');
  const [owner, setOwner] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const ofKind = items.filter((i) => i.kind === kind);
  const visible = ofKind.filter((i) => owner === 'all' || i.owner === owner);
  const active = ofKind.filter((i) => i.status === 'active').length;

  const ownerChips = [['all', 'Everyone'], ...order.map((n) => [n, n])];
  const kindNounPlural = MEDIA_KINDS.find(([k]) => k === kind)[1].toLowerCase();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
        <div>
          <div style={{ font: `400 30px ${fonts.serif}`, color: colors.ink }}>Watchlist</div>
          <div style={{ font: `400 13.5px ${fonts.sans}`, color: colors.muted, marginTop: 2 }}>
            {ofKind.length} {kindNounPlural} · {active} in progress
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          style={{ padding: '9px 17px', borderRadius: 22, background: colors.accent, color: '#fff', font: `600 13px ${fonts.sans}`, boxShadow: '0 2px 8px rgba(194,114,74,.3)' }}
        >
          + Add to list
        </button>
      </div>

      {/* kind segmented control */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {MEDIA_KINDS.map(([key, label]) => {
          const sel = kind === key;
          return (
            <button
              key={key}
              onClick={() => setKind(key)}
              style={
                sel
                  ? { padding: '8px 18px', borderRadius: 20, background: colors.accent, color: '#fff', font: `600 13px ${fonts.sans}` }
                  : { padding: '8px 18px', borderRadius: 20, background: colors.card, border: `1px solid ${colors.cardBorder}`, color: colors.muted2, font: `500 13px ${fonts.sans}` }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* per-person filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {ownerChips.map(([key, label]) => {
          const sel = owner === key;
          return (
            <button
              key={key}
              onClick={() => setOwner(key)}
              style={
                sel
                  ? { padding: '7px 15px', borderRadius: 20, background: colors.chipBg, color: colors.ink, font: `600 12.5px ${fonts.sans}` }
                  : { padding: '7px 15px', borderRadius: 20, background: 'transparent', border: `1px solid ${colors.cardBorder}`, color: colors.muted2, font: `500 12.5px ${fonts.sans}` }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <Card style={{ padding: '40px 0', textAlign: 'center' }}>
          <div style={{ font: `400 15px ${fonts.sans}`, color: colors.muted }}>
            Nothing here yet — add a {kind} to get started.
          </div>
        </Card>
      ) : (
        SECTIONS.map((status) => {
          const group = visible.filter((i) => i.status === status);
          if (group.length === 0) return null;
          return (
            <div key={status} style={{ marginBottom: 22 }}>
              <div style={{ font: `400 18px ${fonts.serif}`, color: colors.ink, marginBottom: 10 }}>
                {SECTION_HEADING[kind][status]}
                <span style={{ font: `500 12px ${fonts.sans}`, color: colors.muted, marginLeft: 8 }}>{group.length}</span>
              </div>
              <Card style={{ padding: '4px 22px 8px' }}>
                {group.map((item, idx) => (
                  <MediaRow
                    key={item.id}
                    item={item}
                    topBorder={idx > 0}
                    onUpdate={updateItem}
                    onRemove={removeItem}
                  />
                ))}
              </Card>
            </div>
          );
        })
      )}

      {modalOpen && (
        <AddMediaModal defaultKind={kind} onClose={() => setModalOpen(false)} onAdd={addItem} />
      )}
    </div>
  );
}

function MediaRow({ item, topBorder, onUpdate, onRemove }) {
  const meta = [];
  if (item.kind === 'game') {
    if (item.platform) meta.push(item.platform);
    if (item.intent) meta.push(INTENT_SHORT[item.intent]);
  } else if (item.service) {
    meta.push(item.service);
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 0',
        borderTop: topBorder ? `1px solid ${colors.divider}` : 'none',
        flexWrap: 'wrap',
      }}
    >
      {item.owner && <Avatar who={item.owner} size={30} />}
      <div style={{ flex: 1, minWidth: 140 }}>
        <div style={{ font: `600 14px ${fonts.sans}`, color: colors.ink }}>{item.title}</div>
        <div style={{ font: `400 12px ${fonts.sans}`, color: colors.muted, marginTop: 2 }}>
          {[item.owner, ...meta].filter(Boolean).join(' · ') || '—'}
        </div>
      </div>

      {item.status === 'done' && <Stars value={item.rating} onSet={(r) => onUpdate(item.id, { rating: r })} />}

      <StatusControl kind={item.kind} value={item.status} onSet={(s) => onUpdate(item.id, { status: s })} />

      <button
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.title}`}
        title="Remove"
        style={{ width: 26, height: 26, borderRadius: '50%', color: colors.faint, fontSize: 16, lineHeight: 1, flexShrink: 0 }}
      >
        ×
      </button>
    </div>
  );
}

function StatusControl({ kind, value, onSet }) {
  const labels = STATUS_SHORT[kind];
  return (
    <div style={{ display: 'flex', gap: 4, background: colors.inputBg, borderRadius: 20, padding: 3, flexShrink: 0 }}>
      {['backlog', 'active', 'done'].map((s) => {
        const sel = value === s;
        return (
          <button
            key={s}
            onClick={() => onSet(s)}
            aria-pressed={sel}
            title={STATUS_LABEL[kind][s]}
            style={{
              padding: '5px 11px',
              borderRadius: 18,
              background: sel ? colors.accent : 'transparent',
              color: sel ? '#fff' : colors.muted2,
              font: `${sel ? 600 : 500} 11.5px ${fonts.sans}`,
              whiteSpace: 'nowrap',
            }}
          >
            {labels[s]}
          </button>
        );
      })}
    </div>
  );
}

function Stars({ value = 0, onSet }) {
  return (
    <div style={{ display: 'flex', gap: 1, flexShrink: 0 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onSet(n === value ? null : n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          style={{ padding: '0 1px', fontSize: 15, lineHeight: 1, color: n <= value ? colors.accent : '#dcc9b0' }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

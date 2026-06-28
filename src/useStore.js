import { useState, useEffect, useCallback } from 'react';
import { seedTasks } from './seed';

// Tasks are the interactive, mutable part of the app, so they're the piece we
// persist. Vehicles + systems are static seed data for this first version.
const KEY = 'tend.tasks.v1';

function loadTasks() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* corrupt or unavailable storage — fall back to seed */
  }
  return seedTasks;
}

export function useStore() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch {
      /* storage full or blocked — ignore, app still works in-memory */
    }
  }, [tasks]);

  const toggle = useCallback((id) => {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const addTask = useCallback(({ title, cat, who }) => {
    setTasks((ts) => [
      ...ts,
      {
        id: Date.now(),
        title: (title || '').trim() || 'Untitled task',
        cat,
        who,
        dueType: 'soon',
        dueLabel: 'This week',
        day: 4,
        done: false,
      },
    ]);
  }, []);

  const resetTasks = useCallback(() => setTasks(seedTasks), []);

  return { tasks, toggle, addTask, resetTasks };
}

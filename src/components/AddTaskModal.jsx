import { useState, useEffect, useRef } from 'react';
import { colors, fonts } from '../theme';
import { Avatar } from './ui';
import { useHousehold } from '../household/HouseholdProvider';

const CATS = [
  ['chore', 'Chore'],
  ['vehicle', 'Vehicle'],
  ['system', 'Home system'],
];

export function AddTaskModal({ onClose, onAdd }) {
  const { order, currentMember } = useHousehold();
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('chore');
  const [who, setWho] = useState(currentMember?.name || order[0] || '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function submit() {
    onAdd({ title, cat, who });
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        background: 'rgba(58,46,37,.4)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Add a task"
        style={{
          width: 460,
          maxWidth: '100%',
          background: colors.card,
          borderRadius: 22,
          padding: '28px 30px',
          boxShadow: '0 24px 60px rgba(40,25,15,.3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div style={{ font: `400 25px ${fonts.serif}`, color: colors.ink }}>Add a task</div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ width: 30, height: 30, borderRadius: '50%', background: colors.chipBg, color: colors.muted2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}
          >
            ×
          </button>
        </div>

        <Label>What needs doing?</Label>
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="e.g. Clean out the garage"
          style={{
            width: '100%',
            border: '1px solid #e5d6c3',
            background: colors.inputBg,
            borderRadius: 12,
            padding: '12px 14px',
            font: `500 14px ${fonts.sans}`,
            color: colors.ink,
            outline: 'none',
            marginBottom: 20,
          }}
        />

        <Label>Category</Label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {CATS.map(([key, label]) => {
            const active = cat === key;
            return (
              <button
                key={key}
                onClick={() => setCat(key)}
                style={
                  active
                    ? { padding: '9px 15px', borderRadius: 12, background: colors.accent, color: '#fff', font: `600 12.5px ${fonts.sans}` }
                    : { padding: '9px 15px', borderRadius: 12, background: colors.inputBg, border: `1px solid ${colors.cardBorder}`, color: colors.muted2, font: `500 12.5px ${fonts.sans}` }
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        <Label>Assign to</Label>
        <div style={{ display: 'flex', gap: 10, marginBottom: 26 }}>
          {order.map((name) => {
            const sel = who === name;
            return (
              <button
                key={name}
                onClick={() => setWho(name)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 6px',
                  borderRadius: 14,
                  flex: 1,
                  background: sel ? colors.chipBg : 'transparent',
                  border: `1px solid ${sel ? '#e2b07f' : 'transparent'}`,
                }}
              >
                <Avatar who={name} size={40} />
                <div style={{ font: `500 11px ${fonts.sans}`, color: colors.muted3 }}>{name}</div>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '11px 20px', borderRadius: 22, font: `600 13px ${fonts.sans}`, color: colors.muted2 }}>
            Cancel
          </button>
          <button
            onClick={submit}
            style={{ padding: '11px 22px', borderRadius: 22, background: colors.accent, color: '#fff', font: `600 13px ${fonts.sans}`, boxShadow: '0 2px 8px rgba(194,114,74,.3)' }}
          >
            Add to this week
          </button>
        </div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ font: `600 12px ${fonts.sans}`, color: colors.muted2, marginBottom: 8 }}>{children}</div>;
}

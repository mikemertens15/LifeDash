import { colors, fonts, currentUser } from '../theme';
import { Avatar } from './ui';

const NAV = [
  ['home', 'Home'],
  ['chores', 'Chores'],
  ['vehicles', 'Vehicles'],
  ['systems', 'Systems'],
  ['calendar', 'Calendar'],
];

export function TopNav({ view, setView, onAdd }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '16px 36px',
        background: colors.navBar,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${colors.cardBorder}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 30, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: colors.accent }} />
          <div style={{ font: `400 25px ${fonts.serif}`, color: colors.ink, lineHeight: 1 }}>Tend</div>
        </div>
        <nav
          style={{
            display: 'flex',
            gap: 4,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {NAV.map(([key, label]) => {
            const active = view === key;
            return (
              <button
                key={key}
                onClick={() => setView(key)}
                style={{
                  padding: '8px 15px',
                  borderRadius: 22,
                  whiteSpace: 'nowrap',
                  background: active ? colors.chipBg : 'transparent',
                  color: active ? colors.ink : colors.muted2,
                  font: `${active ? 600 : 500} 13.5px ${fonts.sans}`,
                }}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <button
          onClick={onAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '9px 17px',
            borderRadius: 22,
            background: colors.accent,
            color: '#fff',
            font: `600 13px ${fonts.sans}`,
            boxShadow: '0 2px 8px rgba(194,114,74,.3)',
          }}
        >
          <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>+</span> Add task
        </button>
        <Avatar who={currentUser} size={36} />
      </div>
    </div>
  );
}

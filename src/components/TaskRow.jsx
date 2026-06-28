import { colors } from '../theme';
import { Avatar, Check, Pill } from './ui';

// One task line. Used in Home's "Up next" (subtitle variant) and the Chores
// list (avatar variant).
export function TaskRow({ task, subtitle, showAvatar = false, onToggle, pad = 13, topBorder = true }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: `${pad}px 0`,
        borderTop: topBorder ? `1px solid ${colors.divider}` : 'none',
      }}
    >
      <Check done={task.done} onClick={() => onToggle(task.id)} />
      {showAvatar && <Avatar who={task.who} size={30} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            font: "600 14px 'Hanken Grotesk'",
            color: task.done ? colors.faint : colors.ink,
            textDecoration: task.done ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </div>
        <div style={{ font: "400 12px 'Hanken Grotesk'", color: colors.muted, marginTop: 2 }}>
          {subtitle}
        </div>
      </div>
      <Pill task={task} />
    </div>
  );
}

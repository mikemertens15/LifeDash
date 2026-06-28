import { colors, tone, fonts, people } from '../theme';
import { weekRangeLabel } from '../dates';
import { useIsNarrow } from '../useMediaQuery';

function chipColor(t) {
  if (t.done) return tone.green;
  if (t.dueType === 'overdue') return tone.red;
  return people[t.who] ? people[t.who].bg : tone.amber;
}

export function CalendarView({ tasks, week }) {
  const narrow = useIsNarrow();
  const { days, todayIndex } = week;

  return (
    <div>
      <div style={{ font: `400 30px ${fonts.serif}`, color: colors.ink, marginBottom: 4 }}>This week</div>
      <div style={{ font: `400 13.5px ${fonts.sans}`, color: colors.muted, marginBottom: 20 }}>
        {weekRangeLabel(days)} · everything due, by day.
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: narrow ? '1fr' : 'repeat(7,1fr)',
          gap: 10,
        }}
      >
        {days.map((d, i) => {
          const isToday = i === todayIndex;
          const items = tasks.filter((t) => t.day === i);
          return (
            <div
              key={d.dow}
              style={{
                background: isToday ? '#fff7ee' : colors.card,
                border: `1px solid ${isToday ? '#e2b07f' : colors.cardBorder}`,
                borderRadius: 14,
                padding: '12px 10px',
                minHeight: narrow ? 'auto' : 260,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <div style={{ font: `600 12px ${fonts.sans}`, color: '#8a7257', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                  {d.dow}
                </div>
                <div
                  style={
                    isToday
                      ? { width: 22, height: 22, borderRadius: '50%', background: colors.accent, color: '#fff', font: `600 12px ${fonts.sans}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
                      : { font: `600 13px ${fonts.sans}`, color: colors.ink }
                  }
                >
                  {d.num}
                </div>
              </div>

              {items.map((t) => (
                <div
                  key={t.id}
                  style={{
                    display: 'flex',
                    gap: 6,
                    alignItems: 'flex-start',
                    background: colors.inputBg,
                    borderRadius: 8,
                    padding: '7px 8px',
                    marginBottom: 6,
                    opacity: t.done ? 0.55 : 1,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: chipColor(t), flexShrink: 0, marginTop: 4 }} />
                  <div style={{ font: `500 11px ${fonts.sans}`, color: colors.ink, lineHeight: 1.25, overflow: 'hidden' }}>
                    {t.title}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

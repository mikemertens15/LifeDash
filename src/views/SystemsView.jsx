import { colors, tone, fonts } from '../theme';
import { Card } from '../components/ui';
import { statusColor } from './HomeView';
import { useIsNarrow } from '../useMediaQuery';

export function SystemsView({ systems }) {
  const narrow = useIsNarrow();

  return (
    <div>
      <div style={{ font: `400 30px ${fonts.serif}`, color: colors.ink, marginBottom: 4 }}>Home systems</div>
      <div style={{ font: `400 13.5px ${fonts.sans}`, color: colors.muted, marginBottom: 20 }}>
        The slow, easy-to-forget upkeep that keeps the house healthy.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 1fr', gap: 16 }}>
        {systems.map((s) => (
          <Card key={s.name} style={{ padding: '20px 22px', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: tone[s.tone],
                flexShrink: 0,
                boxShadow: `0 0 0 5px ${tone[s.tone]}22`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ font: `600 15.5px ${fonts.sans}`, color: colors.ink }}>{s.name}</div>
              <div style={{ font: `400 12px ${fonts.sans}`, color: colors.muted, marginTop: 2 }}>{s.detail}</div>
            </div>
            <div style={{ font: `600 12px ${fonts.sans}`, color: statusColor(s.tone), whiteSpace: 'nowrap' }}>{s.status}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

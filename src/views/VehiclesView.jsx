import { colors, tone, fonts } from '../theme';
import { Card, ProgressBar } from '../components/ui';
import { useIsNarrow } from '../useMediaQuery';

export function VehiclesView({ vehicles }) {
  const narrow = useIsNarrow();

  return (
    <div>
      <div style={{ font: `400 30px ${fonts.serif}`, color: colors.ink, marginBottom: 4 }}>Vehicles</div>
      <div style={{ font: `400 13.5px ${fonts.sans}`, color: colors.muted, marginBottom: 20 }}>
        Keep the family rolling — service, registration, tires.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 1fr', gap: 22 }}>
        {vehicles.map((v) => (
          <Card key={v.name} style={{ padding: '24px 26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ font: `600 17px ${fonts.sans}`, color: colors.ink }}>{v.name}</div>
                <div style={{ font: `400 12.5px ${fonts.sans}`, color: colors.muted, marginTop: 2 }}>
                  {v.miles} · {v.driver}
                </div>
              </div>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: colors.chipBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                🚗
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', font: `500 12px ${fonts.sans}`, color: colors.muted, margin: '22px 0 7px' }}>
              <span>Next oil change</span>
              <span style={{ color: v.urgent ? tone.red : tone.green, fontWeight: 600 }}>{v.oilLeft}</span>
            </div>
            <ProgressBar pct={v.oilPct} height={8} fill={v.urgent ? colors.accent : tone.green} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 22 }}>
              <Stat label="Registration" value={v.reg} />
              <Stat label="Tires rotated" value={v.tires} />
              <Stat label="Insurance" value={v.ins} />
              <Stat label="Last service" value={v.service} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ background: colors.inputBg, borderRadius: 12, padding: '13px 15px' }}>
      <div style={{ font: `400 11px ${fonts.sans}`, color: colors.muted }}>{label}</div>
      <div style={{ font: `600 15px ${fonts.sans}`, color: colors.ink, marginTop: 3 }}>{value}</div>
    </div>
  );
}

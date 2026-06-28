// Demo data for the Vehicles + Systems views. These are still shared, read-only
// seed data (the same for every household) — making them per-household is the
// natural next step. Tasks, by contrast, now live per-household in Supabase.

export const seedSystems = [
  { name: 'HVAC filter',     tone: 'red',   status: 'Overdue 3d', detail: 'Every 90 days · last changed Mar 18' },
  { name: 'Smoke detectors', tone: 'amber', status: 'Batteries',  detail: 'Test monthly · batteries due' },
  { name: 'Water heater',    tone: 'amber', status: 'In 3 wks',   detail: 'Flush yearly · last done Jul 2025' },
  { name: 'Gutters',         tone: 'green', status: 'Next fall',  detail: 'Clear twice a year · last Oct' },
  { name: 'Dryer vent',      tone: 'green', status: 'Good',       detail: 'Clean yearly · last Feb' },
  { name: 'Fridge coils',    tone: 'green', status: 'Good',       detail: 'Vacuum twice a year · last Apr' },
];

export const seedVehicles = [
  { name: '2019 Honda CR-V',     miles: '45,000 mi', driver: 'Marcus', oilPct: 93, oilLeft: '~200 mi',  urgent: true,  reg: 'Aug 14', tires: 'May 2026', ins: 'Renews Sep 1', service: 'Mar 2026' },
  { name: '2021 Subaru Outback', miles: '31,000 mi', driver: 'Lena',   oilPct: 40, oilLeft: '1,800 mi', urgent: false, reg: 'Nov 2',  tires: 'Apr 2026', ins: 'Renews Sep 1', service: 'Apr 2026' },
];

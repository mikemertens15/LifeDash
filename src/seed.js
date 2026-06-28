// Initial demo data for the Rivera household, ported from the design handoff.
// `day` is the day-of-week index for the current week: 0 = Mon … 6 = Sun.

export const seedTasks = [
  { id: 1,  title: 'Replace HVAC filter',               cat: 'system',  who: 'Lena',   note: 'whole house', dueType: 'overdue', dueLabel: '3d late',   day: 0, done: false },
  { id: 2,  title: 'Replace smoke detector batteries',  cat: 'system',  who: 'Marcus',                      dueType: 'overdue', dueLabel: '1d late',   day: 0, done: false },
  { id: 3,  title: 'Take trash & recycling out',        cat: 'chore',   who: 'Theo',                        dueType: 'today',   dueLabel: 'Today',     day: 4, done: false },
  { id: 4,  title: 'Vacuum upstairs',                   cat: 'chore',   who: 'Amara',                       dueType: 'today',   dueLabel: 'Today',     day: 4, done: false },
  { id: 5,  title: 'Honda CR-V oil change',             cat: 'vehicle', who: 'Marcus',                      dueType: 'soon',    dueLabel: '~2 days',   day: 6, done: false },
  { id: 6,  title: 'Kitchen deep clean',                cat: 'chore',   who: 'Lena',                        dueType: 'soon',    dueLabel: 'Sat',       day: 5, done: false },
  { id: 7,  title: 'Mow the lawn',                      cat: 'chore',   who: 'Theo',                        dueType: 'soon',    dueLabel: 'Sat',       day: 5, done: false },
  { id: 8,  title: 'Clean the bathrooms',              cat: 'chore',   who: 'Amara',                       dueType: 'soon',    dueLabel: 'Sun',       day: 6, done: false },
  { id: 9,  title: 'Water heater flush',                cat: 'system',  who: 'Marcus',                      dueType: 'soon',    dueLabel: 'Sun',       day: 6, done: false },
  { id: 10, title: 'Fold & put away laundry',           cat: 'chore',   who: 'Lena',                        dueType: 'soon',    dueLabel: 'Wed',       day: 2, done: false },
  { id: 11, title: 'Water the garden',                  cat: 'chore',   who: 'Amara',                       dueType: 'soon',    dueLabel: 'Thu',       day: 3, done: true  },
  { id: 12, title: 'Load & run the dishwasher',         cat: 'chore',   who: 'Theo',                        dueType: 'soon',    dueLabel: 'Thu',       day: 3, done: true  },
  { id: 13, title: 'Wipe kitchen counters',             cat: 'chore',   who: 'Amara',                       dueType: 'soon',    dueLabel: 'Wed',       day: 2, done: true  },
  { id: 14, title: 'Sweep the front porch',             cat: 'chore',   who: 'Theo',                        dueType: 'soon',    dueLabel: 'Tue',       day: 1, done: true  },
  { id: 15, title: 'Tidy the living room',              cat: 'chore',   who: 'Lena',                        dueType: 'soon',    dueLabel: 'Mon',       day: 0, done: true  },
];

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

// Direction B — "Warm & homey" palette, ported from the Tend design handoff.

export const colors = {
  bg: '#f4ece1',
  card: '#fffdf9',
  cardBorder: '#ece0d0',
  navBar: 'rgba(255,253,249,.92)',
  accent: '#c2724a',
  accentDark: '#ad6340',
  ink: '#3a2e25',
  muted: '#a8906f',
  muted2: '#8a7257',
  muted3: '#6b5640',
  faint: '#bba88c',
  divider: '#f3eadd',
  chipBg: '#f3e7d8',
  inputBg: '#faf2e8',
  track: '#f0e5d6',
};

// Status tones for systems / vehicles.
export const tone = {
  red: '#c0654b',
  amber: '#d8a657',
  amberText: '#b07d2e',
  green: '#7f9b86',
};

export const people = {
  Lena:   { initial: 'L', bg: '#e2b4ba', color: '#5a2730' },
  Marcus: { initial: 'M', bg: '#a9c3b3', color: '#234034' },
  Amara:  { initial: 'A', bg: '#e6cda0', color: '#5a4419' },
  Theo:   { initial: 'T', bg: '#b6cbe0', color: '#274056' },
};

export const order = ['Lena', 'Marcus', 'Amara', 'Theo'];

// The signed-in member (top-right avatar + greeting).
export const currentUser = 'Lena';

export const catLabel = { chore: 'Chore', vehicle: 'Vehicle', system: 'Home' };

export const fonts = {
  sans: "'Hanken Grotesk', system-ui, sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
  mono: "'Space Mono', ui-monospace, monospace",
};

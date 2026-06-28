# Tend — Home Maintenance Dashboard

A warm, family-friendly dashboard for keeping a household on track: chores,
vehicles, and the slow-burn home systems (HVAC filters, water heater, gutters)
that are easy to forget. Built from the "Direction B — Warm & homey" design.

The hero question, every week: **what needs doing.**

## Stack

- **React 19 + Vite** — runs as a responsive web app on desktop, phone, and a
  kitchen tablet. Installable as a PWA later.
- **Supabase backend** — Postgres + Auth + Row-Level Security. Family members
  sign in with a passwordless **magic link**, create or join a **household**
  (the shared space) via an invite code, and **tasks sync in real time** across
  every device. Each household's data is isolated by RLS. Vehicles & systems are
  still shared demo seed data — making them per-household is the next step.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

### Backend config

The Supabase URL + publishable key live in `.env.local` (gitignored):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

One-time setup in the Supabase dashboard → **Authentication → URL Configuration**:
add your app origins (e.g. `http://localhost:5173` for dev, plus any deployed
URL) to **Site URL / Redirect URLs** so magic-link emails redirect back to the
app.

## Where things live

```
src/
  App.jsx            # auth/household gating + nav + view switching + modal wiring
  theme.js           # palette, fonts, avatar color palette
  seed.js            # demo data (vehicles, systems)
  dates.js           # live week / greeting / "today" helpers
  useMediaQuery.js   # responsive breakpoints
  lib/supabase.js    # configured Supabase browser client
  auth/              # AuthProvider (session + magic link), SignIn screen
  household/         # HouseholdProvider (members/roster), Onboarding, HouseholdModal
  data/useTasks.js   # Supabase-backed tasks: CRUD + realtime sync (was useStore)
  components/        # TopNav, AddTaskModal, TaskRow, shared UI (Avatar, Pill…)
  views/             # HomeView, ChoresView, VehiclesView, SystemsView, CalendarView
```

The database schema (households, household_members, tasks), Row-Level Security
policies, and the `create_household` / `join_household` RPCs live as Supabase
migrations on the project.

## Views

- **Home** — week counts (to do / overdue / done), per-person chore progress,
  "Up next", plus driveway and house-health summaries.
- **Chores** — filter by family member, check things off.
- **Vehicles** — oil-change countdowns, registration, tires, insurance.
- **Systems** — recurring upkeep with red/amber/green status.
- **Calendar** — the current week, everything due by day.

## Ideas for next

- Per-household vehicles & systems (currently shared demo seed data, read-only).
- Recurring tasks that auto-reschedule when completed.
- Email-based invites (alongside the current shareable join code).
- PWA manifest + service worker for offline + home-screen install.
- The design also includes skins **A** (calm/minimal) and **C** (dark wall
  display) if you want a theme switcher later.
```

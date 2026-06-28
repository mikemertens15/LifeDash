# Tend — Home Maintenance Dashboard

A warm, family-friendly dashboard for keeping a household on track: chores,
vehicles, and the slow-burn home systems (HVAC filters, water heater, gutters)
that are easy to forget. Built from the "Direction B — Warm & homey" design.

The hero question, every week: **what needs doing.**

## Stack

- **React 19 + Vite** — runs as a responsive web app on desktop, phone, and a
  kitchen tablet. Installable as a PWA later.
- **No backend (yet).** Tasks are saved in the browser via `localStorage`, so
  the app is fully usable on one device today. Multi-user sync (e.g. Supabase)
  is the natural next step.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Where things live

```
src/
  App.jsx            # nav + view switching + modal wiring
  theme.js           # palette, fonts, family members
  seed.js            # demo data (tasks, vehicles, systems)
  dates.js           # live week / greeting / "today" helpers
  useStore.js        # task state + localStorage persistence
  useMediaQuery.js   # responsive breakpoints
  components/        # TopNav, AddTaskModal, TaskRow, shared UI (Avatar, Pill…)
  views/             # HomeView, ChoresView, VehiclesView, SystemsView, CalendarView
```

## Views

- **Home** — week counts (to do / overdue / done), per-person chore progress,
  "Up next", plus driveway and house-health summaries.
- **Chores** — filter by family member, check things off.
- **Vehicles** — oil-change countdowns, registration, tires, insurance.
- **Systems** — recurring upkeep with red/amber/green status.
- **Calendar** — the current week, everything due by day.

## Ideas for next

- Accounts + shared database so the whole family syncs across devices.
- Recurring tasks that auto-reschedule when completed.
- Editable vehicles/systems (currently seed data).
- PWA manifest + service worker for offline + home-screen install.
- The design also includes skins **A** (calm/minimal) and **C** (dark wall
  display) if you want a theme switcher later.
```

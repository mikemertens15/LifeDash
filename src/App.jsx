import { useState, useMemo } from 'react';
import { colors } from './theme';
import { getWeek } from './dates';
import { useStore } from './useStore';
import { seedSystems, seedVehicles } from './seed';
import { TopNav } from './components/TopNav';
import { AddTaskModal } from './components/AddTaskModal';
import { HomeView } from './views/HomeView';
import { ChoresView } from './views/ChoresView';
import { VehiclesView } from './views/VehiclesView';
import { SystemsView } from './views/SystemsView';
import { CalendarView } from './views/CalendarView';

export default function App() {
  const [view, setView] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const { tasks, toggle, addTask } = useStore();

  // Computed once per mount — the real current week drives greeting + calendar.
  const week = useMemo(() => getWeek(), []);

  return (
    <div style={{ minHeight: '100vh', background: colors.bg }}>
      <TopNav view={view} setView={setView} onAdd={() => setModalOpen(true)} />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '30px 36px 70px' }}>
        {view === 'home' && (
          <HomeView
            tasks={tasks}
            systems={seedSystems}
            vehicles={seedVehicles}
            week={week}
            onToggle={toggle}
            setView={setView}
          />
        )}
        {view === 'chores' && <ChoresView tasks={tasks} onToggle={toggle} onAdd={() => setModalOpen(true)} />}
        {view === 'vehicles' && <VehiclesView vehicles={seedVehicles} />}
        {view === 'systems' && <SystemsView systems={seedSystems} />}
        {view === 'calendar' && <CalendarView tasks={tasks} week={week} />}
      </main>

      {modalOpen && <AddTaskModal onClose={() => setModalOpen(false)} onAdd={addTask} />}
    </div>
  );
}

import React, { useEffect } from 'react';
import { useAppStore } from './store/useStore';
import { SidebarRail } from './components/layout/SidebarRail';
import { PaperpillarHeader } from './components/layout/PaperpillarHeader';
import { PaperpillarDashboard } from './components/dashboard/PaperpillarDashboard';
import { FullMapPage } from './components/map/FullMapPage';
import { StormDetailPage } from './components/storm-detail/StormDetailPage';
import { ArchivePage } from './components/archive/ArchivePage';
import { AlertsPage } from './components/alerts/AlertsPage';
import { ReplayPage } from './components/replay/ReplayPage';
import { ModelPage } from './components/model/ModelPage';
import { SearchModal } from './components/common/SearchModal';
import { FirstRunTour } from './components/common/FirstRunTour';

export default function App() {
  const { currentTab, setTourOpen, setTab } = useAppStore();

  // Show tour on first visit if not completed
  useEffect(() => {
    const isCompleted = localStorage.getItem('cyclonewatch_tour_completed');
    if (!isCompleted) {
      setTourOpen(true);
    }
  }, [setTourOpen]);

  // Keyboard navigation shortcuts (1 to 7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.key === '1') setTab('dashboard');
      if (e.key === '2') setTab('map');
      if (e.key === '3') setTab('storms');
      if (e.key === '4') setTab('archive');
      if (e.key === '5') setTab('alerts');
      if (e.key === '6') setTab('replay');
      if (e.key === '7') setTab('model');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D9E9DE] via-[#E6EFE9] to-[#CFE2D5] p-2 sm:p-4 lg:p-6 flex flex-col items-center justify-start text-[#1C261F] antialiased selection:bg-[#B6D6C0] selection:text-[#132017]">
      {/* Floating Paperpillar Rounded Shell */}
      <div className="w-full max-w-[1560px] bg-[#FAFBF9] border border-white/80 rounded-[28px] sm:rounded-[32px] paper-shell-shadow flex flex-col md:flex-row overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-48px)]">
        {/* Paperpillar Vertical Navigation Rail (Desktop) */}
        <SidebarRail />

        {/* Main App Stage */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FAFBF9]">
          <PaperpillarHeader />

          {/* Dynamic Page Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {currentTab === 'dashboard' && <PaperpillarDashboard />}
            {currentTab === 'map' && <FullMapPage />}
            {currentTab === 'storms' && <StormDetailPage />}
            {currentTab === 'archive' && <ArchivePage />}
            {currentTab === 'alerts' && <AlertsPage />}
            {currentTab === 'replay' && <ReplayPage />}
            {currentTab === 'model' && <ModelPage />}
          </div>
        </div>
      </div>

      {/* Global Search & Tour Modals */}
      <SearchModal />
      <FirstRunTour />
    </div>
  );
}

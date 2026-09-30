import React from 'react';
import { useAppStore, AppTab } from '../../store/useStore';
import { Search, Bell, Clock, Compass, ChevronDown, Check } from 'lucide-react';
import { STORMS_DATA, ALERTS_DATA } from '../../data/mockData';

export const PaperpillarHeader: React.FC = () => {
  const {
    activeStormId,
    setActiveStorm,
    setSearchOpen,
    unitWind,
    setUnitWind,
    currentTab,
    setTab,
    mode
  } = useAppStore();

  const currentStorm = STORMS_DATA.find(s => s.id === activeStormId) || STORMS_DATA[0];
  const activeAlerts = ALERTS_DATA.filter(a => a.status === 'active');

  const navTabs: { id: AppTab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'map', label: 'Live Map' },
    { id: 'storms', label: 'Storm Detail' },
    { id: 'archive', label: 'Archive' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'replay', label: 'Replay' },
    { id: 'model', label: 'Model Specs' }
  ];

  return (
    <header className="px-5 lg:px-8 py-4 border-b border-[#E8EFEA] bg-[#FAFBF9] flex flex-col gap-3">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Greeting & Active Storm Select */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C2520]">
              Hello, Operator!
            </h1>
            {/* Active Storm Selector Dropdown */}
            <div className="relative inline-block">
              <select
                value={activeStormId}
                onChange={e => setActiveStorm(e.target.value)}
                className="text-xs font-semibold font-mono bg-white text-[#274332] py-1.5 pl-3 pr-7 rounded-full border border-[#DCE7DF] shadow-xs cursor-pointer appearance-none hover:border-[#B5CDC0] focus:outline-none"
              >
                {STORMS_DATA.map(s => (
                  <option key={s.id} value={s.id}>
                    Cyclone {s.name} ({s.basin})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#5C6E63] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <p className="text-xs text-[#6A7970] mt-0.5">
            Operational Cyclone Decision Support & 48h Trajectory Predictions · {currentStorm.basin}
          </p>
        </div>

        {/* Right: Search Pill & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Paperpillar Search Bar Pill */}
          <div
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-between bg-white rounded-full border border-[#DCE7DF] shadow-xs pl-3.5 pr-1 py-1 w-44 sm:w-60 cursor-pointer hover:border-[#B5CDC0] transition-colors"
          >
            <span className="text-xs text-[#7A8A80] truncate">Search systems, alerts...</span>
            <div className="w-7 h-7 rounded-full bg-[#1C2520] text-white flex items-center justify-center shrink-0">
              <Search className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Unit Toggle Pill */}
          <div className="flex items-center bg-[#F0F5F1] p-0.5 rounded-full border border-[#DCE7DF] text-xs font-mono">
            <button
              onClick={() => setUnitWind('kt')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                unitWind === 'kt'
                  ? 'bg-white font-bold text-[#1C2520] shadow-xs'
                  : 'text-[#6A7970] hover:text-[#1C2520]'
              }`}
            >
              kt
            </button>
            <button
              onClick={() => setUnitWind('kmh')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                unitWind === 'kmh'
                  ? 'bg-white font-bold text-[#1C2520] shadow-xs'
                  : 'text-[#6A7970] hover:text-[#1C2520]'
              }`}
            >
              km/h
            </button>
          </div>

          {/* Replay indicator */}
          <button
            onClick={() => setTab('replay')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-[#EBF4EE] text-[#274332] border border-[#D4E5DB] hover:bg-[#E1EDE5] transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-[#3F7356]" />
            <span>{mode === 'replay' ? 'REPLAY' : 'REALTIME'}</span>
          </button>

          {/* Notification Bell in Circle */}
          <button
            onClick={() => setTab('alerts')}
            className="relative w-9 h-9 rounded-full bg-white border border-[#DCE7DF] flex items-center justify-center text-[#5C6E63] hover:text-[#1C2520] hover:border-[#B5CDC0] shadow-xs transition-colors cursor-pointer"
            aria-label="Alerts"
            title="Active Bulletins"
          >
            <Bell className="w-4 h-4" />
            {activeAlerts.length > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#D95D39] ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile-only Nav Pills row */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-[#F0F5F1]">
        {navTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              currentTab === tab.id
                ? 'bg-[#1C2520] text-white font-semibold shadow-xs'
                : 'bg-white text-[#6A7970] border border-[#E8EFEA]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};

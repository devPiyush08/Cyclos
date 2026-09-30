import React from 'react';
import { useAppStore, AppTab } from '../../store/useStore';
import { Search, Sun, Moon, HelpCircle } from 'lucide-react';

export const TopNav: React.FC = () => {
  const {
    currentTab,
    setTab,
    theme,
    toggleTheme,
    unitWind,
    setUnitWind,
    setSearchOpen,
    setTourOpen,
    mode
  } = useAppStore();

  const navLinks: { id: AppTab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'map', label: 'Live Map' },
    { id: 'storms', label: 'Storm Detail' },
    { id: 'archive', label: 'Archive' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'replay', label: 'Replay' },
    { id: 'model', label: 'Model Specs' }
  ];

  return (
    <header className="sticky top-0 z-40 h-[62px] bg-[#FAF8F5]/95 dark:bg-[#161A22]/95 backdrop-blur-md border-b border-[#E8E2D6] dark:border-[#28303D] px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Zone 1: Bespoke refined brand wordmark with natural ostrich icon */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTab('dashboard')}
          className="text-left group flex items-center gap-2.5 focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-[#232C37] dark:bg-[#EAE4D9] text-[#FAF8F5] dark:text-[#161A22] flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 6a6 6 0 1 0 6 6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#1C222B] dark:text-[#EAEFF5] transition-colors">
                CycloneWatch
              </span>
              <span className="hidden xl:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#EFE9DF] dark:bg-[#232A36] text-[#716859] dark:text-[#A7B2C2]">
                PS 26070
              </span>
            </div>
          </div>
        </button>

        {/* Minimal Mode Pill */}
        <span
          className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
            mode === 'replay'
              ? 'bg-[#F2ECE0] text-[#785E2F] dark:bg-[#332A1C] dark:text-[#E2C38A] border border-[#DFD3BE]'
              : 'bg-[#E7EFEA] text-[#2F5844] dark:bg-[#1E2E25] dark:text-[#96D1B2] border border-[#CCDCD2]'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              mode === 'replay' ? 'bg-[#9C7632]' : 'bg-[#438260] animate-pulse'
            }`}
          />
          {mode === 'replay' ? 'REPLAY' : 'REALTIME'}
        </span>
      </div>

      {/* Zone 2: Refined Natural SaaS Tab Navigation */}
      <nav className="hidden md:flex items-center gap-1 bg-[#F1ECE3]/80 dark:bg-[#1C222E]/80 p-1 rounded-xl border border-[#E5DFD4] dark:border-[#2C3444]">
        {navLinks.map(link => {
          const isActive = currentTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setTab(link.id)}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#273040] text-[#1C222B] dark:text-white font-semibold shadow-xs'
                  : 'text-[#635E54] dark:text-[#9BA5B5] hover:text-[#1C222B] dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Actions & Clean Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Quick Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#635E54] hover:text-[#1C222B] dark:text-[#9BA5B5] dark:hover:text-white bg-[#F3EFE7] dark:bg-[#202734] border border-[#E6E0D4] dark:border-[#2D3646] rounded-xl hover:bg-[#EFE9DF] transition-colors cursor-pointer"
          title="Search systems (Press /)"
          aria-label="Search systems"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-mono">Search</span>
          <kbd className="hidden lg:inline text-[10px] font-mono px-1 bg-white dark:bg-[#283244] rounded border border-[#DFD8CC] dark:border-[#384358] text-[#7A7468] dark:text-slate-300">
            /
          </kbd>
        </button>

        {/* Unit Toggle */}
        <div className="flex items-center bg-[#F1ECE3] dark:bg-[#202734] p-0.5 rounded-xl border border-[#E5DFD4] dark:border-[#2D3646] text-xs font-mono">
          <button
            onClick={() => setUnitWind('kt')}
            className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
              unitWind === 'kt'
                ? 'bg-white dark:bg-[#2A3446] font-bold text-[#1C222B] dark:text-white shadow-xs'
                : 'text-[#716B61] hover:text-[#1C222B] dark:hover:text-white'
            }`}
          >
            kt
          </button>
          <button
            onClick={() => setUnitWind('kmh')}
            className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
              unitWind === 'kmh'
                ? 'bg-white dark:bg-[#2A3446] font-bold text-[#1C222B] dark:text-white shadow-xs'
                : 'text-[#716B61] hover:text-[#1C222B] dark:hover:text-white'
            }`}
          >
            km/h
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 text-[#635E54] hover:text-[#1C222B] dark:text-[#9BA5B5] dark:hover:text-white rounded-xl hover:bg-[#F1ECE3] dark:hover:bg-[#202734] border border-transparent hover:border-[#E5DFD4] transition-colors cursor-pointer"
          aria-label="Toggle color theme"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#D39B38]" />}
        </button>

        {/* Guided Tour button */}
        <button
          onClick={() => setTourOpen(true)}
          className="p-1.5 text-[#635E54] hover:text-[#1C222B] dark:text-[#9BA5B5] dark:hover:text-white rounded-xl hover:bg-[#F1ECE3] dark:hover:bg-[#202734] border border-transparent hover:border-[#E5DFD4] transition-colors cursor-pointer"
          aria-label="Interactive guide"
          title="Interactive onboarding guide"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Mobile dropdown */}
        <div className="md:hidden flex items-center">
          <select
            value={currentTab}
            onChange={e => setTab(e.target.value as AppTab)}
            className="text-xs font-semibold bg-[#F3EFE7] dark:bg-[#202734] text-[#1C222B] dark:text-slate-200 py-1.5 px-2 rounded-xl border border-[#E5DFD4] dark:border-[#2D3646]"
          >
            {navLinks.map(l => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};


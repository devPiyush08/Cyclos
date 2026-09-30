import React from 'react';
import { useAppStore, AppTab } from '../../store/useStore';
import {
  LayoutDashboard,
  Compass,
  Wind,
  FolderArchive,
  Bell,
  Clock,
  Cpu,
  HelpCircle,
  LogOut,
  Sparkles
} from 'lucide-react';
import { ALERTS_DATA } from '../../data/mockData';

export const SidebarRail: React.FC = () => {
  const { currentTab, setTab, setTourOpen } = useAppStore();
  const activeAlertCount = ALERTS_DATA.filter(a => a.status === 'active').length;

  const navItems: { id: AppTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Live Map', icon: Compass },
    { id: 'storms', label: 'Storm Detail', icon: Wind },
    { id: 'archive', label: 'Archive', icon: FolderArchive },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'replay', label: 'Replay', icon: Clock },
    { id: 'model', label: 'Model Specs', icon: Cpu }
  ];

  return (
    <aside className="hidden md:flex w-20 shrink-0 border-r border-[#E8EFEA] bg-[#FAFBF9] flex-col items-center justify-between py-6 px-2 select-none">
      {/* Brand Icon: Green Burst Asterisk matching Paperpillar */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => setTab('dashboard')}
          className="group focus:outline-none cursor-pointer"
          title="CycloneWatch - Operational Cyclone Decision Support"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#274332] group-hover:scale-105 transition-transform shadow-xs">
            {/* Elegant asterisk / burst icon matching Paperpillar */}
            <svg
              className="w-6 h-6 text-[#274332]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="17" y1="5" x2="7" y2="19" />
              <line x1="19" y1="12" x2="5" y2="12" />
              <line x1="17" y1="19" x2="7" y2="5" />
            </svg>
          </div>
        </button>

        {/* Navigation Icon Stack matching Paperpillar rail */}
        <nav className="flex flex-col items-center gap-2 p-1.5 rounded-2xl bg-[#F0F5F1] border border-[#E3ECE6]">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C2520] text-white shadow-sm'
                    : 'text-[#5C6E63] hover:text-[#1C2520] hover:bg-white/60'
                }`}
                title={item.label}
                aria-label={item.label}
              >
                <Icon className="w-4 h-4" />
                {/* Alert count indicator dot on Alerts button */}
                {item.id === 'alerts' && activeAlertCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D95D39] ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions: Guide & Operator Status */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setTourOpen(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6A7970] hover:text-[#1C2520] hover:bg-[#F0F5F1] transition-colors cursor-pointer"
          title="System Tour & Help"
          aria-label="Help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="relative group cursor-pointer" title="Operational Duty Officer: RSMC New Delhi">
          <div className="w-9 h-9 rounded-full bg-[#E5ECE7] border-2 border-white flex items-center justify-center text-xs font-bold text-[#274332] shadow-xs">
            OP
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#419B68] ring-2 ring-white" />
        </div>
      </div>
    </aside>
  );
};

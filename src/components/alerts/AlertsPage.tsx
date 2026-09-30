import React, { useState } from 'react';
import { useAppStore } from '../../store/useStore';
import { ALERTS_DATA } from '../../data/mockData';
import {
  Bell,
  AlertTriangle,
  Info,
  ShieldAlert,
  ArrowRight,
  Clock,
  MapPin,
  Compass
} from 'lucide-react';
import { formatTimeCompact } from '../../utils/meteorology';

export const AlertsPage: React.FC = () => {
  const { setActiveStorm, setTab } = useAppStore();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredAlerts = ALERTS_DATA.filter(alert => {
    if (filterSeverity === 'all') return true;
    return alert.severity === filterSeverity;
  });

  const handleOpenMap = (stormId: string) => {
    setActiveStorm(stormId);
    setTab('map');
  };

  const handleOpenStorm = (stormId: string) => {
    setActiveStorm(stormId);
    setTab('storms');
  };

  return (
    <div className="space-y-6">
      {/* Alerts Header & Filter Bar */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#6A7970] mb-1">
            <Bell className="w-3.5 h-3.5 text-[#C25845]" />
            <span>Operational Coastal Early Warnings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C2520]">
            Coastal Bulletins & Advisories
          </h1>
        </div>

        {/* Severity Filter Pills */}
        <div className="flex items-center bg-[#F0F5F1] p-1 rounded-full border border-[#DCE7DF] text-xs font-mono">
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'warning', label: 'Warnings' },
            { id: 'watch', label: 'Watches' },
            { id: 'info', label: 'Advisories' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterSeverity(f.id)}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                filterSeverity === f.id
                  ? 'bg-[#1C2520] text-white font-semibold shadow-xs'
                  : 'text-[#6A7970] hover:text-[#1C2520]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.length === 0 ? (
          <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-[#E8EFEA] paper-shadow text-xs font-mono text-[#6A7970]">
            No active bulletins found matching selected filter.
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow flex flex-col justify-between space-y-4 hover:border-[#B5CDC0] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      alert.severity === 'warning'
                        ? 'bg-[#F9ECE9] text-[#C25845]'
                        : alert.severity === 'watch'
                        ? 'bg-[#FFF3E3] text-[#B88E2F]'
                        : 'bg-[#E8F4EC] text-[#2F6B48]'
                    }`}
                  >
                    {alert.severity}
                  </span>

                  <span className="text-[11px] font-mono text-[#95A59B]">
                    Issued: {formatTimeCompact(alert.issued_at)}
                  </span>
                </div>

                <h2 className="text-base font-bold text-[#1C2520] mb-1.5">
                  {alert.title}
                </h2>

                <p className="text-xs text-[#6A7970] leading-relaxed">
                  {alert.message}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0F5F1] flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold text-[#1C2520]">
                  Target: Cyclone {alert.storm_name}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenStorm(alert.storm_id)}
                    className="px-3 py-1.5 rounded-full bg-[#F0F5F1] hover:bg-[#E2EDE5] text-[#274332] text-xs font-semibold cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleOpenMap(alert.storm_id)}
                    className="px-3.5 py-1.5 rounded-full bg-[#274332] hover:bg-[#1C2520] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <span>View On Map</span>
                    <Compass className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAppStore } from '../../store/useStore';
import { STORMS_DATA } from '../../data/mockData';
import {
  FolderArchive,
  Search,
  Filter,
  ArrowRight,
  Wind,
  Calendar,
  Layers,
  MapPin,
  Check
} from 'lucide-react';
import { formatCoords, formatTimeCompact } from '../../utils/meteorology';

export const ArchivePage: React.FC = () => {
  const { setActiveStorm, setTab } = useAppStore();
  const [selectedBasin, setSelectedBasin] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStorms = STORMS_DATA.filter(storm => {
    const matchesBasin = selectedBasin === 'all' || storm.basin === selectedBasin;
    const matchesSearch =
      storm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      storm.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      storm.year.toString().includes(searchQuery);
    return matchesBasin && matchesSearch;
  });

  const handleSelectStorm = (stormId: string) => {
    setActiveStorm(stormId);
    setTab('dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Archive Header & Filter Bar */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#6A7970] mb-1">
            <FolderArchive className="w-3.5 h-3.5 text-[#274332]" />
            <span>North Indian Ocean Historical Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C2520]">
            Storm Archive & Past Seasons
          </h1>
        </div>

        {/* Basin Filters & Search Input */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search cyclone name, ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="text-xs font-mono bg-[#F0F5F1] text-[#1C2520] pl-8 pr-4 py-2 rounded-full border border-[#DCE7DF] focus:outline-none focus:border-[#274332] w-52"
            />
            <Search className="w-3.5 h-3.5 text-[#6A7970] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Basin Filter Pills */}
          <div className="flex items-center bg-[#F0F5F1] p-1 rounded-full border border-[#DCE7DF] text-xs font-mono">
            {['all', 'Bay of Bengal', 'Arabian Sea'].map(b => (
              <button
                key={b}
                onClick={() => setSelectedBasin(b)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  selectedBasin === b
                    ? 'bg-[#1C2520] text-white font-semibold shadow-xs'
                    : 'text-[#6A7970] hover:text-[#1C2520]'
                }`}
              >
                {b === 'all' ? 'All Basins' : b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Storm Table Card - Paperpillar style */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EFEA] paper-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#F0F5F1] text-[#95A59B] font-semibold">
                <th className="py-3 px-4">System ID</th>
                <th className="py-3 px-4">Cyclone Name</th>
                <th className="py-3 px-4">Season</th>
                <th className="py-3 px-4">Basin</th>
                <th className="py-3 px-4">Peak Intensity</th>
                <th className="py-3 px-4">Peak Grade</th>
                <th className="py-3 px-4">Lifespan</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F5F1]">
              {filteredStorms.map(storm => (
                <tr
                  key={storm.id}
                  className="hover:bg-[#FAFBF9] transition-colors group cursor-pointer"
                  onClick={() => handleSelectStorm(storm.id)}
                >
                  <td className="py-4 px-4 font-bold text-[#6A7970]">
                    {storm.id}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-sm text-[#1C2520] group-hover:text-[#274332] transition-colors">
                    Cyclone {storm.name}
                  </td>
                  <td className="py-4 px-4 text-[#1C2520]">
                    {storm.year}
                  </td>
                  <td className="py-4 px-4 text-[#6A7970]">
                    {storm.basin}
                  </td>
                  <td className="py-4 px-4 font-bold text-[#1C2520]">
                    {storm.peak_vmax_kt} kt
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8F4EC] text-[#2F6B48]">
                      {storm.peak_grade}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#6A7970]">
                    {formatTimeCompact(storm.first_seen)} - {formatTimeCompact(storm.last_seen)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleSelectStorm(storm.id);
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#F0F5F1] group-hover:bg-[#274332] text-[#274332] group-hover:text-white transition-all text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Load In App</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useStore';
import { STORMS_DATA } from '../../data/mockData';
import { GradeBadge } from './GradeBadge';
import { formatTimeCompact } from '../../utils/meteorology';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    searchQuery,
    setSearchOpen,
    setSearchQuery,
    setActiveStorm,
    setTab
  } = useAppStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = STORMS_DATA.filter(storm => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      storm.name.toLowerCase().includes(q) ||
      storm.id.toLowerCase().includes(q) ||
      storm.year.toString().includes(q) ||
      storm.basin.toLowerCase().includes(q) ||
      storm.peak_grade.toLowerCase().includes(q)
    );
  });

  const handleSelectStorm = (stormId: string) => {
    setActiveStorm(stormId);
    setSearchOpen(false);
    setSearchQuery('');
    setTab('storms');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#1C261F]/40 backdrop-blur-sm">
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8EFEA] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center px-5 py-4 border-b border-[#F0F5F1]">
          <Search className="w-5 h-5 text-[#6A7970] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search cyclone by name (Asani, Biparjoy...), year, ID, or basin..."
            className="w-full bg-transparent text-sm text-[#1C2520] placeholder-[#95A59B] focus:outline-none font-mono"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 text-[#95A59B] hover:text-[#1C2520] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-3 divide-y divide-[#F0F5F1]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#6A7970]">
              No matching tropical cyclone found for "{searchQuery}".
            </div>
          ) : (
            filtered.map(storm => (
              <button
                key={storm.id}
                onClick={() => handleSelectStorm(storm.id)}
                className="w-full text-left p-3 hover:bg-[#FAFBF9] rounded-2xl transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <GradeBadge grade={storm.peak_grade} size="sm" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1C2520]">
                        Cyclone {storm.name}
                      </span>
                      <span className="font-mono text-xs text-[#6A7970]">
                        ({storm.year})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6A7970] mt-0.5 font-mono">
                      <span>{storm.id}</span>
                      <span>·</span>
                      <span>{storm.basin}</span>
                      <span>·</span>
                      <span>Peak {storm.peak_vmax_kt} kt</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#6A7970] group-hover:text-[#274332] transition-colors">
                  <span className="hidden sm:inline font-mono">{formatTimeCompact(storm.last_seen)}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))
          )}
        </div>

        <div className="px-5 py-2.5 bg-[#FAFBF9] border-t border-[#F0F5F1] text-[11px] font-mono text-[#6A7970] flex items-center justify-between">
          <span>Navigate with mouse or click</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-[#DCE7DF] rounded text-[#1C2520]">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

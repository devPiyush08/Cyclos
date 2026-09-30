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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#171D2B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search cyclone by name (Asani, Biparjoy...), year, ID, or basin..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching tropical cyclone found for "{searchQuery}".
            </div>
          ) : (
            filtered.map(storm => (
              <button
                key={storm.id}
                onClick={() => handleSelectStorm(storm.id)}
                className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <GradeBadge grade={storm.peak_grade} size="sm" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                        Cyclone {storm.name}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        ({storm.year})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-mono">
                      <span>{storm.id}</span>
                      <span>·</span>
                      <span>{storm.basin}</span>
                      <span>·</span>
                      <span>Peak {storm.peak_vmax_kt} kt</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-[#3B5BFF] transition-colors">
                  <span className="hidden sm:inline font-mono">{formatTimeCompact(storm.last_seen)}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Navigate with mouse or arrow keys</span>
          <span>Press <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

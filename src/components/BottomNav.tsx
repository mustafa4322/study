import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onQuickAdd: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onQuickAdd,
}) => {
  const tabs = [
    { id: 'daily-routine' as TabType, label: 'Daily Plan', icon: 'checklist' },
    { id: 'timetable' as TabType, label: 'Timetable', icon: 'calendar_today' },
    { id: 'study-hub' as TabType, label: 'Study Hub', icon: 'timer' },
    { id: 'mindset' as TabType, label: 'Mindset', icon: 'auto_awesome' },
  ];

  return (
    <>
      {/* Floating Quick Add Button */}
      <div className="fixed bottom-20 right-4 z-40 max-w-md pointer-events-auto">
        <button
          id="floating-quick-add-btn"
          aria-label="Quick Add"
          onClick={onQuickAdd}
          className="flex items-center gap-2 h-12 px-4 rounded-full bg-[#4edea3] text-[#003824] shadow-[0_8px_24px_-4px_rgba(16,185,129,0.5)] hover:bg-[#6ffbbe] transition-all active:scale-95 font-label-lg font-bold border border-[#4edea3]/30"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="text-[14px]">Quick Add</span>
        </button>
      </div>

      {/* Bottom Sticky Navigation Bar */}
      <nav
        id="bottom-nav-bar"
        className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-[#060e20]/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.4)] border-t border-[#222a3d]/40"
      >
        <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center min-w-[64px] h-12 transition-all active:scale-95 relative ${
                  isActive
                    ? 'text-[#4edea3] font-semibold'
                    : 'text-[#bbcabf] hover:text-[#dae2fd]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                >
                  {tab.icon}
                </span>
                <span className="font-label-sm text-[11px] mt-0.5 tracking-tight">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-5 h-0.5 rounded-full bg-[#4edea3]"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

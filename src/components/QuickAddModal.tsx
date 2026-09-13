import React from 'react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddHabit: () => void;
  onOpenAddClass: () => void;
  onOpenAddDeadline: () => void;
  onQuickWater: () => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onOpenAddHabit,
  onOpenAddClass,
  onOpenAddDeadline,
  onQuickWater,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex flex-col justify-end transition-opacity duration-200">
      <div className="w-full max-w-md mx-auto bg-[#171f33] rounded-t-2xl p-4 flex flex-col gap-3 shadow-2xl border-t border-[#2d3449]">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px]">add_circle</span>
            <span className="font-headline-sm text-[18px] text-[#dae2fd] font-bold">
              Quick Action Deck
            </span>
          </div>
          <button
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#222a3d] flex items-center justify-center text-[#bbcabf] hover:text-[#dae2fd]"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Action 1: Add Routine / Habit */}
          <button
            onClick={() => {
              onClose();
              onOpenAddHabit();
            }}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-left transition-all active:scale-[0.99] border border-[#2d3449]/40"
          >
            <div className="w-10 h-10 rounded-lg bg-[#10b981]/20 text-[#4edea3] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">flash_on</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-[14px] text-[#dae2fd] font-bold">
                + Add New Routine / Habit
              </span>
              <span className="font-body-sm text-[12px] text-[#bbcabf]">
                Add morning, discipline, courage, or study protocol
              </span>
            </div>
          </button>

          {/* Action 2: Add Class */}
          <button
            onClick={() => {
              onClose();
              onOpenAddClass();
            }}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-left transition-all active:scale-[0.99] border border-[#2d3449]/40"
          >
            <div className="w-10 h-10 rounded-lg bg-[#3131c0]/30 text-[#c0c1ff] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-[14px] text-[#dae2fd] font-bold">
                Add Class / Lecture to Timetable
              </span>
              <span className="font-body-sm text-[12px] text-[#bbcabf]">
                Schedule subject, room, time slot, and professor
              </span>
            </div>
          </button>

          {/* Action 3: Add Deadline */}
          <button
            onClick={() => {
              onClose();
              onOpenAddDeadline();
            }}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-left transition-all active:scale-[0.99] border border-[#2d3449]/40"
          >
            <div className="w-10 h-10 rounded-lg bg-[#93000a]/30 text-[#ffb4ab] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">assignment_late</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-[14px] text-[#dae2fd] font-bold">
                Add Exam / Assignment Deadline
              </span>
              <span className="font-body-sm text-[12px] text-[#bbcabf]">
                Keep high-stakes submissions on your radar
              </span>
            </div>
          </button>

          {/* Action 4: Hydration +250ml */}
          <button
            onClick={() => {
              onQuickWater();
              onClose();
            }}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-left transition-all active:scale-[0.99] border border-[#2d3449]/40"
          >
            <div className="w-10 h-10 rounded-lg bg-[#19aee8]/20 text-[#7bd0ff] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">water_drop</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-[14px] text-[#dae2fd] font-bold">
                Quick Water: +250ml Glass
              </span>
              <span className="font-body-sm text-[12px] text-[#bbcabf]">
                Log hydration toward your 4.0L daily goal
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

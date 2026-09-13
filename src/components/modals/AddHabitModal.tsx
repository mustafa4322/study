import React, { useState } from 'react';
import { HabitItem } from '../../types';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHabit: (habit: HabitItem) => void;
  defaultCategory?: HabitItem['category'];
}

export const AddHabitModal: React.FC<AddHabitModalProps> = ({
  isOpen,
  onClose,
  onAddHabit,
  defaultCategory = 'Morning',
}) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState<HabitItem['category']>(defaultCategory);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newHabit: HabitItem = {
      id: 'h_' + Date.now(),
      title: title.trim(),
      scheduleTime: time.trim() ? `Scheduled: ${time.trim()}` : 'Daily Protocol',
      category,
      completed: false,
      active: true,
      streakDays: 1,
    };

    onAddHabit(newHabit);
    setTitle('');
    setTime('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex flex-col justify-end transition-opacity duration-200">
      <div className="w-full max-w-md mx-auto bg-[#171f33] rounded-t-2xl p-4 flex flex-col gap-4 shadow-2xl border-t border-[#2d3449]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 text-[#4edea3] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">flash_on</span>
            </div>
            <span className="font-headline-sm text-[18px] text-[#dae2fd] font-bold">
              New Protocol Habit
            </span>
          </div>
          <button
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#222a3d] flex items-center justify-center text-[#bbcabf] hover:text-[#dae2fd] transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
              Habit Title
            </label>
            <input
              className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3.5 py-3 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 transition-all placeholder:text-[#bbcabf]/50"
              placeholder="e.g. Read 20 pages research paper"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Schedule Time
              </label>
              <input
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3.5 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 transition-all placeholder:text-[#bbcabf]/50"
                placeholder="e.g. 7:00 PM"
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Category
              </label>
              <select
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value as HabitItem['category'])}
              >
                <option value="Morning">Morning</option>
                <option value="Discipline">Discipline</option>
                <option value="Courage">Courage</option>
                <option value="Study">Study</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              className="flex-1 py-3 rounded-xl bg-[#222a3d] text-[#dae2fd] font-label-lg text-[14px] font-semibold transition-all active:scale-95 hover:bg-[#2d3449]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#4edea3] text-[#003824] font-label-lg text-[14px] font-bold transition-all active:scale-95 shadow-[0_8px_20px_rgba(16,185,129,0.35)] hover:bg-[#6ffbbe]"
            >
              Commit Routine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

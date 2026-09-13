import React, { useState } from 'react';
import { DeadlineItem } from '../../types';

interface AddDeadlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDeadline: (deadline: DeadlineItem) => void;
}

export const AddDeadlineModal: React.FC<AddDeadlineModalProps> = ({
  isOpen,
  onClose,
  onAddDeadline,
}) => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [dueLabel, setDueLabel] = useState('Tomorrow');
  const [isUrgent, setIsUrgent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newDeadline: DeadlineItem = {
      id: 'd_' + Date.now(),
      title: title.trim(),
      course: course.trim() || 'University Course • 11:59 PM',
      time: '11:59 PM',
      dueLabel: dueLabel.trim() || 'Upcoming',
      isUrgent,
      priority: isUrgent ? 'High Priority' : 'Normal',
    };

    onAddDeadline(newDeadline);
    setTitle('');
    setCourse('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex flex-col justify-end transition-opacity duration-200">
      <div className="w-full max-w-md mx-auto bg-[#171f33] rounded-t-2xl p-4 flex flex-col gap-4 shadow-2xl border-t border-[#2d3449]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#93000a]/30 text-[#ffb4ab] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">assignment_late</span>
            </div>
            <span className="font-headline-sm text-[18px] text-[#dae2fd] font-bold">
              Add Academic Deadline
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
              Task / Exam Name
            </label>
            <input
              className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3.5 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 placeholder:text-[#bbcabf]/50"
              placeholder="e.g. Operating Systems Quiz 3"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
              Course / Topic Info
            </label>
            <input
              className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3.5 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 placeholder:text-[#bbcabf]/50"
              placeholder="e.g. Memory Management & Paging • 11:59 PM"
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Due Horizon
              </label>
              <select
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60"
                value={dueLabel}
                onChange={(e) => setDueLabel(e.target.value)}
              >
                <option value="Tomorrow">Tomorrow</option>
                <option value="2 Days Left">2 Days Left</option>
                <option value="3 Days Left">3 Days Left</option>
                <option value="6 Days Left">6 Days Left</option>
                <option value="Next Week">Next Week</option>
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#060e20] border border-[#2d3449]/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="accent-[#ffb4ab] rounded"
                />
                <span className="font-label-sm text-[12px] text-[#ffb4ab] font-semibold">
                  Urgent / High Stakes
                </span>
              </label>
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
              Set Deadline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

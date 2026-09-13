import React, { useState } from 'react';
import { UniversityClass } from '../../types';

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClass: (newClass: UniversityClass) => void;
  selectedDay?: string;
}

export const AddClassModal: React.FC<AddClassModalProps> = ({
  isOpen,
  onClose,
  onAddClass,
  selectedDay = 'Wed',
}) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [instructor, setInstructor] = useState('');
  const [type, setType] = useState<UniversityClass['type']>('Lecture');
  const [day, setDay] = useState(selectedDay);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;

    const newClass: UniversityClass = {
      id: 'c_' + Date.now(),
      code: code.trim().toUpperCase(),
      title: title.trim(),
      time: time.trim() || '10:00 - 11:30 AM',
      day,
      location: location.trim() || 'Hall B-1',
      instructor: instructor.trim() || 'Faculty Lecturer',
      attendancePercent: 100,
      type,
      reminderActive: true,
    };

    onAddClass(newClass);
    setCode('');
    setTitle('');
    setTime('');
    setLocation('');
    setInstructor('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex flex-col justify-end transition-opacity duration-200">
      <div className="w-full max-w-md mx-auto bg-[#171f33] rounded-t-2xl p-4 flex flex-col gap-4 shadow-2xl border-t border-[#2d3449] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3131c0]/30 text-[#c0c1ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
            <span className="font-headline-sm text-[18px] text-[#dae2fd] font-bold">
              Add Class / Lecture
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
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Course Code
              </label>
              <input
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 uppercase placeholder:text-[#bbcabf]/50"
                placeholder="CS-302"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoFocus
              />
            </div>
            <div className="col-span-2">
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Day of Week
              </label>
              <select
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="Mon">Mon (22)</option>
                <option value="Tue">Tue (23)</option>
                <option value="Wed">Wed (24)</option>
                <option value="Thu">Thu (25)</option>
                <option value="Fri">Fri (26)</option>
                <option value="Sat">Sat (27)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
              Subject Title
            </label>
            <input
              className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3.5 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 placeholder:text-[#bbcabf]/50"
              placeholder="e.g. Artificial Intelligence"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Time Slot
              </label>
              <input
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 placeholder:text-[#bbcabf]/50"
                placeholder="10:15 - 11:45 AM"
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Type
              </label>
              <select
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60"
                value={type}
                onChange={(e) => setType(e.target.value as UniversityClass['type'])}
              >
                <option value="Lecture">Lecture</option>
                <option value="Lab">Lab Work</option>
                <option value="Team Review">Team Review</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Location / Room
              </label>
              <input
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 placeholder:text-[#bbcabf]/50"
                placeholder="Lab 3 / Room 104"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Instructor
              </label>
              <input
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-[14px] px-3 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#2d3449]/60 placeholder:text-[#bbcabf]/50"
                placeholder="Prof. / Engr."
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
              />
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
              Add to Timetable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

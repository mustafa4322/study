import React, { useState } from 'react';
import { UniversityClass } from '../../types';

interface TimetableScreenProps {
  classes: UniversityClass[];
  onToggleClassReminder: (id: string) => void;
  onDeleteClass: (id: string) => void;
  onOpenAddClass: () => void;
}

export const TimetableScreen: React.FC<TimetableScreenProps> = ({
  classes,
  onToggleClassReminder,
  onDeleteClass,
  onOpenAddClass,
}) => {
  const [selectedDay, setSelectedDay] = useState('Wed');
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  const days = [
    { name: 'Mon', num: '22' },
    { name: 'Tue', num: '23' },
    { name: 'Wed', num: '24' },
    { name: 'Thu', num: '25' },
    { name: 'Fri', num: '26' },
    { name: 'Sat', num: '27' },
  ];

  const dayClasses = classes.filter((c) => c.day === selectedDay);
  const displayClasses = dayClasses.length > 0 ? dayClasses : classes.filter((c) => c.day === 'Wed');

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-28 text-[#dae2fd]">
      {/* Day Selector Carousel */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto py-1">
        {days.map((d) => {
          const isActive = selectedDay === d.name;
          return (
            <button
              key={d.name}
              onClick={() => setSelectedDay(d.name)}
              className={`flex-1 min-w-[48px] py-2.5 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#4edea3] text-[#003824] shadow-md font-bold'
                  : 'bg-[#171f33] text-[#8fa395] hover:bg-[#222a3d]'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider">{d.name}</span>
              <span className={`text-[14px] font-bold ${isActive ? 'text-[#003824]' : 'text-[#dae2fd]'}`}>
                {d.num}
              </span>
            </button>
          );
        })}
      </div>

      {/* Schedule Header */}
      <div className="flex items-center justify-between px-1">
        <span className="font-headline-sm text-[16px] text-[#dae2fd] font-bold">
          {selectedDay} Schedule
        </span>
        <button
          onClick={onOpenAddClass}
          className="text-[12px] text-[#4edea3] font-semibold flex items-center gap-1 hover:underline"
        >
          <span className="material-symbols-outlined text-[15px]">add</span>
          Add Class
        </button>
      </div>

      {/* Classes List */}
      <div className="flex flex-col gap-2.5">
        {displayClasses.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col rounded-xl bg-[#171f33] p-3.5 shadow-sm border transition-all ${
              item.isNext ? 'border-[#4edea3]/50' : 'border-[#222a3d]/60'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#3131c0]/40 text-[#c0c1ff] text-[10px] font-bold">
                    {item.code}
                  </span>
                  <span className="text-[11px] text-[#8fa395]">
                    {item.time}
                  </span>
                  {item.isNext && (
                    <span className="text-[10px] bg-[#10b981]/20 text-[#4edea3] px-2 py-0.5 rounded-full font-bold">
                      Next
                    </span>
                  )}
                </div>
                <h3 className="text-[14px] font-bold text-[#dae2fd] truncate">
                  {item.title}
                </h3>
                <span className="text-[11px] text-[#8fa395] mt-0.5">
                  {item.location} • {item.instructor}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  aria-label="Toggle Reminder"
                  onClick={() => onToggleClassReminder(item.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    item.reminderActive
                      ? 'bg-[#10b981]/20 text-[#4edea3]'
                      : 'bg-[#222a3d] text-[#8fa395]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">
                    {item.reminderActive ? 'notifications_active' : 'notifications_off'}
                  </span>
                </button>
                <button
                  aria-label="Delete Class"
                  onClick={() => onDeleteClass(item.id)}
                  className="w-8 h-8 rounded-lg text-[#ffb4ab] hover:bg-[#93000a]/20 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reminders Toggle */}
      <section className="bg-[#171f33] rounded-2xl p-4 shadow-sm border border-[#222a3d]/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#7bd0ff] text-[20px]">alarm</span>
          <span className="text-[13px] text-[#dae2fd] font-medium">Class Notifications</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={remindersEnabled}
          onClick={() => setRemindersEnabled(!remindersEnabled)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
            remindersEnabled ? 'bg-[#4edea3]' : 'bg-[#222a3d]'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow transition duration-200 ${
              remindersEnabled ? 'translate-x-5 bg-[#003824]' : 'translate-x-0 bg-[#8fa395]'
            }`}
          ></span>
        </button>
      </section>
    </div>
  );
};

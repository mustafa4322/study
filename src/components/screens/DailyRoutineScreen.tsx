import React from 'react';
import { HabitItem } from '../../types';

interface DailyRoutineScreenProps {
  morningHabits: HabitItem[];
  disciplineHabits: HabitItem[];
  courageHabits: HabitItem[];
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  onOpenAddModal: () => void;
  waterCurrent: number;
  onAddWater: () => void;
  strangerCount: number;
  onIncrementStranger: () => void;
  onDecrementStranger: () => void;
}

export const DailyRoutineScreen: React.FC<DailyRoutineScreenProps> = ({
  morningHabits,
  disciplineHabits,
  courageHabits,
  onToggleHabit,
  onDeleteHabit,
  onOpenAddModal,
  waterCurrent,
  onAddWater,
  strangerCount,
  onIncrementStranger,
  onDecrementStranger,
}) => {
  const allHabits = [...morningHabits, ...disciplineHabits, ...courageHabits];
  const total = allHabits.length;
  const completed = allHabits.filter((h) => h.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Radial progress math
  const circumference = 163.36; // 2 * PI * 26
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-28">
      {/* Daily Progress Card */}
      <section className="w-full bg-[#171f33] rounded-2xl p-4 shadow-md border border-[#222a3d]/70 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-sm text-[12px] text-[#4edea3] font-semibold">
            Today's Progress
          </span>
          <span className="font-headline-md text-[24px] text-[#dae2fd] font-bold mt-0.5">
            {completed} of {total} Done
          </span>
          <span className="font-label-sm text-[12px] text-[#8fa395] mt-0.5">
            {percentage}% Completed
          </span>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center w-16 h-16 flex-shrink-0">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              className="text-[#2d3449]"
              cx="32"
              cy="32"
              fill="none"
              r="26"
              stroke="currentColor"
              strokeWidth="5"
            />
            <circle
              className="text-[#4edea3] transition-all duration-500 ease-out"
              cx="32"
              cy="32"
              fill="none"
              r="26"
              stroke="currentColor"
              strokeDasharray="163.36"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="5"
            />
          </svg>
          <span className="absolute font-label-lg text-[13px] font-bold text-[#dae2fd]">
            {percentage}%
          </span>
        </div>
      </section>

      {/* Morning Habits */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline-sm text-[16px] text-[#dae2fd] font-bold">
            Morning Habits
          </span>
          <span className="font-label-sm text-[11px] text-[#4edea3] font-semibold">
            {morningHabits.filter((h) => h.completed).length}/{morningHabits.length}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {morningHabits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between bg-[#171f33] rounded-xl p-3 shadow-sm border border-[#222a3d]/60 transition-all hover:border-[#2d3449]"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  aria-label="Toggle habit"
                  onClick={() => onToggleHabit(habit.id)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    habit.completed
                      ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_10px_rgba(78,222,163,0.3)]'
                      : 'bg-[#222a3d] text-transparent hover:text-[#8fa395]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </button>
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className={`font-label-lg text-[14px] text-[#dae2fd] truncate ${
                      habit.completed ? 'line-through text-opacity-60 text-[#8fa395]' : 'font-semibold'
                    }`}
                  >
                    {habit.title}
                  </span>
                  <span className="font-label-sm text-[11px] text-[#8fa395]">
                    {habit.scheduleTime}
                  </span>
                </div>
              </div>

              <button
                aria-label="Delete habit"
                onClick={() => onDeleteHabit(habit.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ffb4ab] hover:bg-[#93000a]/20 transition-colors flex-shrink-0 ml-2"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Water & Focus */}
      <section className="grid grid-cols-2 gap-3">
        {/* Water */}
        <div className="bg-[#171f33] rounded-xl p-3.5 flex flex-col justify-between shadow-sm border border-[#222a3d]/60">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#dae2fd] font-bold">Water</span>
            <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">water_drop</span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-lg text-[22px] text-[#dae2fd] font-bold font-metric-mono">
                {waterCurrent.toFixed(1)}
              </span>
              <span className="font-label-sm text-[11px] text-[#8fa395]">/ 4.0 L</span>
            </div>
            <div className="w-full bg-[#222a3d] h-2 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-[#7bd0ff] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (waterCurrent / 4.0) * 100)}%` }}
              ></div>
            </div>
          </div>
          <button
            onClick={onAddWater}
            className="w-full py-1.5 px-2 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-[#7bd0ff] active:scale-95 transition-all text-[12px] font-semibold flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            +250ml
          </button>
        </div>

        {/* Screen Limit */}
        <div className="bg-[#171f33] rounded-xl p-3.5 flex flex-col justify-between shadow-sm border border-[#222a3d]/60">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#dae2fd] font-bold">Screen Limit</span>
            <span className="material-symbols-outlined text-[#4edea3] text-[18px]">timer</span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-lg text-[22px] text-[#dae2fd] font-bold font-metric-mono">
                18
              </span>
              <span className="font-label-sm text-[11px] text-[#8fa395]">/ 30 min</span>
            </div>
            <div className="w-full bg-[#222a3d] h-2 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#4edea3] h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="w-full py-1.5 px-2 rounded-lg bg-[#222a3d] text-[#4edea3] text-[11px] font-semibold text-center">
            12m Left
          </div>
        </div>
      </section>

      {/* Daily Challenge */}
      <section className="bg-[#171f33] rounded-xl p-4 shadow-sm border border-[#222a3d]/60">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-lg text-[14px] text-[#dae2fd] font-bold block">
              Talk to 10 Strangers
            </span>
            <span className="font-label-sm text-[11px] text-[#8fa395]">
              Daily Social Challenge
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Decrease count"
              onClick={onDecrementStranger}
              className="w-8 h-8 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:bg-[#2d3449] flex items-center justify-center active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span className="font-metric-mono font-bold text-[18px] text-[#dae2fd] min-w-[28px] text-center">
              {strangerCount}
            </span>
            <button
              aria-label="Increase count"
              onClick={onIncrementStranger}
              className="w-8 h-8 rounded-lg bg-[#4edea3] text-[#003824] hover:bg-[#6ffbbe] flex items-center justify-center active:scale-95 transition-all font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
        </div>

        {/* 10 dots indicator */}
        <div className="grid grid-cols-10 gap-1.5 mt-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < strangerCount ? 'bg-[#4edea3]' : 'bg-[#222a3d]'
              }`}
            ></div>
          ))}
        </div>
      </section>

      {/* Other Discipline & Courage Habits */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline-sm text-[16px] text-[#dae2fd] font-bold">
            Other Habits
          </span>
          <span className="font-label-sm text-[11px] text-[#8fa395]">
            {[...disciplineHabits, ...courageHabits].filter((h) => h.completed).length}/
            {[...disciplineHabits, ...courageHabits].length}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {[...disciplineHabits, ...courageHabits].map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between bg-[#171f33] rounded-xl p-3 shadow-sm border border-[#222a3d]/60 transition-all hover:border-[#2d3449]"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  aria-label="Toggle habit"
                  onClick={() => onToggleHabit(habit.id)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    habit.completed
                      ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_10px_rgba(78,222,163,0.3)]'
                      : 'bg-[#222a3d] text-transparent hover:text-[#8fa395]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </button>
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className={`font-label-lg text-[14px] text-[#dae2fd] truncate ${
                      habit.completed ? 'line-through text-opacity-60 text-[#8fa395]' : 'font-semibold'
                    }`}
                  >
                    {habit.title}
                  </span>
                  <span className="font-label-sm text-[11px] text-[#8fa395]">
                    {habit.scheduleTime}
                  </span>
                </div>
              </div>

              <button
                aria-label="Delete habit"
                onClick={() => onDeleteHabit(habit.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ffb4ab] hover:bg-[#93000a]/20 transition-colors flex-shrink-0 ml-2"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Add Habit Button */}
      <button
        onClick={onOpenAddModal}
        className="w-full py-3 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#4edea3] font-label-lg text-[13px] font-bold flex items-center justify-center gap-2 transition-all active:scale-98 border border-[#4edea3]/25 mt-1"
      >
        <span className="material-symbols-outlined text-[18px]">add_circle</span>
        <span>+ Add Habit</span>
      </button>
    </div>
  );
};

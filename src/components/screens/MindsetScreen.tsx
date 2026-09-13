import React, { useState } from 'react';
import { HabitItem } from '../../types';

interface MindsetScreenProps {
  mindsetHabits: HabitItem[];
  onToggleMindsetHabit: (id: string) => void;
  onDeleteMindsetHabit: (id: string) => void;
  onOpenAddHabit: () => void;
  onOpenLettersModal: () => void;
}

export const MindsetScreen: React.FC<MindsetScreenProps> = ({
  mindsetHabits,
  onToggleMindsetHabit,
  onDeleteMindsetHabit,
  onOpenAddHabit,
  onOpenLettersModal,
}) => {
  const [identityText, setIdentityText] = useState(
    'Disciplined University Scholar & Top Tier Engineer'
  );
  const [identitySaved, setIdentitySaved] = useState(false);

  // Reflection note
  const [reflectionText, setReflectionText] = useState(
    'Focus on the process, not anxiety. One task at a time.'
  );

  // Declutter items
  const [declutterItems, setDeclutterItems] = useState([
    { id: 'd1', text: 'Unfollowed toxic social feeds', done: true },
    { id: 'd2', text: 'Deleted distracting games', done: true },
    { id: 'd3', text: 'Cleaned study desk', done: false },
  ]);

  const [sleepSync, setSleepSync] = useState(true);
  const [masterReminders, setMasterReminders] = useState(true);

  const handleSaveIdentity = () => {
    setIdentitySaved(true);
    setTimeout(() => setIdentitySaved(false), 2000);
  };

  const toggleDeclutter = (id: string) => {
    setDeclutterItems((items) =>
      items.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
  };

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-28 text-[#dae2fd]">
      {/* Identity Goal Card */}
      <section className="bg-[#171f33] rounded-2xl p-4 shadow-sm border border-[#222a3d]/70">
        <span className="font-label-sm text-[12px] text-[#4edea3] font-semibold block mb-1">
          Target Identity
        </span>
        <div className="flex items-center gap-2 bg-[#222a3d] p-2.5 rounded-xl border border-[#2d3449]/50">
          <input
            id="identity-input"
            aria-label="Target Identity"
            className="flex-1 bg-transparent font-label-md text-[14px] text-[#dae2fd] font-semibold focus:outline-none"
            type="text"
            value={identityText}
            onChange={(e) => {
              setIdentityText(e.target.value);
              setIdentitySaved(false);
            }}
          />
          <button
            aria-label="Save Identity"
            onClick={handleSaveIdentity}
            className="w-7 h-7 rounded-lg bg-[#171f33] flex items-center justify-center text-[#4edea3] hover:bg-[#2d3449] transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">
              {identitySaved ? 'check_circle' : 'done'}
            </span>
          </button>
        </div>
      </section>

      {/* Daily Reflection & Letters */}
      <section className="bg-[#171f33] rounded-2xl p-4 shadow-sm border border-[#222a3d]/70 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-[15px] font-bold text-[#dae2fd]">
            Daily Reflection
          </span>
          <button
            onClick={onOpenLettersModal}
            className="text-[12px] text-[#c0c1ff] font-semibold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">mail</span>
            Letters
          </button>
        </div>

        <textarea
          rows={2}
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          placeholder="Write your thought for today..."
          className="w-full rounded-xl bg-[#222a3d] p-3 text-[13px] text-[#dae2fd] focus:outline-none resize-none border border-[#2d3449]/50"
        />
      </section>

      {/* Declutter Checklist */}
      <section className="bg-[#171f33] rounded-2xl p-4 shadow-sm border border-[#222a3d]/70 flex flex-col gap-2">
        <span className="font-headline-sm text-[15px] font-bold text-[#dae2fd] mb-1">
          Distraction Checklist
        </span>

        <div className="flex flex-col gap-2">
          {declutterItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleDeclutter(item.id)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#222a3d] cursor-pointer select-none border border-[#2d3449]/40 hover:bg-[#2d3449] transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors flex-shrink-0 ${
                  item.done ? 'bg-[#4edea3] text-[#003824]' : 'bg-[#171f33] text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <span
                className={`text-[13px] ${
                  item.done ? 'line-through text-[#8fa395]' : 'text-[#dae2fd]'
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Habits Switches */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline-sm text-[15px] font-bold text-[#dae2fd]">
            Mindset Habits
          </span>
          <button
            onClick={onOpenAddHabit}
            className="text-[12px] text-[#4edea3] font-semibold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {mindsetHabits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#171f33] border border-[#222a3d]/60 shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  role="switch"
                  aria-checked={habit.active}
                  onClick={() => onToggleMindsetHabit(habit.id)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                    habit.active ? 'bg-[#4edea3]' : 'bg-[#222a3d]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow transition duration-200 ${
                      habit.active ? 'translate-x-5 bg-[#003824]' : 'translate-x-0 bg-[#8fa395]'
                    }`}
                  ></span>
                </button>
                <div className="min-w-0">
                  <p className="font-label-md text-[13px] font-bold text-[#dae2fd] truncate">
                    {habit.title}
                  </p>
                  <span className="text-[#8fa395] text-[11px] block">{habit.scheduleTime}</span>
                </div>
              </div>

              <button
                aria-label="Delete Habit"
                onClick={() => onDeleteMindsetHabit(habit.id)}
                className="w-8 h-8 rounded-lg text-[#ffb4ab] hover:bg-[#93000a]/20 flex items-center justify-center transition-colors ml-2"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Settings / Reminders */}
      <section className="bg-[#171f33] rounded-2xl p-4 shadow-sm border border-[#222a3d]/70 flex flex-col gap-3">
        <span className="font-headline-sm text-[15px] font-bold text-[#dae2fd]">
          Alerts &amp; Sleep
        </span>

        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#dae2fd] font-medium">10:30 PM Sleep Reminder</span>
          <button
            type="button"
            role="switch"
            aria-checked={sleepSync}
            onClick={() => setSleepSync(!sleepSync)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
              sleepSync ? 'bg-[#4edea3]' : 'bg-[#222a3d]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow transition duration-200 ${
                sleepSync ? 'translate-x-5 bg-[#003824]' : 'translate-x-0 bg-[#8fa395]'
              }`}
            ></span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#222a3d]/50">
          <span className="text-[13px] text-[#dae2fd] font-medium">Habit Push Notifications</span>
          <button
            type="button"
            role="switch"
            aria-checked={masterReminders}
            onClick={() => setMasterReminders(!masterReminders)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
              masterReminders ? 'bg-[#4edea3]' : 'bg-[#222a3d]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow transition duration-200 ${
                masterReminders ? 'translate-x-5 bg-[#003824]' : 'translate-x-0 bg-[#8fa395]'
              }`}
            ></span>
          </button>
        </div>
      </section>
    </div>
  );
};

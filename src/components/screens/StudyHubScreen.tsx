import React, { useState, useEffect } from 'react';
import { DeadlineItem } from '../../types';

interface StudyHubScreenProps {
  deadlines: DeadlineItem[];
  onOpenAddDeadline: () => void;
  onOpenFeynmanSandbox: () => void;
  onOpenFlashcards: () => void;
}

export const StudyHubScreen: React.FC<StudyHubScreenProps> = ({
  deadlines,
  onOpenAddDeadline,
  onOpenFeynmanSandbox,
  onOpenFlashcards,
}) => {
  const [selectedCadence, setSelectedCadence] = useState<'25/5' | '50/10' | '90/20'>('50/10');
  const [cadenceTotalSeconds, setCadenceTotalSeconds] = useState(50 * 60);
  const [secondsRemaining, setSecondsRemaining] = useState(34 * 60 + 15);
  const [isRunning, setIsRunning] = useState(false);

  // Circular timer ring math
  const circumference = 263.89; // 2 * PI * 42
  const progressRatio = Math.max(0, secondsRemaining / cadenceTotalSeconds);
  const strokeDashoffset = circumference * (1 - progressRatio);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((s) => s - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining]);

  const handleSelectCadence = (type: '25/5' | '50/10' | '90/20') => {
    setSelectedCadence(type);
    setIsRunning(false);
    if (type === '25/5') {
      setCadenceTotalSeconds(25 * 60);
      setSecondsRemaining(25 * 60);
    } else if (type === '50/10') {
      setCadenceTotalSeconds(50 * 60);
      setSecondsRemaining(50 * 60);
    } else {
      setCadenceTotalSeconds(90 * 60);
      setSecondsRemaining(90 * 60);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(cadenceTotalSeconds);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-28 text-[#dae2fd]">
      {/* Timer Cockpit */}
      <section className="bg-[#171f33] rounded-2xl p-4 shadow-md border border-[#222a3d]/70 flex flex-col items-center">
        {/* Cadence Pills */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => handleSelectCadence('25/5')}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
              selectedCadence === '25/5'
                ? 'bg-[#4edea3] text-[#003824] shadow-sm'
                : 'bg-[#222a3d] text-[#8fa395] hover:text-[#dae2fd]'
            }`}
          >
            25 min
          </button>
          <button
            onClick={() => handleSelectCadence('50/10')}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
              selectedCadence === '50/10'
                ? 'bg-[#4edea3] text-[#003824] shadow-sm'
                : 'bg-[#222a3d] text-[#8fa395] hover:text-[#dae2fd]'
            }`}
          >
            50 min
          </button>
          <button
            onClick={() => handleSelectCadence('90/20')}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
              selectedCadence === '90/20'
                ? 'bg-[#4edea3] text-[#003824] shadow-sm'
                : 'bg-[#222a3d] text-[#8fa395] hover:text-[#dae2fd]'
            }`}
          >
            90 min
          </button>
        </div>

        {/* Circular Timer Ring */}
        <div className="relative w-44 h-44 flex items-center justify-center my-1">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-[#222a3d]"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
            />
            <circle
              className="text-[#4edea3] transition-all duration-1000 ease-linear"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-metric-mono text-[34px] text-[#dae2fd] font-bold tracking-tight">
              {formatTimer(secondsRemaining)}
            </span>
            <span className="font-label-sm text-[11px] text-[#8fa395] uppercase tracking-wider mt-0.5">
              {isRunning ? 'Focusing' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full mt-3">
          <button
            aria-label="Reset Timer"
            onClick={handleReset}
            className="w-11 h-11 rounded-xl bg-[#222a3d] text-[#8fa395] hover:text-[#dae2fd] flex items-center justify-center active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1 h-11 rounded-xl bg-[#4edea3] text-[#003824] font-label-lg text-[14px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md hover:bg-[#6ffbbe]"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>
        </div>
      </section>

      {/* Quick Study Methods */}
      <section className="grid grid-cols-2 gap-3">
        {/* Feynman Sandbox */}
        <div className="bg-[#171f33] rounded-xl p-3.5 border border-[#222a3d]/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">lightbulb</span>
              <span className="font-label-md text-[13px] text-[#dae2fd] font-bold">Feynman</span>
            </div>
            <p className="font-body-sm text-[11px] text-[#8fa395]">
              Explain concepts in simple words
            </p>
          </div>
          <button
            onClick={onOpenFeynmanSandbox}
            className="mt-3 w-full py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-[#4edea3] text-[12px] font-semibold active:scale-95 transition-all"
          >
            Open Sandbox
          </button>
        </div>

        {/* Flashcards */}
        <div className="bg-[#171f33] rounded-xl p-3.5 border border-[#222a3d]/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">style</span>
              <span className="font-label-md text-[13px] text-[#dae2fd] font-bold">Flashcards</span>
            </div>
            <p className="font-body-sm text-[11px] text-[#8fa395]">
              Active recall quick drill
            </p>
          </div>
          <button
            onClick={onOpenFlashcards}
            className="mt-3 w-full py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-[#c0c1ff] text-[12px] font-semibold active:scale-95 transition-all"
          >
            Start Drill
          </button>
        </div>
      </section>

      {/* Deadlines */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline-sm text-[16px] text-[#dae2fd] font-bold">
            Deadlines
          </span>
          <button
            onClick={onOpenAddDeadline}
            className="font-label-sm text-[12px] text-[#4edea3] font-semibold flex items-center gap-1 hover:underline"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {deadlines.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#171f33] border border-[#222a3d]/60 shadow-sm"
            >
              <div className="min-w-0 flex-1">
                <span className="font-label-md text-[13px] text-[#dae2fd] font-bold block truncate">
                  {d.title}
                </span>
                <span className="font-body-sm text-[11px] text-[#8fa395] truncate block">
                  {d.course}
                </span>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex-shrink-0 ml-2 ${
                  d.isUrgent
                    ? 'bg-[#93000a]/40 text-[#ffb4ab]'
                    : 'bg-[#222a3d] text-[#c0c1ff]'
                }`}
              >
                {d.dueLabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Deep Work Goal */}
      <section className="bg-[#171f33] rounded-xl p-3.5 border border-[#222a3d]/60">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-label-md text-[13px] text-[#dae2fd] font-bold">
            Daily Focus Goal
          </span>
          <span className="font-label-sm text-[12px] text-[#4edea3] font-semibold">
            45 / 60 min
          </span>
        </div>
        <div className="w-full h-2 bg-[#222a3d] rounded-full overflow-hidden">
          <div className="h-full bg-[#4edea3] rounded-full" style={{ width: '75%' }}></div>
        </div>
      </section>
    </div>
  );
};

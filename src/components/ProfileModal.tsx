import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  streakDays,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex flex-col justify-end transition-opacity duration-200">
      <div className="w-full max-w-md mx-auto bg-[#171f33] rounded-t-2xl p-4 flex flex-col gap-4 shadow-2xl border-t border-[#2d3449]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px]">account_circle</span>
            <span className="font-headline-sm text-[18px] text-[#dae2fd] font-bold">
              Student Scholar Profile
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

        {/* Profile Card */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#222a3d]/80 border border-[#2d3449]">
          <div className="w-12 h-12 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824] font-bold text-[20px] shadow-[0_0_16px_rgba(78,222,163,0.35)] flex-shrink-0">
            M
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-[16px] text-[#dae2fd] font-bold truncate">
                Muhammad Mustafa
              </span>
              <span className="font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-[#4edea3]/15 text-[#4edea3] font-semibold">
                Semester 5
              </span>
            </div>
            <span className="font-body-sm text-[12px] text-[#bbcabf] truncate">
              BS Computer Science • Roll #41
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-[#222a3d]/60 text-center border border-[#2d3449]/40">
            <span className="font-metric-mono text-[18px] text-[#4edea3] font-bold block">
              {streakDays}d
            </span>
            <span className="font-label-sm text-[10px] text-[#bbcabf]">Active Streak</span>
          </div>
          <div className="p-3 rounded-xl bg-[#222a3d]/60 text-center border border-[#2d3449]/40">
            <span className="font-metric-mono text-[18px] text-[#c0c1ff] font-bold block">
              89%
            </span>
            <span className="font-label-sm text-[10px] text-[#bbcabf]">Attendance</span>
          </div>
          <div className="p-3 rounded-xl bg-[#222a3d]/60 text-center border border-[#2d3449]/40">
            <span className="font-metric-mono text-[18px] text-[#7bd0ff] font-bold block">
              +350 XP
            </span>
            <span className="font-label-sm text-[10px] text-[#bbcabf]">Today's Score</span>
          </div>
        </div>

        {/* Philosophy Creed */}
        <div className="bg-[#060e20] p-3 rounded-xl border border-[#2d3449]/50">
          <span className="font-label-sm text-[11px] text-[#4edea3] font-semibold block mb-1">
            WARRIOR MOTTO
          </span>
          <p className="font-body-sm text-[12px] text-[#dae2fd] italic">
            "Discipline equals freedom. Action precedes motivation. Never negotiate with your morning alarm."
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#4edea3] text-[#003824] font-label-lg text-[14px] font-bold transition-all active:scale-95"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
};

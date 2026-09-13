import React from 'react';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  streakDays?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
  streakDays = 14,
}) => {
  // Current formatted date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-[#0b1326]/90 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.3)] border-b border-[#222a3d]/60">
      {/* Main App Bar */}
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-md mx-auto">
        <div className="flex items-center gap-2.5">
          <img
            alt="FocusForge App Logo"
            className="h-8 w-8 object-contain rounded-lg shadow-sm"
            src="https://lh3.googleusercontent.com/aida/AEtjO1WOKGPu937cb4r0YVxQGMk2yeUcVYh5j-X3hMPRqTSmRijZwXAoePHy0JJzcZO9GTgEr_78F-BuEM2iTyAtz8T8KHnWfgnU_icTlREcwE4CKXHU7OuOvuTNOIlzUcc5L3CCUGfuTavROx2sOS6NDlif1Wdi6WVbOPI9PTWr_xXy1AI42ihWLk4cBM_yK9G-BQBVk5H3yy5t40CVOegBZNH6bN4ltWcOZnrW_AlvWFIAS3PCjyZbO2xNT1lQ"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-[17px] tracking-tight text-[#dae2fd] font-bold leading-none">
              FocusForge
            </span>
            <span className="font-label-sm text-[11px] text-[#8fa395] pt-1">
              {todayFormatted}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Streak Counter Pill */}
          <div className="flex items-center gap-1.5 bg-[#171f33] px-2.5 py-1 rounded-full text-[#4edea3] border border-[#4edea3]/25 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-[#4edea3]">local_fire_department</span>
            <span className="font-label-sm text-[11px] font-semibold tracking-wide">
              {streakDays}d
            </span>
          </div>

          {/* Notifications Button with Badge */}
          <button
            id="header-notif-btn"
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative w-9 h-9 flex items-center justify-center rounded-full bg-[#171f33] text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#222a3d] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4edea3] ring-2 ring-[#0b1326] animate-pulse"></span>
          </button>

          {/* User Profile Avatar */}
          <button
            id="header-profile-btn"
            aria-label="Student Profile"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824] hover:opacity-90 active:scale-95 transition-all shadow-[0_0_12px_rgba(78,222,163,0.3)]"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};

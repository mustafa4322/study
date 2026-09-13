import React from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'Next: Database Management Systems (CS-304)',
      description: 'Lab 3 (Ground Floor) starts in 25 minutes with Engr. Bilal.',
      time: '10 mins ago',
      icon: 'science',
      color: 'text-[#4edea3] bg-[#10b981]/20',
    },
    {
      id: 'n2',
      title: 'Water & Study Block Cue',
      description: 'Drink 250ml glass and initiate Organic Chem recall session.',
      time: '25 mins ago',
      icon: 'water_drop',
      color: 'text-[#7bd0ff] bg-[#19aee8]/20',
    },
    {
      id: 'n3',
      title: 'Attendance Alert: MATH-202',
      description: 'Current attendance is 74%. You must attend the next 2 lectures!',
      time: '2 hrs ago',
      icon: 'warning',
      color: 'text-[#ffb4ab] bg-[#93000a]/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex flex-col justify-end transition-opacity duration-200">
      <div className="w-full max-w-md mx-auto bg-[#171f33] rounded-t-2xl p-4 flex flex-col gap-3 shadow-2xl border-t border-[#2d3449]">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px]">notifications</span>
            <span className="font-headline-sm text-[18px] text-[#dae2fd] font-bold">
              Notifications & Alerts
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

        <div className="flex flex-col gap-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-[#222a3d]/70 border border-[#2d3449]/50"
            >
              <div className={`w-9 h-9 rounded-lg ${n.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-label-lg text-[13px] font-bold text-[#dae2fd] truncate">
                    {n.title}
                  </span>
                  <span className="font-label-sm text-[10px] text-[#bbcabf] flex-shrink-0">
                    {n.time}
                  </span>
                </div>
                <p className="font-body-sm text-[12px] text-[#bbcabf] mt-0.5 leading-snug">
                  {n.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#222a3d] text-[#dae2fd] font-label-lg text-[13px] font-semibold mt-1"
        >
          Dismiss All
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { INITIAL_FLASHCARDS } from '../../data/initialData';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [cards] = useState(INITIAL_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const currentCard = cards[currentIndex];

  const handleNext = (mastered: boolean) => {
    if (mastered) setScore((s) => s + 1);
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Completed drill
      setCurrentIndex(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/85 backdrop-blur-md flex flex-col justify-end transition-opacity duration-200">
      <div className="w-full max-w-md mx-auto bg-[#171f33] rounded-t-2xl p-4 flex flex-col gap-4 shadow-2xl border-t border-[#2d3449]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3131c0]/30 text-[#c0c1ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">style</span>
            </div>
            <div>
              <span className="font-headline-sm text-[18px] text-[#dae2fd] font-bold block">
                Active Recall Drill
              </span>
              <span className="font-label-sm text-[11px] text-[#bbcabf]">
                Card {currentIndex + 1} of {cards.length} • Score: {score}
              </span>
            </div>
          </div>
          <button
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#222a3d] flex items-center justify-center text-[#bbcabf] hover:text-[#dae2fd]"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Flashcard Body with 3D Flip effect */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full min-h-[190px] rounded-xl bg-[#222a3d] p-5 cursor-pointer flex flex-col justify-between border border-[#2d3449] relative transition-all active:scale-[0.99] shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-[#3131c0]/40 text-[#c0c1ff] font-semibold">
              {currentCard.topic}
            </span>
            <span className="font-label-sm text-[11px] text-[#bbcabf] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">flip</span>
              {isFlipped ? 'Answer' : 'Tap to Flip'}
            </span>
          </div>

          <div className="my-3 text-center flex items-center justify-center min-h-[70px]">
            {isFlipped ? (
              <p className="font-body-md text-[14px] text-[#dae2fd] leading-relaxed animate-fadeIn">
                {currentCard.answer}
              </p>
            ) : (
              <p className="font-headline-sm text-[16px] font-bold text-[#dae2fd] leading-snug">
                {currentCard.question}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center text-[#bbcabf] font-label-sm text-[11px]">
            <span>Blurting Prompt</span>
            <span className="text-[#4edea3]">Close notes and recall</span>
          </div>
        </div>

        {/* Drill Evaluation Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => handleNext(false)}
            className="py-3 rounded-xl bg-[#222a3d] hover:bg-[#93000a]/20 text-[#ffb4ab] font-label-lg font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
            Needs Practice
          </button>
          <button
            onClick={() => handleNext(true)}
            className="py-3 rounded-xl bg-[#4edea3] text-[#003824] font-label-lg font-bold flex items-center justify-center gap-1 active:scale-95 shadow-[0_4px_16px_rgba(78,222,163,0.3)] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            Nailed It (+1)
          </button>
        </div>
      </div>
    </div>
  );
};

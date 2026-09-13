import React, { useState } from 'react';
import { LetterEntry } from '../../types';
import { INITIAL_LETTERS } from '../../data/initialData';

interface LetterToPastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LetterToPastModal: React.FC<LetterToPastModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [letters, setLetters] = useState<LetterEntry[]>(INITIAL_LETTERS);
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  if (!isOpen) return null;

  const handleAddLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const entry: LetterEntry = {
      id: 'l_' + Date.now(),
      date: 'Today • 5:30 AM',
      title: newTitle.trim() || 'Note to my younger self',
      content: newContent.trim(),
    };

    setLetters([entry, ...letters]);
    setNewTitle('');
    setNewContent('');
    setIsWriting(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/85 backdrop-blur-md flex flex-col justify-end transition-opacity duration-200">
      <div className="w-full max-w-md mx-auto bg-[#171f33] rounded-t-2xl p-4 flex flex-col gap-4 shadow-2xl border-t border-[#2d3449] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3131c0]/30 text-[#c0c1ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">history_edu</span>
            </div>
            <div>
              <span className="font-headline-sm text-[18px] text-[#dae2fd] font-bold block">
                Letters to Past Self
              </span>
              <span className="font-label-sm text-[11px] text-[#bbcabf]">
                Perspective & Stoic Introspection
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

        {isWriting ? (
          <form onSubmit={handleAddLetter} className="flex flex-col gap-3">
            <div>
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Letter Subject / Addressee
              </label>
              <input
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-sm text-[13px] px-3 py-2 rounded-lg outline-none border border-[#2d3449]"
                placeholder="e.g. To the version of me struggling in high school"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />
            </div>
            <div>
              <label className="block font-label-sm text-[11px] text-[#bbcabf] mb-1">
                Your Letter
              </label>
              <textarea
                rows={5}
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-sm text-[13px] p-3 rounded-lg outline-none border border-[#2d3449] resize-none"
                placeholder="Tell your past self what you have learned about perseverance, discipline, and overcoming self-doubt..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsWriting(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#222a3d] text-[#dae2fd] font-label-lg text-[13px] font-semibold"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#c0c1ff] text-[#1000a9] font-label-lg text-[13px] font-bold"
              >
                Seal Letter in Vault
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsWriting(true)}
              className="w-full py-2.5 rounded-xl bg-[#3131c0]/40 text-[#c0c1ff] hover:bg-[#3131c0]/60 font-label-lg text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              Write New Letter to Past Self
            </button>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {letters.map((letter) => (
                <div
                  key={letter.id}
                  className="bg-[#222a3d]/70 p-3.5 rounded-xl border border-[#2d3449]/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-[13px] font-bold text-[#dae2fd]">
                      {letter.title}
                    </span>
                    <span className="font-label-sm text-[10px] text-[#bbcabf]">
                      {letter.date}
                    </span>
                  </div>
                  <p className="font-body-sm text-[12px] text-[#bbcabf] italic leading-relaxed">
                    "{letter.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

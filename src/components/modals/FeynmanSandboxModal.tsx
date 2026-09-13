import React, { useState } from 'react';

interface FeynmanSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeynmanSandboxModal: React.FC<FeynmanSandboxModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [topic, setTopic] = useState('Database Normalization (BCNF)');
  const [eli5, setEli5] = useState(
    'Imagine a kitchen where every cook needs salt, pepper, and pans. If we put every ingredient in one giant chaotic drawer, everyone bumps into each other and messes things up. Normalization is organizing ingredients into dedicated labeled boxes so you never duplicate work or lose a recipe.'
  );
  const [gaps, setGaps] = useState(
    'Need to clarify how functional dependencies are preserved without losing multi-table joins.'
  );
  const [metaphor, setMetaphor] = useState(
    'Each row is like a passport: the passport number (candidate key) alone decides the identity, not the color of the photo.'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/85 backdrop-blur-md flex flex-col justify-end transition-opacity duration-200">
      <div className="w-full max-w-md mx-auto bg-[#171f33] rounded-t-2xl p-4 flex flex-col gap-4 shadow-2xl border-t border-[#2d3449] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            </div>
            <div>
              <span className="font-headline-sm text-[18px] text-[#dae2fd] font-bold block">
                Feynman Sandbox
              </span>
              <span className="font-label-sm text-[11px] text-[#bbcabf]">
                Cognitive ELI5 Retention Protocol
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

        <div className="flex flex-col gap-3">
          {/* Step 1 */}
          <div className="bg-[#222a3d]/70 p-3 rounded-xl border border-[#2d3449]/50">
            <div className="flex items-center gap-1.5 text-[#4edea3] mb-1">
              <span className="font-label-sm text-[11px] bg-[#4edea3]/20 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                1
              </span>
              <span className="font-label-sm text-[12px] font-semibold">Select Target Topic</span>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#060e20] text-[#dae2fd] font-body-sm text-[13px] px-3 py-2 rounded-lg outline-none border border-[#2d3449]"
            />
          </div>

          {/* Step 2 */}
          <div className="bg-[#222a3d]/70 p-3 rounded-xl border border-[#2d3449]/50">
            <div className="flex items-center gap-1.5 text-[#c0c1ff] mb-1">
              <span className="font-label-sm text-[11px] bg-[#3131c0]/40 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                2
              </span>
              <span className="font-label-sm text-[12px] font-semibold">Explain Like I am 5 (ELI5)</span>
            </div>
            <textarea
              rows={3}
              value={eli5}
              onChange={(e) => setEli5(e.target.value)}
              placeholder="Explain in simple words as if teaching a child..."
              className="w-full bg-[#060e20] text-[#dae2fd] font-body-sm text-[13px] p-2.5 rounded-lg outline-none border border-[#2d3449] resize-none"
            />
          </div>

          {/* Step 3 */}
          <div className="bg-[#222a3d]/70 p-3 rounded-xl border border-[#2d3449]/50">
            <div className="flex items-center gap-1.5 text-[#7bd0ff] mb-1">
              <span className="font-label-sm text-[11px] bg-[#19aee8]/20 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                3
              </span>
              <span className="font-label-sm text-[12px] font-semibold">Spot The Knowledge Gaps</span>
            </div>
            <textarea
              rows={2}
              value={gaps}
              onChange={(e) => setGaps(e.target.value)}
              placeholder="Where did your explanation stall or require jargon?"
              className="w-full bg-[#060e20] text-[#dae2fd] font-body-sm text-[13px] p-2.5 rounded-lg outline-none border border-[#2d3449] resize-none"
            />
          </div>

          {/* Step 4 */}
          <div className="bg-[#222a3d]/70 p-3 rounded-xl border border-[#2d3449]/50">
            <div className="flex items-center gap-1.5 text-[#4edea3] mb-1">
              <span className="font-label-sm text-[11px] bg-[#4edea3]/20 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                4
              </span>
              <span className="font-label-sm text-[12px] font-semibold">Refine & Deploy Metaphor</span>
            </div>
            <input
              type="text"
              value={metaphor}
              onChange={(e) => setMetaphor(e.target.value)}
              placeholder="Create an intuitive real-world mental model..."
              className="w-full bg-[#060e20] text-[#dae2fd] font-body-sm text-[13px] px-3 py-2 rounded-lg outline-none border border-[#2d3449]"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#222a3d] text-[#dae2fd] font-label-lg font-semibold active:scale-95"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl bg-[#4edea3] text-[#003824] font-label-lg font-bold active:scale-95 shadow-[0_4px_16px_rgba(78,222,163,0.3)] flex items-center justify-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">done</span>
                  <span>Locked In!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                  <span>Lock In Concept</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';

interface ConfirmStepProps {
  title: string;
  narrative: string;
  onConfirm: () => void;
}

export function ConfirmStep({ title, narrative, onConfirm }: ConfirmStepProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center text-center min-h-[300px] justify-between">
      <div className="flex-1 flex flex-col justify-center">
        <div className={`transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-5xl mb-6">📜</div>

          <h2 className="text-2xl font-semibold text-white mb-8 leading-snug">
            {title}
          </h2>

          <div className="p-5 max-w-sm mx-auto text-left bg-white/[0.02] border border-white/[0.06] rounded-xl">
            {narrative.split('\n').filter(Boolean).map((line, i) => {
              const isBullet = line.trim().startsWith('•');
              const isSpacer = line.trim() === '';
              if (isSpacer) return null;
              if (isBullet) {
                return (
                  <p key={i} className="text-white/70 text-sm leading-relaxed mb-2 pl-2">
                    {line}
                  </p>
                );
              }
              return (
                <p key={i} className="text-white/40 text-sm leading-relaxed mb-2">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className={`mt-8 px-10 py-3.5 rounded-xl bg-gradient-to-r from-[#6247AA] to-[#8063d2] text-white font-semibold
          shadow-lg shadow-[#6247AA]/20 hover:from-[#7C5CBF] hover:to-[#9c86dc]
          transition-all duration-300 text-sm
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        ✍️ Signer la charte et commencer
      </button>
    </div>
  );
}

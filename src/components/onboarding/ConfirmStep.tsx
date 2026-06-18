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

          <div className="glass-panel p-6 max-w-sm mx-auto text-left">
            {narrative.split('\n').filter(Boolean).map((line, i) => {
              const isBullet = line.trim().startsWith('•');
              const isSpacer = line.trim() === '';
              if (isSpacer) return null;
              if (isBullet) {
                return (
                  <p key={i} className="text-slate-300 text-sm leading-relaxed mb-2 pl-2">
                    {line}
                  </p>
                );
              }
              return (
                <p key={i} className="text-slate-400 text-sm leading-relaxed mb-2">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className={`mt-8 px-10 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold
          shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500
          transition-all duration-300 text-sm
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        ✍️ Signer la charte et commencer
      </button>
    </div>
  );
}

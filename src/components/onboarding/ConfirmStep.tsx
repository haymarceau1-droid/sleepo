import { useState, useEffect, useRef } from 'react';

interface ConfirmStepProps {
  title: string;
  narrative?: string;
  onConfirm: () => void;
}

const promises = [
  { icon: '🛡️', text: 'Prendre soin de mon sommeil, sans pression' },
  { icon: '🌙', text: 'Honorer mon rythme, même imparfait' },
  { icon: '🃏', text: 'Utiliser mes jokers sans honte' },
  { icon: '🎉', text: 'Célébrer chaque petite victoire' },
  { icon: '💜', text: 'Être bienveillant·e envers moi-même' },
];

export function ConfirmStep({ title, onConfirm }: ConfirmStepProps) {
  const [showContent, setShowContent] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSign = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => btnRef.current?.style.removeProperty('transform'), 150);
    }
    setTimeout(() => onConfirm(), 400);
  };

  return (
    <div className="flex flex-col items-center text-center min-h-[300px] justify-between">
      <div className="flex-1 flex flex-col justify-center w-full">
        <div className={`transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative mb-4">
            <div className="text-4xl mb-2">📜✨</div>
          </div>

          <h2 className="text-xl font-bold text-white mb-5 leading-snug">
            {title}
          </h2>

          <div className="bg-[#131627] border border-white/[0.06] rounded-2xl p-4 max-w-sm mx-auto text-left space-y-2.5">
            {promises.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-sm mt-0.5 flex-shrink-0">{p.icon}</span>
                <p className="text-white/75 text-xs leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 mb-2">
            <div className="flex items-center justify-center gap-2 text-white/20 text-[10px]">
              <div className="h-px w-12 bg-white/[0.06]" />
              <span>Ma signature</span>
              <div className="h-px w-12 bg-white/[0.06]" />
            </div>
            <div className="mt-2 flex justify-center">
              <div className="w-[200px] h-10 rounded-lg bg-[#131627] border border-white/[0.06] flex items-center justify-center">
                <span className="text-[#6247AA] text-sm font-light italic tracking-wider">~ aventurier·ère de la nuit ~</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        ref={btnRef}
        onClick={handleSign}
        className={`mt-6 px-10 py-3.5 rounded-xl bg-gradient-to-r from-[#6247AA] to-[#8063d2] text-white font-semibold
          shadow-lg shadow-[#6247AA]/20 hover:from-[#7C5CBF] hover:to-[#9c86dc] hover:shadow-xl hover:shadow-[#6247AA]/30
          transition-all duration-200 text-sm active:scale-95
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        ✍️ Je signe et commence l'aventure
      </button>
    </div>
  );
}

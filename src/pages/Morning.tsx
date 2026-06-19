import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { Starfield } from '../components/ui/Starfield';

export function Morning() {
  const navigate = useNavigate();
  const answers = useGameStore((s) => s.answers);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(el.querySelectorAll('.aa-garden-item'),
        { opacity: 0, scale: 0, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(el.querySelector('.aa-cta'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.1'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const guardianEmoji = () => {
    switch (answers.guardian) {
      case 'hibou': return '🦉';
      case 'renard': return '🦊';
      case 'chat': return '🐱';
      default: return '🌙';
    }
  };

  const guardianText = () => {
    switch (answers.guardian) {
      case 'hibou': return 'petit hibou';
      case 'renard': return 'petit renard';
      case 'chat': return 'petit chat';
      default: return 'aventurier·ère';
    }
  };

  return (
    <>
      <Starfield />
      <div ref={rootRef} className="flex flex-col items-center px-4 pt-8 pb-8 min-h-[80vh] justify-center relative z-10">
        <div className="text-5xl mb-4 animate-float">{guardianEmoji()}</div>

        <h1 className="text-[28px] font-bold text-white mb-2 text-center">
          Bonjour, {guardianText()}.
        </h1>

        <div className="max-w-sm text-center mb-8">
          <p className="text-[15px] text-white/60 leading-relaxed">
            Tu as posé tes écrans hier soir, ton esprit a dormi 7h15 dans le calme.
          </p>
          <p className="text-[15px] text-white/60 leading-relaxed mt-2">
            Ton jardin gagne de nouvelles étoiles !
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 py-6 px-8 rounded-[20px] bg-white/[0.02]">
          <span className="text-3xl aa-garden-item">🌱</span>
          <span className="text-3xl aa-garden-item" style={{ animationDelay: '0.15s' }}>🌿</span>
          <span className="text-3xl aa-garden-item" style={{ animationDelay: '0.3s' }}>🌸</span>
          <span className="text-3xl aa-garden-item" style={{ animationDelay: '0.45s' }}>⭐</span>
          <span className="text-3xl aa-garden-item" style={{ animationDelay: '0.6s' }}>🌙</span>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="aa-cta w-full max-w-sm py-4 rounded-[14px] bg-gradient-to-r from-[#6247AA] to-[#a06cd5] text-white font-bold text-base
            shadow-lg shadow-[#6247AA]/30 hover:from-[#a06cd5] hover:to-[#e2cfea] transition-all duration-300 active:scale-[0.97]"
        >
          Cultiver mon jardin 🏞️
        </button>
      </div>
    </>
  );
}

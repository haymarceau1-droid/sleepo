import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const mockWeekHistory = [true, true, true, false, true, true, false];

const mockFriends = [
  { name: 'Thomas', streak: 5, online: true, emoji: '🐺' },
  { name: 'Camille', streak: 3, online: false, emoji: '🦉' },
  { name: 'Lucas', streak: 7, online: true, emoji: '🦊' },
];

function StreakCalendar({ history }: { history: boolean[] }) {
  return (
    <div className="flex items-center justify-center gap-2.5 mt-1">
      {weekDays.map((day, i) => {
        const histIdx = i;
        const done = history[histIdx];
        const isToday = i === 6;
        return (
          <div key={day} className="flex flex-col items-center gap-1.5">
            <span className={`text-[9px] font-semibold ${isToday ? 'text-[#a06cd5]' : 'text-white/30'}`}>{day}</span>
            <div
              className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[13px] transition-all duration-500 ${
                isToday
                  ? 'bg-gradient-to-br from-[#6247AA] to-[#a06cd5] shadow-[0_0_12px_rgba(98,71,170,0.4)] scale-110'
                  : done
                    ? 'bg-[#6247AA]/20 text-white/80'
                    : 'bg-white/[0.04] text-white/20'
              } ${done && !isToday ? 'aa-streak-done' : ''}`}
            >
              {isToday ? '🔥' : done ? '✓' : '•'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const streak = useGameStore((s) => s.streak);
  const answers = useGameStore((s) => s.answers);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const padlockRef = useRef<HTMLDivElement>(null);
  const [sleepLock, setSleepLock] = useState(false);
  const pressTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 })
      .fromTo(el.querySelectorAll('.aa-card'),
        { opacity: 0, y: 24, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 },
        '-=0.1'
      )
      .fromTo(el.querySelectorAll('.aa-streak-done'),
        { scale: 0 },
        { scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' },
        '-=0.2'
      )
      .fromTo(el.querySelector('[data-glass="button"]'),
        { opacity: 0, y: 12, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4 },
        '-=0.1'
      );

    if (flameRef.current) {
      gsap.to(flameRef.current, {
        scale: 1.08, duration: 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut',
      });
    }

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!sleepLock || !lockRef.current) return;
    const lock = lockRef.current;
    const padlock = padlockRef.current;

    gsap.fromTo(lock,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    if (padlock) {
      gsap.to(padlock, {
        scale: 1.05,
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 0.5,
      });
    }
  }, [sleepLock]);

  const goalLabel = () => {
    switch (answers.mainGoal) {
      case 'doomscrolling': return 'Éteindre tout à 22h';
      case 'overheat': return 'Méditer 10 min';
      case 'alarm': return 'Se lever à 7h30';
      case 'irregular': return 'Rituel du coucher';
      default: return 'Prends soin de toi !';
    }
  };

  return (
    <>
    <div ref={rootRef} className="flex flex-col px-4 pt-3 pb-4 gap-[11px]">
      {/* Carte 1: Streak */}
      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center gap-3 mb-3">
          <div ref={flameRef} className="text-[28px] origin-bottom">🌙</div>
          <div>
            <p className="text-[15px] font-bold text-white">{streak.currentStreak} JOURS</p>
            <p className="text-[11px] text-white/35">Continue comme ça, {answers.guardian === 'hibou' ? 'petit hibou' : answers.guardian === 'renard' ? 'petit renard' : 'petit chat'} !</p>
          </div>
        </div>
        <StreakCalendar history={mockWeekHistory} />
      </GlassCard>

      {/* Carte 2: Mission du jour */}
      <GlassCard className="p-[18px] flex items-center gap-3 aa-card">
        <div className="w-[48px] h-[48px] rounded-[14px] bg-gradient-to-br from-[#6247AA]/20 to-[#a06cd5]/10 flex items-center justify-center text-[22px]">
          🛏️
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-semibold text-white/90">Mission du jour</p>
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#6247AA]/15 text-[#e2cfea]">✨</span>
          </div>
          <p className="text-[12px] text-white/60 mt-0.5">Mission : {goalLabel()}</p>
          <p className="text-[10px] text-white/35 mt-0.5">Prends soin de toi !</p>
        </div>
      </GlassCard>

      {/* Carte 3: Aperçu Amis */}
      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[16px]">👥</span>
            <p className="text-[13px] font-semibold text-white/90">Score des amis</p>
          </div>
          <button
            onClick={() => navigate('/sleepcircle')}
            className="text-[11px] font-medium text-[#a06cd5] hover:text-[#e2cfea] transition-colors"
          >
            Voir tout →
          </button>
        </div>
        <div className="relative overflow-hidden rounded-[12px] p-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex gap-3 justify-center">
            {mockFriends.map((friend) => (
              <div key={friend.name} className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  <div className="w-[44px] h-[44px] rounded-full bg-white/[0.04] flex items-center justify-center text-[20px]">
                    {friend.emoji}
                  </div>
                  <div className={`absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] rounded-full border-2 border-[#102b3f] ${
                    friend.online ? 'bg-[#a06cd5] shadow-[0_0_6px_rgba(160,108,213,0.4)]' : 'bg-white/[0.08]'
                  }`} />
                </div>
                <p className="text-[10px] font-medium text-white/70">{friend.name}</p>
                <div className="px-2 py-0.5 rounded-full bg-[#6247AA]/10">
                  <span className="text-[8px] font-semibold text-[#a06cd5]">🔥 {friend.streak}j</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Big CTA */}
      <div className="mt-2">
        <GlassButton onClick={() => setSleepLock(true)} className="w-full h-[56px] text-[17px]">
          🌙 JE VAIS DORMIR
        </GlassButton>
      </div>

      {/* Links d'évitement */}
      <div className="flex justify-center gap-4 mt-0.5">
        <button
          onClick={() => navigate('/evening')}
          className="text-[11px] text-white/25 hover:text-white/40 transition-colors"
        >
          Ou choisis un joker 📑
        </button>
        <span className="text-white/15 text-[11px]">|</span>
        <button
          onClick={() => navigate('/sleepcircle')}
          className="text-[11px] text-white/25 hover:text-white/40 transition-colors"
        >
          Voir les missions des amis
        </button>
      </div>
    </div>

    {/* Sleep Lock Overlay */}
    {sleepLock && (
      <div
        ref={lockRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse at center, #0a1628 0%, #060a12 100%)',
        }}
        onPointerDown={() => {
          pressTimerRef.current = window.setTimeout(() => {
            setSleepLock(false);
          }, 1200);
        }}
        onPointerUp={() => {
          if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current);
            pressTimerRef.current = null;
          }
        }}
        onPointerLeave={() => {
          if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current);
            pressTimerRef.current = null;
          }
        }}
      >
        <div ref={padlockRef} className="text-[80px] mb-6">🔒</div>
        <h2 className="text-[24px] font-bold text-white mb-2">Bonne nuit.</h2>
        <p className="text-[14px] text-white/40 text-center max-w-xs leading-relaxed mb-12">
          Pose ton téléphone.<br />Tu as mérité ton repos.
        </p>
        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-1">
          <div className="w-[60px] h-[60px] rounded-full border-2 border-white/[0.06] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-30" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <p className="text-[10px] text-white/15 mt-1">Maintiens pour déverrouiller</p>
        </div>
      </div>
    )}
    </>
  );
}

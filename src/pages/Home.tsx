import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const mockWeekHistory = [true, true, true, false, true, true, false];
const mockSleepData = [6.5, 7.2, 8.0, 5.8, 7.5, 8.5, 7.0];
const mockEnergyData = [4, 6, 8, 3, 7, 9, 6];

const mockFriends = [
  { name: 'Thomas', streak: 5, online: true, emoji: '🐺' },
  { name: 'Camille', streak: 3, online: false, emoji: '🦉' },
  { name: 'Lucas', streak: 7, online: true, emoji: '🦊' },
];

function SleepChart({ data, color, label }: { data: number[]; color: string; label: string }) {
  const w = 320, h = 100, px = 24, py = 10;
  const iw = w - px * 2, ih = h - py * 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [px + (iw / (data.length - 1)) * i, py + ih - ((v - min) / range) * ih] as const);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `M${pts[0][0].toFixed(1)},${py + ih} L${pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L')} L${pts[pts.length-1][0].toFixed(1)},${py + ih} Z`;

  return (
    <div className="flex flex-col items-center">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#grad-${label})`} className="aa-chart-area" />
        <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="aa-chart-line" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} className="aa-chart-dot" style={{ opacity: 0 }}>
            <title>{data[i]}h</title>
          </circle>
        ))}
      </svg>
      <div className="flex justify-between w-[320px] mt-0.5">
        {weekDays.map((d, i) => (
          <span key={d} className={`text-[8px] font-medium ${i === 6 ? 'text-[#a06cd5]' : 'text-white/25'}`}>{d}</span>
        ))}
      </div>
    </div>
  );
}

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
      .fromTo(el.querySelectorAll('.aa-chart-line'),
        { strokeDasharray: 400, strokeDashoffset: 400 },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
        '-=0.3'
      )
      .fromTo(el.querySelectorAll('.aa-chart-area'),
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.8'
      )
      .fromTo(el.querySelectorAll('.aa-chart-dot'),
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(2)' },
        '-=0.4'
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

  const ritualEmoji = () => {
    switch (answers.preferredRitual) {
      case 'lecture': return '📖';
      case 'musique': return '🎵';
      case 'meditation': return '🧘';
      case 'ecriture': return '✍️';
      case 'the': return '🍵';
      default: return '🌙';
    }
  };

  const ritualLabel = () => {
    switch (answers.preferredRitual) {
      case 'lecture': return 'Lecture 15 min';
      case 'musique': return 'Musique douce';
      case 'meditation': return 'Méditation';
      case 'ecriture': return 'Écrire dans ton journal';
      case 'the': return 'Infusion du soir';
      default: return 'Tout éteindre à 22h';
    }
  };

  const avgSleep = (mockSleepData.reduce((a, b) => a + b, 0) / mockSleepData.length).toFixed(1);
  const avgEnergy = Math.round(mockEnergyData.reduce((a, b) => a + b, 0) / mockEnergyData.length);

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-2 pb-4 gap-[11px]">
      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center gap-3 mb-3">
          <div ref={flameRef} className="text-[28px] origin-bottom">🔥</div>
          <div>
            <p className="text-[15px] font-bold text-white">Streak de {streak.currentStreak} jours</p>
            <p className="text-[11px] text-white/35">Record : {streak.longestStreak} jours</p>
          </div>
        </div>
        <StreakCalendar history={mockWeekHistory} />
      </GlassCard>

      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[16px]">😴</span>
          <p className="text-[13px] font-semibold text-white/90">Temps de sommeil</p>
        </div>
        <SleepChart data={mockSleepData} color="#a06cd5" label="sleep" />
        <div className="text-center mt-2">
          <p className="text-[20px] font-bold text-[#a06cd5]">{avgSleep}h</p>
          <p className="text-[9px] text-white/30">Moyenne 7 nuits</p>
        </div>
      </GlassCard>

      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[16px]">⚡</span>
          <p className="text-[13px] font-semibold text-white/90">Niveau d'énergie</p>
        </div>
        <SleepChart data={mockEnergyData} color="#e2cfea" label="energy" />
        <div className="text-center mt-2">
          <p className="text-[20px] font-bold text-[#e2cfea]">{avgEnergy}/10</p>
          <p className="text-[9px] text-white/30">Moyenne 7 nuits</p>
        </div>
      </GlassCard>

      <GlassCard className="p-[18px] flex items-center gap-3 aa-card">
        <div className="w-[48px] h-[48px] rounded-[14px] bg-gradient-to-br from-[#6247AA]/20 to-[#a06cd5]/10 flex items-center justify-center text-[22px] animate-bounce" style={{ animationDuration: '2s' }}>
          {ritualEmoji()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-semibold text-white/90">Mission du jour</p>
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#6247AA]/15 text-[#e2cfea]">✨</span>
          </div>
          <p className="text-[12px] text-white/60 mt-0.5">{ritualLabel()}</p>
        </div>
      </GlassCard>

      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[16px]">👥</span>
            <p className="text-[13px] font-semibold text-white/90">Tes potes du cercle</p>
          </div>
          <button
            onClick={() => navigate('/sleepcircle')}
            className="text-[11px] font-medium text-[#a06cd5] hover:text-[#e2cfea] transition-colors"
          >
            Voir tout →
          </button>
        </div>
        <div className="flex gap-2">
          {mockFriends.map((friend) => (
            <div key={friend.name} className="flex-1 flex flex-col items-center gap-2 bg-white/[0.02] rounded-[12px] py-3 px-2 hover:bg-white/[0.04] transition-all">
              <div className="relative">
                <div className="w-[40px] h-[40px] rounded-full bg-white/[0.04] flex items-center justify-center text-[17px]">
                  {friend.emoji}
                </div>
                <div className={`absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] rounded-full border-2 border-[#062726] ${
                  friend.online ? 'bg-[#a06cd5] shadow-[0_0_6px_rgba(160,108,213,0.4)]' : 'bg-white/[0.08]'
                }`} />
              </div>
              <p className="text-[11px] font-medium text-white/80">{friend.name}</p>
              <p className="text-[10px] text-white/35">🔥 {friend.streak}j</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-1">
        <GlassButton onClick={() => navigate('/evening')} className="w-full h-[54px] text-[16px]">
          🌙 JE VAIS DORMIR
        </GlassButton>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { GlassCard } from '../components/ui/GlassCard';

interface SwitchProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function ToggleSwitch({ label, description, checked, onChange }: SwitchProps) {
  return (
    <div className="flex items-center justify-between py-3 px-1">
      <div className="flex-1 pr-4">
        <p className="text-[13px] font-medium text-white/80">{label}</p>
        <p className="text-[10px] text-white/35 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-[44px] h-[26px] rounded-full transition-all duration-300 flex-shrink-0 ${
          checked ? 'bg-[#6247AA]' : 'bg-white/[0.08]'
        }`}
      >
        <div
          className={`absolute top-[3px] w-[20px] h-[20px] rounded-full bg-white shadow-md transition-all duration-300 ${
            checked ? 'left-[21px]' : 'left-[3px]'
          }`}
        />
      </button>
    </div>
  );
}

export function Settings() {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [switches, setSwitches] = useState({
    shareRoutines: true,
    hideWakeUp: false,
    incognito: false,
  });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(el.querySelectorAll('.aa-card'),
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      )
      .fromTo(el.querySelectorAll('.aa-toggle'),
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 },
        '-=0.15'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-3 pb-4 gap-[11px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1 aa-card">
        <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white/70 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-[18px] font-bold text-white">Paramètres</h2>
      </div>

      {/* Vie privée */}
      <GlassCard className="p-[16px] aa-card">
        <h3 className="text-[13px] font-semibold text-white/80 mb-1">Vie privée & Confidentialité</h3>
        <p className="text-[10px] text-white/30 mb-3">Contrôle tes données et leur partage</p>
        <div className="divide-y divide-white/[0.03]">
          <div className="aa-toggle">
            <ToggleSwitch
              label="Partager mes validations de routine"
              description="Autorise tes amis à voir quand tu valides une mission"
              checked={switches.shareRoutines}
              onChange={(v) => setSwitches((s) => ({ ...s, shareRoutines: v }))}
            />
          </div>
          <div className="aa-toggle">
            <ToggleSwitch
              label="Masquer mes heures exactes de réveil"
              description="Affiche uniquement ta durée de sommeil, pas l'heure"
              checked={switches.hideWakeUp}
              onChange={(v) => setSwitches((s) => ({ ...s, hideWakeUp: v }))}
            />
          </div>
          <div className="aa-toggle">
            <ToggleSwitch
              label="Activer le Mode Incognito"
              description="Sommeil privé — aucun partage d'activité"
              checked={switches.incognito}
              onChange={(v) => setSwitches((s) => ({ ...s, incognito: v }))}
            />
          </div>
        </div>
      </GlassCard>

      {/* Account */}
      <GlassCard className="p-[16px] aa-card">
        <h3 className="text-[13px] font-semibold text-white/80 mb-3">Compte</h3>
        <div className="space-y-2">
          <button className="w-full text-left py-2.5 px-3 rounded-[10px] bg-white/[0.02] text-[12px] text-white/60 hover:bg-white/[0.04] transition-colors">
            Modifier mon pseudo
          </button>
          <button className="w-full text-left py-2.5 px-3 rounded-[10px] bg-white/[0.02] text-[12px] text-white/60 hover:bg-white/[0.04] transition-colors">
            Changer de gardien
          </button>
        </div>
      </GlassCard>

      {/* Autorisations */}
      <GlassCard className="p-[16px] aa-card">
        <h3 className="text-[13px] font-semibold text-white/80 mb-3">Autorisations</h3>
        <button
          onClick={() => navigate('/screen-time-permission')}
          className="w-full text-left py-2.5 px-3 rounded-[10px] bg-white/[0.02] text-[12px] text-white/60 hover:bg-white/[0.04] transition-colors flex items-center justify-between"
        >
          <span>🍎 Accès au Temps d'Écran</span>
          <span className="text-white/20">→</span>
        </button>
      </GlassCard>

      {/* About */}
      <GlassCard className="p-[16px] aa-card">
        <h3 className="text-[13px] font-semibold text-white/80 mb-3">À propos</h3>
        <div className="space-y-2 text-[11px] text-white/30">
          <p>Sleepo v1.0.0</p>
          <p>Fait avec 🌙 pour des nuits paisibles</p>
        </div>
      </GlassCard>
    </div>
  );
}

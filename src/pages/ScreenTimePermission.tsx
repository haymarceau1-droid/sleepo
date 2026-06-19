import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { GlassCard } from '../components/ui/GlassCard';
import { Starfield } from '../components/ui/Starfield';

const permissionItems = [
  {
    icon: '📱',
    title: 'Temps d\'écran',
    desc: 'Voir combien de temps tu passes sur chaque app pour t\'aider à déconnecter le soir.',
  },
  {
    icon: '📊',
    title: 'Activité des apps',
    desc: 'Identifier les applications qui perturbent ton sommeil (réseaux, jeux, vidéos).',
  },
  {
    icon: '🌐',
    title: 'Navigation web',
    desc: 'Comprendre tes habitudes de navigation en soirée pour proposer des alternatives.',
  },
  {
    icon: '🔒',
    title: 'Données privées',
    desc: 'Rien n\'est partagé. Tes données restent sur ton appareil, en local.',
  },
];

export function ScreenTimePermission() {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(el.querySelectorAll('.aa-card'),
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 },
        '-=0.2'
      )
      .fromTo(el.querySelectorAll('.aa-permitem'),
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.06 },
        '-=0.2'
      )
      .fromTo(el.querySelector('[data-glass="button"]'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 },
        '-=0.1'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-aave-bg flex flex-col relative">
      <Starfield />
      <div ref={rootRef} className="flex-1 flex flex-col px-4 pt-4 pb-8 relative z-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white/70 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h2 className="text-[18px] font-bold text-white">Autorisations Apple</h2>
        </div>

        {/* Hero card */}
        <GlassCard className="p-[22px] text-center aa-card">
          <div className="w-[64px] h-[64px] rounded-full bg-[#6247AA]/10 flex items-center justify-center text-[32px] mx-auto mb-3">
            🍎
          </div>
          <h3 className="text-[16px] font-semibold text-white mb-2">
            Accès au Temps d'Écran
          </h3>
          <p className="text-[12px] text-white/50 leading-relaxed">
            Sleepo peut t'aider à mieux dormir en analysant ton utilisation de l'iPhone.
            Avec ton autorisation, nous pouvons suivre les données suivantes :
          </p>
        </GlassCard>

        {/* Permission items */}
        <div className="aa-card">
          {permissionItems.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-4 py-3.5 aa-permitem"
              style={{ borderBottom: i < permissionItems.length - 1 ? '0.5px solid rgba(255,255,255,0.04)' : undefined }}
            >
              <span className="text-[20px] mt-0.5 flex-shrink-0">{item.icon}</span>
              <div>
                <p className="text-[13px] font-medium text-white/80">{item.title}</p>
                <p className="text-[10px] text-white/35 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security note */}
        <GlassCard className="p-[16px] aa-card">
          <div className="flex items-start gap-2.5">
            <span className="text-[16px] mt-0.5">🛡️</span>
            <div>
              <p className="text-[12px] text-white/70 font-medium">Tes données restent privées</p>
              <p className="text-[10px] text-white/35 mt-0.5 leading-relaxed">
                Apple impose que toutes les données Screen Time restent sur l'appareil.
                Rien n'est envoyé à des serveurs externes. Tu peux révoquer l'accès à tout
                moment dans Réglages &gt; Confidentialité &gt; Temps d'écran.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* CTA */}
        <button
          data-glass="button"
          onClick={() => {
            // In native app: open Screen Time settings
            // In PWA: inform user to go to Settings
            alert('Ouvre Réglages > Temps d\'écran > Autoriser Sleepo pour activer l\'accès.');
          }}
          className="mt-auto w-full py-4 rounded-[14px] bg-gradient-to-r from-[#6247AA] to-[#a06cd5] text-white font-bold text-base
            shadow-lg shadow-[#6247AA]/30 hover:from-[#a06cd5] hover:to-[#e2cfea] transition-all duration-300 active:scale-[0.97]"
        >
          Activer l'accès au Temps d'Écran
        </button>

        <p className="text-[10px] text-white/20 text-center mt-3">
          Tu pourras modifier ce choix à tout moment dans les Paramètres.
        </p>
      </div>
    </div>
  );
}

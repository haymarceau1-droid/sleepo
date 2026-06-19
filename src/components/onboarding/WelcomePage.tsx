interface WelcomePageProps {
  onStart: () => void;
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="flex flex-col items-center text-center min-h-[500px] justify-between py-8">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="relative mb-8">
          <div className="text-7xl animate-float">🌙</div>
          <div className="absolute -top-2 -right-4 text-3xl animate-twinkle" style={{ '--duration': '2s' } as React.CSSProperties}>
            ✨
          </div>
          <div className="absolute -bottom-1 -left-3 text-2xl animate-twinkle" style={{ '--duration': '3s', '--delay': '0.5s' } as React.CSSProperties}>
            🌟
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Bonjour !
        </h1>

        <p className="text-white/60 text-base leading-relaxed max-w-xs mx-auto">
          C'est l'heure de cultiver tes rêves, petit hibou. 🦉
        </p>
        <p className="text-white/60 text-base leading-relaxed max-w-xs mx-auto mt-1">
          Prêt pour un jardin de nuits paisibles ? ✨
        </p>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={onStart}
          className="w-full py-4 rounded-[14px] bg-gradient-to-r from-[#6247AA] to-[#a06cd5] text-white font-bold text-base
            shadow-lg shadow-[#6247AA]/30 hover:from-[#a06cd5] hover:to-[#e2cfea] hover:shadow-xl hover:shadow-[#6247AA]/40
            transition-all duration-300 active:scale-[0.97]"
        >
          C'EST PARTI ! ✨
        </button>

        <button className="w-full text-white/30 text-xs py-2 hover:text-white/50 transition-colors">
          Tu as déjà un compte ? Se connecter
        </button>
      </div>
    </div>
  );
}

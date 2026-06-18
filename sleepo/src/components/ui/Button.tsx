interface ButtonProps {
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'confirm';
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({ onClick, variant = 'ghost', disabled = false, children }: ButtonProps) {
  const base = 'px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 disabled:opacity-40 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    ghost: `${base} text-slate-300 hover:text-white hover:bg-white/5`,
    primary: `${base} bg-gradient-to-r from-amber-500/20 to-celadon-500/20 border border-amber-500/20 text-amber-300 hover:from-amber-500/30 hover:to-celadon-500/30 hover:border-amber-500/30`,
    confirm: `${base} bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500`,
  };

  return (
    <button onClick={onClick} disabled={disabled} className={variants[variant]}>
      {children}
    </button>
  );
}

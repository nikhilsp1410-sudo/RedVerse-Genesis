
const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/50 shadow-[0_0_10px_rgba(217,4,41,0.2)]',
    success: 'bg-green-500/10 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]',
    warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)]',
    default: 'bg-surface-light text-text-muted border border-white/10'
  };

  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;

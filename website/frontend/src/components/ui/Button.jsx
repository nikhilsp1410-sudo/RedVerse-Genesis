import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold font-sans rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed interactive group relative overflow-hidden";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary hover:shadow-[0_0_20px_rgba(217,4,41,0.5)] border border-transparent",
    secondary: "bg-surface-light text-white hover:bg-surface border border-white/10 hover:border-white/30",
    outline: "bg-transparent text-white border border-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(217,4,41,0.3)]",
    ghost: "bg-transparent text-text-muted hover:text-white hover:bg-white/5 border border-transparent",
    danger: "bg-danger text-white hover:bg-red-600 border border-transparent shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm rounded-lg",
    md: "px-7 py-3.5 text-base rounded-2xl",
    lg: "px-10 py-4 text-lg rounded-2xl"
  };

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      disabled={isLoading}
      aria-disabled={isLoading}
      {...props}
    >
      {/* Premium Sweep effect - minimal and clean */}
      {!isLoading && variant !== 'ghost' && (
        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-[0.10] group-hover:animate-sweep"></div>
      )}
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {!isLoading && IconLeft && <IconLeft className="w-5 h-5" />}
        {children}
        {!isLoading && IconRight && <IconRight className="w-5 h-5" />}
      </span>
    </motion.button>
  );
};

export default Button;

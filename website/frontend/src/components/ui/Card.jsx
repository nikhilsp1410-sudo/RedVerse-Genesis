import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const Card = ({ children, className = '', interactive = false, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse values
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map mouse position to rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  // Dynamic Glare
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Tilt values (-0.5 to 0.5)
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    // Glare values (0% to 100%)
    mouseX.set(((e.clientX - rect.left) / width) * 100);
    mouseY.set(((e.clientY - rect.top) / height) * 100);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    x.set(0);
    y.set(0);
    mouseX.set(50);
    mouseY.set(50);
  };

  const interactiveStyles = interactive 
    ? "cursor-pointer hover:border-primary/30 hover:shadow-[0_15px_40px_rgba(217,4,41,0.1)] group relative z-10" 
    : "";

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformStyle: "preserve-3d"
      }}
      className={`bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${interactiveStyles} ${className}`}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          if (props.onClick) props.onClick(e);
        }
      }}
      {...props}
    >
      {/* Glare Sheen Layer */}
      {interactive && (
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background }}
        />
      )}

      {/* Content Wrapper */}
      <div style={{ transform: interactive ? "translateZ(20px)" : "none" }} className="w-full h-full transition-transform duration-300 relative z-10">
        {children}
      </div>
      
      {/* Dynamic Border Glow */}
      {interactive && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-3xl" style={{ boxShadow: 'inset 0 0 0 1px rgba(217,4,41,0.3)' }} />
      )}
    </motion.div>
  );
};

export default Card;

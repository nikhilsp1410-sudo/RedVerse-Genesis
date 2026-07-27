import { motion } from 'framer-motion';

const Skeleton = ({ className = '', rounded = 'rounded-xl', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ 
        repeat: Infinity, 
        repeatType: 'reverse', 
        duration: 1.2, 
        ease: 'easeInOut' 
      }}
      className={`bg-surface-light border border-white/5 ${rounded} ${className}`}
      {...props}
    />
  );
};

export default Skeleton;

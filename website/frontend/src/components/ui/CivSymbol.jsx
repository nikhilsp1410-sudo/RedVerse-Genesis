import { motion } from 'framer-motion';

const iconVariants = {
  hidden: {
    pathLength: 0,
    fill: "rgba(217, 4, 41, 0)",
    opacity: 0
  },
  visible: {
    pathLength: 1,
    fill: "rgba(217, 4, 41, 0.1)",
    opacity: 1,
    transition: {
      default: { duration: 2, ease: "easeInOut" },
      fill: { duration: 1, ease: [1, 0, 0.8, 1], delay: 1.5 }
    }
  }
};

/**
 * Procedural SVG Civilization Symbols with draw-in animation
 */
const CivSymbol = ({ type, className = '' }) => {
  const getPath = () => {
    switch (type) {
      case 'anomaly': // The Crimson Anomaly
        return (
          <motion.path
            d="M50 10 L90 50 L50 90 L10 50 Z M50 25 L75 50 L50 75 L25 50 Z M50 40 L60 50 L50 60 L40 50 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />
        );
      case 'monks': // Aether Monks
        return (
          <motion.path
            d="M50 10 A 40 40 0 1 1 49.9 10 Z M50 25 L65 75 L35 75 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />
        );
      case 'syndicate': // Neon Syndicate
        return (
          <motion.path
            d="M20 20 L80 20 L80 80 L20 80 Z M35 20 L35 80 M65 20 L65 80 M20 35 L80 35 M20 65 L80 65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />
        );
      case 'knights': // Cyber Knights
        return (
          <motion.path
            d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z M50 25 L50 75 M25 40 L75 40"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-32 h-32 text-primary ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(217,4,41,0.5)]">
        {getPath()}
      </svg>
    </div>
  );
};

export default CivSymbol;

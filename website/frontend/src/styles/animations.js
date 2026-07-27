// Reusable Framer Motion animation variants

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const hoverGlow = {
  rest: { 
    boxShadow: "0px 0px 0px rgba(217, 4, 41, 0)",
    scale: 1
  },
  hover: { 
    boxShadow: "0px 0px 20px rgba(217, 4, 41, 0.4)",
    scale: 1.02,
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.98,
    boxShadow: "0px 0px 10px rgba(217, 4, 41, 0.6)",
  }
};

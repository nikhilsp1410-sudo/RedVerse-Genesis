export const staggerContainer = (staggerChildren = 0.1) => ({
  animate: {
    transition: {
      staggerChildren
    }
  }
});

import { motion } from 'framer-motion';

const Section = ({ children, className = '', id, ...props }) => {
  return (
    <motion.section 
      id={id} 
      className={`py-24 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default Section;

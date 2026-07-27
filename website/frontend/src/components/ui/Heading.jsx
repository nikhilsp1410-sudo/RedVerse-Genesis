
const Heading = ({ 
  children, 
  level = 2, 
  className = '', 
  gradient = false,
  ...props 
}) => {
  const Tag = `h${level}`;
  
  const baseStyles = 'font-heading font-bold tracking-tighter leading-tight';
  
  const sizeStyles = {
    1: 'text-5xl md:text-6xl lg:text-7xl',
    2: 'text-4xl md:text-5xl lg:text-6xl',
    3: 'text-3xl md:text-4xl',
    4: 'text-2xl md:text-3xl',
    5: 'text-xl md:text-2xl',
    6: 'text-lg md:text-xl',
  };

  const gradientStyles = gradient 
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'
    : 'text-text-main';

  return (
    <Tag 
      className={`${baseStyles} ${sizeStyles[level]} ${gradientStyles} ${className}`} 
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading;

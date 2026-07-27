import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PremiumImage = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  priority = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // If priority is true or image is already cached
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={`relative overflow-hidden bg-surface ${containerClassName}`}>
      {/* Loading Skeleton / Blur Placeholder */}
      {!isLoaded && !error && (
        <motion.div 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, direction: "alternate" }}
          className="absolute inset-0 bg-gradient-to-tr from-surface via-border to-surface z-0"
        />
      )}
      
      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface border border-border/50 text-text-muted text-xs font-display tracking-widest uppercase">
          Artifact Lost
        </div>
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 ease-out z-10 relative ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
};

export default PremiumImage;

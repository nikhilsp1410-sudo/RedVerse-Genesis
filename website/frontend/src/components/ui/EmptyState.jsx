import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import { slideUp } from '@/animations';
import Button from './Button';
import Heading from './Heading';

const EmptyState = ({ 
  icon: Icon = Inbox, 
  title = 'No Data Found', 
  description = 'There is nothing to display here at the moment.', 
  actionLabel, 
  onAction,
  className = ''
}) => {
  return (
    <motion.div 
      variants={slideUp}
      initial="initial"
      animate="animate"
      className={`flex flex-col items-center justify-center p-12 text-center bg-surface border border-white/5 rounded-3xl shadow-inner ${className}`}
    >
      <div className="w-16 h-16 mb-6 rounded-2xl bg-surface-light flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <Icon className="w-8 h-8 text-text-muted" />
      </div>
      
      <Heading level={3} className="mb-2 text-white">{title}</Heading>
      
      <p className="text-text-muted max-w-sm mb-8 leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;

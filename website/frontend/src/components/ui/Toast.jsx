import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ isVisible, onClose, type = 'info', message }) => {
  const types = {
    success: { icon: <CheckCircle className="text-green-500" size={20} />, bg: 'bg-green-500/10 border-green-500/20' },
    error: { icon: <AlertCircle className="text-primary" size={20} />, bg: 'bg-primary/10 border-primary/20' },
    info: { icon: <Info className="text-accent" size={20} />, bg: 'bg-accent/10 border-accent/20' }
  };

  const current = types[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className={`flex items-center space-x-3 p-4 rounded-xl border glass shadow-2xl ${current.bg} min-w-[300px]`}>
            {current.icon}
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button 
              onClick={onClose}
              className="text-text-muted hover:text-white transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

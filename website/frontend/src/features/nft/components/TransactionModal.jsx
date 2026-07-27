import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Loader2, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

const TransactionModal = ({ status, txHash, error, onClose }) => {
  if (!status || status === 'idle') return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        
        {/* AWAITING WALLET STATE */}
        {status === 'awaiting_wallet' && (
          <motion.div
            key="awaiting"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
              <Loader2 size={64} className="text-primary animate-spin relative z-10" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-2 text-glow">Awaiting Wallet</h3>
            <p className="text-text-muted mb-4">Please approve the transaction in your wallet.</p>
          </motion.div>
        )}

        {/* CONFIRMING STATE */}
        {status === 'confirming' && (
          <motion.div
            key="confirming"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
              <Loader2 size={64} className="text-primary animate-spin relative z-10" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-2 text-glow">Confirming...</h3>
            <p className="text-text-muted mb-4">Transaction submitted. Awaiting block confirmation...</p>
            <div className="w-full h-1 bg-surface-light rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}

        {/* SUCCESS STATE */}
        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", bounce: 0.5 }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl" />
              <CheckCircle2 size={64} className="text-green-500 relative z-10" />
            </motion.div>
            <h3 className="text-2xl font-bold font-heading mb-2 text-green-500 text-shadow-sm">Mint Successful!</h3>
            <p className="text-text-muted mb-6">Welcome to the RedVerse. Your entity is being deployed.</p>
            
            <a 
              href={`https://polygonscan.com/tx/${txHash}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors mb-8"
            >
              View on Polygonscan <ExternalLink size={14} />
            </a>

            <Button variant="outline" className="w-full" onClick={onClose}>
              Continue
            </Button>
          </motion.div>
        )}

        {/* ERROR STATE */}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", bounce: 0.5 }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl" />
              <XCircle size={64} className="text-red-500 relative z-10" />
            </motion.div>
            <h3 className="text-2xl font-bold font-heading mb-2 text-red-500">Transaction Failed</h3>
            <p className="text-text-muted mb-6 px-4">{error || "An unknown error occurred during minting."}</p>
            
            <Button variant="outline" className="w-full" onClick={onClose}>
              Dismiss
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionModal;

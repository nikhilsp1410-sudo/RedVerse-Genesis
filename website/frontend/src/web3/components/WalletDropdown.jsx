import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@/web3';
import { LogOut, Copy, CheckCircle2, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { web3Config } from '../config';

export const WalletDropdown = ({ isOpen, onClose }) => {
  const { account, disconnectWallet, shortAddress } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (account) {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-surface-light border border-white/10 shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
          >
            <div className="p-4 border-b border-white/5">
              <p className="text-xs text-text-muted mb-1 font-medium tracking-wider uppercase">Connected Wallet</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-white font-bold">{shortAddress}</span>
                <button 
                  onClick={handleCopy} 
                  className="text-text-muted hover:text-primary transition-colors p-1"
                  title="Copy Address"
                >
                  {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            
            <div className="p-2 space-y-1">
              <a
                href={`${web3Config.network.blockExplorer}/address/${account}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-muted hover:bg-white/5 hover:text-white rounded-lg transition-colors"
              >
                <ExternalLink size={16} />
                <span>View on PolygonScan</span>
              </a>
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Disconnect</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

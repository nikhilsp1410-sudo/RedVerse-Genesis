import { useNetwork, useWallet } from '@/web3';
import Button from '@/components/ui/Button';

export const NetworkBadge = ({ showSuccess = false, className = '' }) => {
  const { isConnected } = useWallet();
  const { isCorrectNetwork, switchNetwork } = useNetwork();

  if (!isConnected) return null;

  if (!isCorrectNetwork) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={switchNetwork} 
        className={`border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 ${className}`}
      >
        Wrong Network
      </Button>
    );
  }

  if (showSuccess) {
    return (
      <div className={`flex items-center gap-2 bg-surface-light border border-white/5 rounded-xl p-3 shadow-lg ${className}`}>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Polygon Mainnet</span>
      </div>
    );
  }

  return null;
};

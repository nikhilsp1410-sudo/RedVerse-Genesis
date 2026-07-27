import { useState } from 'react';
import { useWallet, useNetwork } from '@/web3';
import Button from '@/components/ui/Button';
import { WalletDropdown } from './WalletDropdown';

export const WalletButton = ({ className = '' }) => {
  const { isConnected, connectWallet, shortAddress, isConnecting } = useWallet();
  const { isCorrectNetwork, switchNetwork } = useNetwork();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isConnected) {
    return (
      <Button 
        variant="primary" 
        size="sm" 
        onClick={connectWallet} 
        isLoading={isConnecting}
        className={className}
      >
        Connect Wallet
      </Button>
    );
  }

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

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`bg-surface border border-primary/20 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 hover:border-primary/50 transition-colors ${className}`}
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="font-mono">{shortAddress}</span>
      </button>
      
      <WalletDropdown 
        isOpen={isDropdownOpen} 
        onClose={() => setIsDropdownOpen(false)} 
      />
    </div>
  );
};

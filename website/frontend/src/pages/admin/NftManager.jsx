import Heading from '../../components/ui/Heading';
import Button from '../../components/ui/Button';

const NftManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading level={2}>NFT Manager</Heading>
        <Button size="sm">Reveal Batch</Button>
      </div>
      <div className="bg-surface border border-white/5 rounded-xl p-8 text-center">
         <p className="text-text-muted">NFT Management table will be populated upon database integration.</p>
      </div>
    </div>
  );
};

export default NftManager;

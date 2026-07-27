import Heading from '../../components/ui/Heading';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Settings = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <Heading level={2}>Global Settings</Heading>
      
      <Card className="p-6 space-y-4">
         <div>
           <label className="block text-sm font-medium text-text-muted mb-1">Contract Address</label>
           <input type="text" className="w-full bg-surface-light border border-white/10 rounded-md px-4 py-2 text-white" defaultValue="0x123...abc" />
         </div>
         <div>
           <label className="block text-sm font-medium text-text-muted mb-1">Minting State</label>
           <select className="w-full bg-surface-light border border-white/10 rounded-md px-4 py-2 text-white">
             <option>Paused</option>
             <option>Whitelist Only</option>
             <option>Public</option>
           </select>
         </div>
         <Button className="mt-4">Save Changes</Button>
      </Card>
    </div>
  );
};

export default Settings;

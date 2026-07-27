import Heading from '../../components/ui/Heading';
import Button from '../../components/ui/Button';

const Announcements = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading level={2}>Announcements</Heading>
        <Button size="sm">New Post</Button>
      </div>
      <div className="bg-surface border border-white/5 rounded-xl p-8 text-center">
         <p className="text-text-muted">No announcements found. Create your first lore update.</p>
      </div>
    </div>
  );
};

export default Announcements;

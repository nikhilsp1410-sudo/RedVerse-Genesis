import Heading from '../../components/ui/Heading';

const Users = () => {
  return (
    <div className="space-y-6">
      <Heading level={2}>User Directory</Heading>
      <div className="bg-surface border border-white/5 rounded-xl p-8 text-center">
         <p className="text-text-muted">User management requires database integration.</p>
      </div>
    </div>
  );
};

export default Users;

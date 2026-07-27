import Heading from '../../components/ui/Heading';

const Collections = () => {
  return (
    <div className="space-y-6">
      <Heading level={2}>Collections</Heading>
      <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-light text-text-muted uppercase text-xs tracking-wider border-b border-white/5">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Supply</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 font-medium text-white">Genesis Entities</td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs font-bold uppercase">Active</span></td>
              <td className="px-6 py-4">4,201 / 8,888</td>
              <td className="px-6 py-4">0.05 ETH</td>
              <td className="px-6 py-4 text-right text-primary cursor-pointer hover:underline">Edit</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 font-medium text-white">Weapons Cache</td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-xs font-bold uppercase">Pending</span></td>
              <td className="px-6 py-4">0 / 5,000</td>
              <td className="px-6 py-4">0.02 ETH</td>
              <td className="px-6 py-4 text-right text-primary cursor-pointer hover:underline">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Collections;

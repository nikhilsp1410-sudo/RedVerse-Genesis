
const TraitBadge = ({ trait }) => {
  return (
    <div className="bg-surface-light border border-white/10 rounded-lg p-3 text-center flex flex-col items-center justify-center">
      <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1">{trait.trait_type}</span>
      <span className="text-sm font-bold text-white truncate w-full">{trait.value}</span>
    </div>
  );
};

export default TraitBadge;

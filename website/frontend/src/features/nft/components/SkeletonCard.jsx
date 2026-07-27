import Card from '@/components/ui/Card';

const SkeletonCard = () => {
  return (
    <Card className="h-full animate-pulse flex flex-col">
      <div className="aspect-square bg-surface-light/50 border-b border-white/5" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="h-6 bg-surface-light rounded w-3/4 mb-3" />
        <div className="h-4 bg-surface-light/50 rounded w-full mb-2" />
        <div className="h-4 bg-surface-light/50 rounded w-2/3 mb-4 flex-1" />
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="h-6 bg-surface-light rounded-full w-20" />
          <div className="h-4 bg-surface-light/30 rounded w-12" />
        </div>
      </div>
    </Card>
  );
};

export default SkeletonCard;

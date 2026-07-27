import Heading from '../../components/ui/Heading';
import Card from '../../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const civData = [
  { name: 'Neon Syndicate', value: 400 },
  { name: 'Aether Monks', value: 300 },
  { name: 'Cyber Knights', value: 300 },
  { name: 'Void Walkers', value: 200 },
];

const COLORS = ['#D90429', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <Heading level={2}>Analytics</Heading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Civilization Distribution</h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={civData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={100}
                     fill="#8884d8"
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {civData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip contentStyle={{ backgroundColor: '#0B0B0F', borderColor: '#ffffff20', color: '#fff' }} />
                 </PieChart>
               </ResponsiveContainer>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default Analytics;

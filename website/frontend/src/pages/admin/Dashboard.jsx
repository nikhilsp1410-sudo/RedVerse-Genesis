import Heading from '../../components/ui/Heading';
import Card from '../../components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', mints: 400, activeUsers: 240 },
  { name: 'Tue', mints: 300, activeUsers: 139 },
  { name: 'Wed', mints: 200, activeUsers: 980 },
  { name: 'Thu', mints: 278, activeUsers: 390 },
  { name: 'Fri', mints: 189, activeUsers: 480 },
  { name: 'Sat', mints: 239, activeUsers: 380 },
  { name: 'Sun', mints: 349, activeUsers: 430 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <Heading level={2}>Command Center</Heading>
        <p className="text-text-muted">Overview of RedVerse ecosystem performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
           <h4 className="text-text-muted text-sm font-medium uppercase tracking-wider mb-2">Total Minted</h4>
           <div className="text-4xl font-heading font-bold">4,201</div>
           <div className="mt-2 text-green-500 text-sm font-medium">+12% from last week</div>
        </Card>
        <Card className="p-6">
           <h4 className="text-text-muted text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</h4>
           <div className="text-4xl font-heading font-bold">210 ETH</div>
           <div className="mt-2 text-green-500 text-sm font-medium">+5% from last week</div>
        </Card>
        <Card className="p-6">
           <h4 className="text-text-muted text-sm font-medium uppercase tracking-wider mb-2">Active Wallets</h4>
           <div className="text-4xl font-heading font-bold">1,834</div>
           <div className="mt-2 text-red-500 text-sm font-medium">-2% from last week</div>
        </Card>
      </div>

      <Card className="p-6">
         <h3 className="text-xl font-bold mb-6">Activity Overview</h3>
         <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={data}>
               <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
               <XAxis dataKey="name" stroke="#a0a0a0" />
               <YAxis stroke="#a0a0a0" />
               <Tooltip 
                 contentStyle={{ backgroundColor: '#0B0B0F', borderColor: '#ffffff20', color: '#fff' }}
                 itemStyle={{ color: '#D90429' }}
               />
               <Line type="monotone" dataKey="mints" stroke="#D90429" strokeWidth={3} dot={{ r: 4, fill: '#D90429' }} activeDot={{ r: 6 }} />
               <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" strokeWidth={2} />
             </LineChart>
           </ResponsiveContainer>
         </div>
      </Card>
    </div>
  );
};

export default Dashboard;

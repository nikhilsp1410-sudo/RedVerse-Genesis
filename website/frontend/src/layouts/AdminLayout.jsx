import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LayoutDashboard, Layers, Image as ImageIcon, Megaphone, Users, Settings, LineChart, LogOut, Shield } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  // Mock Auth state
  const user = { name: 'Kael Admin', role: 'Super Admin' };

  const handleLogout = () => {
    // Mock logout logic
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Collections', path: '/admin/collections', icon: Layers },
    { name: 'NFT Manager', path: '/admin/nfts', icon: ImageIcon },
    { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: LineChart },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden text-white font-sans">
      <Helmet>
        <title>RedVerse | Admin Control</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-white/5 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Shield className="text-primary mr-3" size={24} />
          <span className="font-heading font-bold text-xl tracking-tight">RedVerse Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive 
                    ? 'bg-primary text-white font-medium shadow-[0_0_15px_rgba(217,4,41,0.2)]' 
                    : 'text-text-muted hover:bg-surface-light hover:text-white'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold">{user.name}</span>
              <span className="text-xs text-primary">{user.role}</span>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-md hover:bg-surface-light text-text-muted hover:text-white transition-colors" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
         <header className="h-16 bg-surface/50 backdrop-blur border-b border-white/5 flex items-center justify-between px-8 md:hidden">
            <span className="font-heading font-bold text-xl">Admin</span>
            {/* Mobile menu toggle would go here */}
         </header>
         
         <div className="flex-1 overflow-y-auto p-8">
            <Outlet />
         </div>
      </main>
    </div>
  );
};

export default AdminLayout;

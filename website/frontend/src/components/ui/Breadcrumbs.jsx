import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ title }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-muted mb-8" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-primary transition-colors flex items-center">
        <Home size={16} className="mr-1" />
        Home
      </Link>
      
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        
        // Capitalize and format the text
        const displayValue = title && isLast ? title : value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <div key={to} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-white/20" />
            {isLast ? (
              <span className="text-white font-medium">{displayValue}</span>
            ) : (
              <Link to={to} className="hover:text-primary transition-colors">
                {displayValue}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

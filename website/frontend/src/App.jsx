import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import LoadingFallback from './components/ui/LoadingFallback';
import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/ui/CustomCursor';
import PageTransition from './components/ui/PageTransition';
import LoadingScreen from './components/ui/LoadingScreen';
import { AudioProvider } from './context/AudioContext';

// Lazy loaded Public Pages
const Home = lazy(() => import('./pages/Home'));
const Collection = lazy(() => import('./pages/Collection'));
const Guardian = lazy(() => import('./pages/Guardian'));
const Lore = lazy(() => import('./pages/Lore'));
const About = lazy(() => import('./pages/About'));
const Mint = lazy(() => import('./pages/Mint'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy loaded Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminCollections = lazy(() => import('./pages/admin/Collections'));
const AdminNftManager = lazy(() => import('./pages/admin/NftManager'));
const AdminAnnouncements = lazy(() => import('./pages/admin/Announcements'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminAnalytics = lazy(() => import('./pages/admin/Analytics'));

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PageTransition><Home /></PageTransition>} />
          <Route path="collection" element={<PageTransition><Collection /></PageTransition>} />
          <Route path="guardian/:id" element={<PageTransition><Guardian /></PageTransition>} />
          <Route path="lore" element={<PageTransition><Lore /></PageTransition>} />
          <Route path="about" element={<PageTransition><About /></PageTransition>} />
          <Route path="mint" element={<PageTransition><Mint /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="collections" element={<PageTransition><AdminCollections /></PageTransition>} />
          <Route path="nfts" element={<PageTransition><AdminNftManager /></PageTransition>} />
          <Route path="announcements" element={<PageTransition><AdminAnnouncements /></PageTransition>} />
          <Route path="users" element={<PageTransition><AdminUsers /></PageTransition>} />
          <Route path="analytics" element={<PageTransition><AdminAnalytics /></PageTransition>} />
          <Route path="settings" element={<PageTransition><AdminSettings /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  return (
    <ErrorBoundary>
      <AudioProvider>
        <Router>
          <CustomCursor />
          {isInitialLoad && <LoadingScreen onComplete={() => setIsInitialLoad(false)} />}
          
          <div className={isInitialLoad ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 transition-opacity duration-1000'}>
            <Suspense fallback={<LoadingFallback />}>
              <AnimatedRoutes />
            </Suspense>
          </div>
        </Router>
      </AudioProvider>
    </ErrorBoundary>
  );
}

export default App;

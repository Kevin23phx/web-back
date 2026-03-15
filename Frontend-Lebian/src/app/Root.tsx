import { Outlet, useLocation } from 'react-router';
import { Navbar } from './components/Navbar';
import { Toaster } from './components/ui/sonner';

export const Root = () => {
  const location = useLocation();
  
  // Pages sans navbar
  const hideNavbarPaths = ['/auth/login', '/auth/register'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}
      <Outlet />
      <Toaster />
    </div>
  );
};

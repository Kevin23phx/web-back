import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { NewReport } from './pages/NewReport';
import { ReportDetail } from './pages/ReportDetail';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminReports } from './pages/AdminReports';
import { AdminUsers } from './pages/AdminUsers';
import { AdminTeams } from './pages/AdminTeams';
import { TeamDashboard } from './pages/TeamDashboard';
import { NotFound } from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'auth/login',
        element: <Login />,
      },
      {
        path: 'auth/register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reports/new',
        element: (
          <ProtectedRoute>
            <NewReport />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reports/:id',
        element: (
          <ProtectedRoute>
            <ReportDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/reports',
        element: (
          <ProtectedRoute requireAdmin>
            <AdminReports />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <ProtectedRoute requireAdmin>
            <AdminUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/teams',
        element: (
          <ProtectedRoute requireAdmin>
            <AdminTeams />
          </ProtectedRoute>
        ),
      },
      /* TeamDashboard removed and unified into Dashboard.tsx */
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
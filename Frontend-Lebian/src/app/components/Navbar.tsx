import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { 
  MapPin, 
  LayoutDashboard, 
  LogOut, 
  Menu,
  Users,
  FileText,
  Plus,
  UserCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

export const Navbar = () => {
  const { user, logout, isAdmin, isTeam } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="hidden sm:block text-xl font-bold text-gray-900">
              EcoSignal
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isActive('/dashboard')
                      ? 'text-green-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Tableau de bord
                </Link>

                <Link
                  to="/reports/new"
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isActive('/reports/new')
                      ? 'text-green-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  Nouveau signalement
                </Link>

                {isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        isActive('/admin/dashboard')
                          ? 'text-green-600 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Admin
                    </Link>

                    <Link
                      to="/admin/reports"
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        isActive('/admin/reports')
                          ? 'text-green-600 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      Signalements
                    </Link>

                    <Link
                      to="/admin/users"
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        isActive('/admin/users')
                          ? 'text-green-600 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Users className="h-4 w-4" />
                      Utilisateurs
                    </Link>

                    <Link
                      to="/admin/teams"
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        isActive('/admin/teams')
                          ? 'text-green-600 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Users className="h-4 w-4" />
                      Équipes
                    </Link>
                  </>
                )}

              </>
            )}


          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-600 text-white text-sm">
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm">
                      {user.firstName} {user.lastName}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    {isAdmin && (
                      <p className="text-xs text-green-600 font-medium mt-1">Administrateur</p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  
                  {/* Profile Link */}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      Mon profil
                    </Link>
                  </DropdownMenuItem>
                  
                  {/* Navigation Mobile */}
                  <div className="md:hidden">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Tableau de bord
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/reports/new" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nouveau signalement
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/dashboard" className="flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/reports" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Tous les signalements
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/users" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Utilisateurs
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/teams" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Équipes
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                  </div>
                  
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth/login">Connexion</Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link to="/auth/register">Inscription</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
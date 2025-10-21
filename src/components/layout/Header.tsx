'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { formatRole } from '@/utils';
import { 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Calendar,
  Users,
  Shield,
  Home,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  title?: string;
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export default function Header({ title = "Lunna Platform", onMenuToggle, showMenuButton = true }: HeaderProps) {
  const { user, logout } = useAuth();
  const { isAdmin, isTherapist, isUser } = usePermissions();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  if (!user) return null;

  const getNavigationItems = () => {
    const items = [
      { label: 'Dashboard', href: '/dashboard', icon: Home, show: true },
    ];

    if (isAdmin()) {
      items.push(
        { label: 'Usuarios', href: '/admin/users', icon: Users, show: true },
        { label: 'Sistema', href: '/admin/system', icon: Settings, show: true }
      );
    }

    if (isTherapist() || isAdmin()) {
      items.push(
        { label: 'Sesiones', href: '/sessions', icon: Calendar, show: true },
        { label: 'Clientes', href: '/clients', icon: Users, show: true }
      );
    }

    if (isUser()) {
      items.push(
        { label: 'Mis Sesiones', href: '/my-sessions', icon: Calendar, show: true }
      );
    }

    return items.filter(item => item.show);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showMenuButton && (
              <button
                onClick={toggleMobileNav}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Toggle navigation"
              >
                {isMobileNavOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            )}
            
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900 flex items-center">
                  <span className="text-2xl mr-2">🌙</span>
                  <span className="hidden sm:block">{title}</span>
                </h1>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                isAdmin() ? 'bg-red-100 text-red-800' :
                isTherapist() ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {formatRole(user.role)}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="User menu"
              >
                <div className="flex items-center space-x-2">
                  {user.image ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.image}
                      alt={user.name}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 max-w-[120px] truncate">
                      {user.email}
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} />
                </div>
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100 md:hidden">
                        <div className="font-medium text-gray-700">{user.name}</div>
                        <div className="text-xs truncate">{user.email}</div>
                      </div>
                      
                      <a
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="h-4 w-4 mr-3" />
                        Mi Perfil
                      </a>
                      
                      <a
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Configuración
                      </a>
                      
                      {isAdmin() && (
                        <a
                          href="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Shield className="h-4 w-4 mr-3" />
                          Administración
                        </a>
                      )}
                      
                      <div className="border-t border-gray-100 my-1" />
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {isMobileNavOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { formatRole } from '@/utils';
import { 
  Home,
  Calendar,
  Users,
  Settings,
  Shield,
  BarChart3,
  FileText,
  Clock,
  Heart,
  MessageCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: any;
  badge?: string;
  children?: NavigationItem[];
}

export default function Sidebar({ isCollapsed = false, onToggle, className = '' }: SidebarProps) {
  const { user, logout } = useAuth();
  const { isAdmin, isTherapist, isUser } = usePermissions();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  if (!user) return null;

  const getNavigationItems = (): NavigationItem[] => {
    const items: NavigationItem[] = [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: Home
      }
    ];

    if (isAdmin()) {
      items.push(
        {
          label: 'Administración',
          href: '/admin',
          icon: Shield,
          children: [
            { label: 'Usuarios', href: '/admin/users', icon: Users },
            { label: 'Terapeutas', href: '/admin/therapists', icon: Heart },
            { label: 'Reportes', href: '/admin/reports', icon: BarChart3 },
            { label: 'Sistema', href: '/admin/system', icon: Settings }
          ]
        },
        {
          label: 'Sesiones',
          href: '/sessions',
          icon: Calendar,
          badge: '12',
          children: [
            { label: 'Todas las Sesiones', href: '/sessions/all', icon: Calendar },
            { label: 'Programar', href: '/sessions/schedule', icon: Clock },
            { label: 'Historial', href: '/sessions/history', icon: FileText }
          ]
        }
      );
    }

    if (isTherapist()) {
      items.push(
        {
          label: 'Mis Sesiones',
          href: '/therapist/sessions',
          icon: Calendar,
          badge: '5',
          children: [
            { label: 'Hoy', href: '/therapist/sessions/today', icon: Clock },
            { label: 'Esta Semana', href: '/therapist/sessions/week', icon: Calendar },
            { label: 'Historial', href: '/therapist/sessions/history', icon: FileText }
          ]
        },
        {
          label: 'Mis Pacientes',
          href: '/therapist/patients',
          icon: Users,
          children: [
            { label: 'Lista de Pacientes', href: '/therapist/patients/list', icon: Users },
            { label: 'Notas Clínicas', href: '/therapist/patients/notes', icon: FileText }
          ]
        },
        {
          label: 'Disponibilidad',
          href: '/therapist/availability',
          icon: Clock
        }
      );
    }

    if (isUser()) {
      items.push(
        {
          label: 'Mis Sesiones',
          href: '/my-sessions',
          icon: Calendar,
          badge: '2',
          children: [
            { label: 'Próximas', href: '/my-sessions/upcoming', icon: Clock },
            { label: 'Historial', href: '/my-sessions/history', icon: FileText }
          ]
        },
        {
          label: 'Agendar Sesión',
          href: '/book-session',
          icon: Heart
        },
        {
          label: 'Mi Progreso',
          href: '/progress',
          icon: BarChart3
        }
      );
    }

    items.push(
      {
        label: 'Mensajes',
        href: '/messages',
        icon: MessageCircle,
        badge: '3'
      },
      {
        label: 'Notificaciones',
        href: '/notifications',
        icon: Bell
      },
      {
        label: 'Configuración',
        href: '/settings',
        icon: Settings
      }
    );

    return items;
  };

  const toggleExpanded = (itemLabel: string) => {
    setExpandedItems(prev => 
      prev.includes(itemLabel)
        ? prev.filter(item => item !== itemLabel)
        : [...prev, itemLabel]
    );
  };

  const isExpanded = (itemLabel: string) => {
    return expandedItems.includes(itemLabel);
  };

  const navigationItems = getNavigationItems();

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const IconComponent = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isItemExpanded = isExpanded(item.label);
    const paddingLeft = level === 0 ? (isCollapsed ? 'pl-3' : 'pl-4') : 'pl-8';

    return (
      <div key={item.href}>
        {/* Main item */}
        <div className="relative">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.label)}
              className={`w-full flex items-center justify-between ${paddingLeft} pr-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group rounded-lg mx-2`}
            >
              <div className="flex items-center space-x-3">
                <IconComponent className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </div>
              {!isCollapsed && hasChildren && (
                <ChevronRight className={`h-4 w-4 transition-transform ${
                  isItemExpanded ? 'rotate-90' : ''
                }`} />
              )}
            </button>
          ) : (
            <a
              href={item.href}
              className={`flex items-center ${paddingLeft} pr-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group rounded-lg mx-2`}
            >
              <IconComponent className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          )}
        </div>

        {hasChildren && isItemExpanded && !isCollapsed && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children!.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            {user.image ? (
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user.image}
                alt={user.name}
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-gray-900 truncate max-w-[140px]">
                {user.name}
              </div>
              <div className={`text-xs rounded-full px-2 py-1 mt-1 ${
                isAdmin() ? 'bg-red-100 text-red-800' :
                isTherapist() ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {formatRole(user.role)}
              </div>
            </div>
          </div>
        )}
        
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {navigationItems.map(item => renderNavigationItem(item))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={() => logout()}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-3' : 'px-4'} py-3 text-red-700 hover:bg-red-50 transition-colors rounded-lg`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3 font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { 
  Users, 
  Calendar, 
  TrendingUp,
  Shield,
  UserCheck,
  UserPlus,
  Activity,
  ArrowRight,
  BarChart3,
  Settings,
  Database,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AdminStats {
  totalUsers: number;
  totalTherapists: number;
  totalPatients: number;
  totalSessions: number;
  activeSessions: number;
  completedSessions: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTherapists: 0,
    totalPatients: 0,
    totalSessions: 0,
    activeSessions: 0,
    completedSessions: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/dashboard');
      setStats(response.data.stats || {
        totalUsers: 0,
        totalTherapists: 0,
        totalPatients: 0,
        totalSessions: 0,
        activeSessions: 0,
        completedSessions: 0
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Panel de Administración
            </h1>
            <p className="text-indigo-100">
              Hola, {user?.name} - Gestiona toda la plataforma desde aquí
            </p>
          </div>
          <Shield className="h-16 w-16 text-indigo-200 opacity-50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                {isLoading ? '...' : stats.totalUsers}
              </p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Usuarios</h3>
          <p className="text-sm text-gray-600">Total de usuarios en la plataforma</p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Terapeutas:</span>
              <span className="font-semibold text-blue-600">{stats.totalTherapists}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Pacientes:</span>
              <span className="font-semibold text-green-600">{stats.totalPatients}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                {isLoading ? '...' : stats.totalSessions}
              </p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Sesiones</h3>
          <p className="text-sm text-gray-600">Total de sesiones en el sistema</p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Activas:</span>
              <span className="font-semibold text-orange-600">{stats.activeSessions}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Completadas:</span>
              <span className="font-semibold text-green-600">{stats.completedSessions}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalSessions > 0 
                  ? ((stats.completedSessions / stats.totalSessions) * 100).toFixed(0) 
                  : 0}%
              </p>
              <p className="text-sm text-gray-500">Tasa</p>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Rendimiento</h3>
          <p className="text-sm text-gray-600">Tasa de completación de sesiones</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${stats.totalSessions > 0 ? (stats.completedSessions / stats.totalSessions) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => router.push('/admin/users')}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="h-10 w-10 text-blue-600" />
            <ArrowRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Gestionar Usuarios
          </h3>
          <p className="text-gray-600 text-sm">
            Ver y administrar todos los usuarios
          </p>
        </button>

        <button
          onClick={() => router.push('/admin/sessions')}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-10 w-10 text-green-600" />
            <ArrowRight className="h-5 w-5 text-green-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Sesiones
          </h3>
          <p className="text-gray-600 text-sm">
            Monitorear todas las sesiones
          </p>
        </button>

        <button
          onClick={() => router.push('/admin/statistics')}
          className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="h-10 w-10 text-purple-600" />
            <ArrowRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Estadísticas
          </h3>
          <p className="text-gray-600 text-sm">
            Ver reportes y análisis
          </p>
        </button>

        <button
          onClick={() => router.push('/admin/settings')}
          className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <Settings className="h-10 w-10 text-orange-600" />
            <ArrowRight className="h-5 w-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Configuración
          </h3>
          <p className="text-gray-600 text-sm">
            Ajustes del sistema
          </p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Database className="h-5 w-5 mr-2 text-indigo-600" />
              Estado del Sistema
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Operativo
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Base de Datos</span>
              </div>
              <span className="text-sm font-medium text-green-600">Conectado</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">API</span>
              </div>
              <span className="text-sm font-medium text-green-600">Activo</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">AWS Chime</span>
              </div>
              <span className="text-sm font-medium text-green-600">Disponible</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">AWS S3</span>
              </div>
              <span className="text-sm font-medium text-green-600">Operativo</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Actividad Reciente
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3 pb-3 border-b border-gray-100">
              <UserPlus className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">Nuevo usuario registrado</p>
                <p className="text-xs text-gray-500">Hace 5 minutos</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 pb-3 border-b border-gray-100">
              <Calendar className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">Sesión completada</p>
                <p className="text-xs text-gray-500">Hace 12 minutos</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 pb-3 border-b border-gray-100">
              <UserCheck className="h-5 w-5 text-purple-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">Nuevo terapeuta aprobado</p>
                <p className="text-xs text-gray-500">Hace 1 hora</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Settings className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">Configuración actualizada</p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Herramientas de Administración
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" onClick={() => router.push('/admin/users')}>
            <Users className="h-4 w-4 mr-2" />
            Usuarios
          </Button>
          <Button variant="outline" onClick={() => router.push('/admin/sessions')}>
            <Calendar className="h-4 w-4 mr-2" />
            Sesiones
          </Button>
          <Button variant="outline" onClick={() => router.push('/admin/reports')}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Reportes
          </Button>
          <Button variant="outline" onClick={() => router.push('/profile')}>
            <Settings className="h-4 w-4 mr-2" />
            Mi Perfil
          </Button>
        </div>
      </div>
    </div>
  );
}

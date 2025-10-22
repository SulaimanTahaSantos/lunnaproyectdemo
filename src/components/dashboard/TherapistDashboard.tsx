'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { Session } from '@/types';
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock3,
  UserCheck,
  ArrowRight,
  Stethoscope,
  CalendarCheck,
  BarChart3,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function TherapistDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    today: 0,
    upcoming: 0,
    completed: 0,
    total: 0
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/me/sessions');
      const therapistSessions = response.data.sessions || [];
      
      setSessions(therapistSessions);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const todaySessions = therapistSessions.filter((s: Session) => {
        const sessionDate = new Date(s.date);
        return sessionDate >= today && sessionDate < tomorrow;
      }).length;
      
      const upcoming = therapistSessions.filter((s: Session) => 
        s.status === 'PENDING' || s.status === 'CONFIRMED'
      ).length;
      
      const completed = therapistSessions.filter((s: Session) => 
        s.status === 'COMPLETED'
      ).length;
      
      setStats({
        today: todaySessions,
        upcoming,
        completed,
        total: therapistSessions.length
      });
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTodaySessions = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return sessions
      .filter(s => {
        const sessionDate = new Date(s.date);
        return sessionDate >= today && sessionDate < tomorrow;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const todaySessions = getTodaySessions();

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
      CANCELLED: 'bg-red-100 text-red-800',
      IN_PROGRESS: 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmada',
      COMPLETED: 'Completada',
      CANCELLED: 'Cancelada',
      IN_PROGRESS: 'En Progreso'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              ¡Hola, Dr. {user?.name}! 
            </h1>
            <p className="text-green-100">
              Panel de gestión de terapias y pacientes
            </p>
          </div>
          <Stethoscope className="h-16 w-16 text-green-200 opacity-50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.today}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Hoy</h3>
          <p className="text-xs text-gray-500 mt-1">Sesiones del día</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock3 className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.upcoming}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Próximas</h3>
          <p className="text-xs text-gray-500 mt-1">Sesiones pendientes</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.completed}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Completadas</h3>
          <p className="text-xs text-gray-500 mt-1">Sesiones finalizadas</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total</h3>
          <p className="text-xs text-gray-500 mt-1">Todas las sesiones</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border-2 border-green-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <CalendarCheck className="h-5 w-5 mr-2 text-green-600" />
            Sesiones de Hoy
          </h2>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>

        {todaySessions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No tienes sesiones programadas para hoy</p>
            <p className="text-sm text-gray-500 mt-1">¡Disfruta tu día libre! 🎉</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={session.user?.image || '/api/placeholder/48/48'}
                      alt={session.user?.name || 'Paciente'}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{session.user?.name || 'Paciente'}</p>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(session.date).toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      <span>{session.user?.email || 'Email no disponible'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {getStatusText(session.status)}
                  </span>
                  {session.status === 'CONFIRMED' && (
                    <Button 
                      size="sm"
                      onClick={() => window.open(session.chimeLink, '_blank')}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Iniciar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => router.push('/sessions')}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <Calendar className="h-10 w-10 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mis Sesiones
          </h3>
          <p className="text-gray-600 text-sm">
            Gestiona todas tus sesiones programadas
          </p>
        </button>

        <button
          onClick={() => router.push('/therapists/availability')}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <Clock3 className="h-10 w-10 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mi Disponibilidad
          </h3>
          <p className="text-gray-600 text-sm">
            Configura tu horario de atención
          </p>
        </button>

        <button
          onClick={() => router.push('/profile')}
          className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <UserCheck className="h-10 w-10 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mi Perfil
          </h3>
          <p className="text-gray-600 text-sm">
            Actualiza tu información profesional
          </p>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Sesiones Recientes
          </h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push('/sessions')}
          >
            Ver todas
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Cargando sesiones...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={session.user?.image || '/api/placeholder/40/40'}
                      alt={session.user?.name || 'Paciente'}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{session.user?.name || 'Paciente'}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(session.date).toLocaleDateString('es-ES')} - {' '}
                      {new Date(session.date).toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {getStatusText(session.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
  AlertCircle,
  CalendarClock,
  ArrowRight,
  Sparkles,
  Heart,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function PatientDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
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
      const userSessions = response.data.sessions || [];
      
      setSessions(userSessions);
      
      const upcoming = userSessions.filter((s: Session) => 
        s.status === 'PENDING' || s.status === 'CONFIRMED'
      ).length;
      
      const completed = userSessions.filter((s: Session) => 
        s.status === 'COMPLETED'
      ).length;
      
      setStats({
        upcoming,
        completed,
        total: userSessions.length
      });
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNextSession = () => {
    return sessions
      .filter(s => s.status === 'CONFIRMED' || s.status === 'PENDING')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  };

  const nextSession = getNextSession();

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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              ¡Hola, {user?.name}! 
            </h1>
            <p className="text-blue-100">
              Bienvenido a tu espacio de bienestar mental
            </p>
          </div>
          <Sparkles className="h-16 w-16 text-blue-200 opacity-50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CalendarClock className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.upcoming}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Próximas Sesiones</h3>
          <p className="text-xs text-gray-500 mt-1">Sesiones programadas</p>
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
          <p className="text-xs text-gray-500 mt-1">Todas tus sesiones</p>
        </div>
      </div>

      {nextSession ? (
        <div className="bg-white rounded-lg shadow-md border-2 border-blue-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Próxima Sesión
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(nextSession.status)}`}>
              {getStatusText(nextSession.status)}
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={nextSession.therapist?.image || '/api/placeholder/64/64'}
                    alt={nextSession.therapist?.name || 'Terapeuta'}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Terapeuta</p>
                  <p className="font-semibold text-gray-900">{nextSession.therapist?.name || 'Terapeuta'}</p>
                  <p className="text-xs text-gray-500">{nextSession.therapist?.email || 'Email no disponible'}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  {new Date(nextSession.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {new Date(nextSession.date).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <Button 
                onClick={() => window.open(nextSession.chimeLink, '_blank')}
                className="w-full mb-3"
                disabled={nextSession.status !== 'CONFIRMED'}
              >
                <Video className="h-4 w-4 mr-2" />
                Unirse a la Sesión
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/sessions')}
                className="w-full"
              >
                Ver Detalles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No tienes sesiones programadas
          </h3>
          <p className="text-gray-600 mb-4">
            ¡Agenda tu primera sesión con un terapeuta!
          </p>
          <Button onClick={() => router.push('/therapists')}>
            <Users className="h-4 w-4 mr-2" />
            Buscar Terapeutas
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => router.push('/therapists')}
          className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <Users className="h-10 w-10 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Encuentra tu Terapeuta
          </h3>
          <p className="text-gray-600 text-sm">
            Explora nuestro directorio de profesionales
          </p>
        </button>

        <button
          onClick={() => router.push('/sessions')}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <Calendar className="h-10 w-10 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mis Sesiones
          </h3>
          <p className="text-gray-600 text-sm">
            Gestiona tus citas programadas
          </p>
        </button>

        <button
          onClick={() => router.push('/profile')}
          className="bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
        >
          <Heart className="h-10 w-10 text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mi Perfil
          </h3>
          <p className="text-gray-600 text-sm">
            Actualiza tu información personal
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Cargando sesiones...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No hay sesiones registradas</p>
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
                      src={session.therapist?.image || '/api/placeholder/40/40'}
                      alt={session.therapist?.name || 'Terapeuta'}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{session.therapist?.name || 'Terapeuta'}</p>
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
                  {session.status === 'CONFIRMED' && (
                    <Button 
                      size="sm"
                      onClick={() => window.open(session.chimeLink, '_blank')}
                    >
                      <Video className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

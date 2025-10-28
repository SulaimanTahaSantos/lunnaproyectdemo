'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import api from '@/services/api';
import { Session, SessionStatus } from '@/types';
import { 
  Calendar, 
  Clock, 
  Video, 
  ArrowLeft,
  User,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import PrivateRoute from '@/components/auth/PrivateRoute';

export default function SessionDetailPage() {
  return (
    <PrivateRoute>
      <MainLayout>
        <SessionDetailContent />
      </MainLayout>
    </PrivateRoute>
  );
}

function SessionDetailContent() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;
  
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetail();
    }
  }, [sessionId]);

  const fetchSessionDetail = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/sessions/${sessionId}`);
      setSession(response.data.session);
    } catch (error) {
      console.error('Error fetching session:', error);
      router.push('/sessions');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSessionStatus = async (newStatus: SessionStatus) => {
    if (!session) return;

    try {
      setIsUpdating(true);
      await api.put(`/sessions/${session.id}/status`, { status: newStatus });
      setSession({ ...session, status: newStatus });
    } catch (error) {
      console.error('Error updating session status:', error);
      alert('Error al actualizar el estado de la sesión');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: SessionStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'IN_PROGRESS':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: SessionStatus) => {
    switch (status) {
      case 'PENDING':
        return 'Pendiente';
      case 'CONFIRMED':
        return 'Confirmada';
      case 'IN_PROGRESS':
        return 'En Progreso';
      case 'COMPLETED':
        return 'Completada';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Sesión no encontrada
          </h3>
          <Button onClick={() => router.push('/sessions')}>
            Volver a sesiones
          </Button>
        </div>
      </div>
    );
  }

  const otherPerson = user?.role === 'THERAPIST' ? session.user : session.therapist;
  const isTherapist = user?.role === 'THERAPIST';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push('/sessions')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a sesiones
        </Button>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Detalles de la Sesión
          </h1>
          <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(session.status)}`}>
            {getStatusText(session.status)}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {isTherapist ? 'Información del Paciente' : 'Información del Terapeuta'}
        </h2>
        <div className="flex items-center space-x-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={otherPerson?.image || '/api/placeholder/80/80'}
              alt={otherPerson?.name || 'Usuario'}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {otherPerson?.name || 'Usuario'}
            </h3>
            <div className="space-y-1">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{otherPerson?.email || 'Email no disponible'}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm">{isTherapist ? 'Paciente' : 'Terapeuta'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Información de la Sesión
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center text-gray-600 mb-3">
              <Calendar className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="font-medium text-gray-900">
                  {new Date(session.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center text-gray-600 mb-3">
              <Clock className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Hora</p>
                <p className="font-medium text-gray-900">
                  {new Date(session.date).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">ID de Sesión</p>
          <p className="text-sm font-mono text-gray-700">{session.id}</p>
        </div>
      </div>

      {/* Acciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones
        </h2>

        {session.status === SessionStatus.CONFIRMED && (
          <div className="mb-4">
            <Button
              onClick={() => window.open(session.chimeLink, '_blank')}
              className="w-full sm:w-auto"
              size="lg"
            >
              <Video className="h-5 w-5 mr-2" />
              Unirse a la Sesión
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Haz clic para acceder a la videollamada
            </p>
          </div>
        )}

        {isTherapist && session.status !== SessionStatus.COMPLETED && session.status !== SessionStatus.CANCELLED && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Actualizar estado:</p>
            <div className="flex flex-wrap gap-2">
              {session.status === SessionStatus.PENDING && (
                <Button
                  variant="outline"
                  onClick={() => updateSessionStatus(SessionStatus.CONFIRMED)}
                  disabled={isUpdating}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar
                </Button>
              )}
              {session.status === SessionStatus.CONFIRMED && (
                <Button
                  variant="outline"
                  onClick={() => updateSessionStatus(SessionStatus.IN_PROGRESS)}
                  disabled={isUpdating}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Iniciar
                </Button>
              )}
              {session.status === SessionStatus.IN_PROGRESS && (
                <Button
                  variant="outline"
                  onClick={() => updateSessionStatus(SessionStatus.COMPLETED)}
                  disabled={isUpdating}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completar
                </Button>
              )}
              {(session.status === SessionStatus.PENDING || session.status === SessionStatus.CONFIRMED) && (
                <Button
                  variant="outline"
                  onClick={() => updateSessionStatus(SessionStatus.CANCELLED)}
                  disabled={isUpdating}
                  className="text-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <History className="h-5 w-5 mr-2" />
          Historial de Cambios
        </h2>
        <p className="text-gray-500 text-sm">
          El historial de cambios estará disponible próximamente
        </p>
      </div>
    </div>
  );
}

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
  History,
  Phone,
  MapPin,
  FileText,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  Info
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
  const [copiedLink, setCopiedLink] = useState(false);

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

  const copyLinkToClipboard = async () => {
    if (!session) return;
    
    try {
      await navigator.clipboard.writeText(session.chimeLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      alert('Error al copiar el link');
    }
  };

  const getSessionDuration = () => {
    // Duración típica de sesión: 50 minutos
    return '50 minutos';
  };

  const getTimeUntilSession = () => {
    const sessionDate = new Date(session!.date);
    const now = new Date();
    const diffMs = sessionDate.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMs < 0) {
      return 'Sesión pasada';
    } else if (diffDays > 0) {
      return `En ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `En ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    } else if (diffMins > 0) {
      return `En ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    } else {
      return '¡Ahora!';
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
  const isPatient = user?.role === 'USER';
  const canJoinSession = session.status === SessionStatus.CONFIRMED || session.status === SessionStatus.IN_PROGRESS;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push('/sessions')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a sesiones
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Detalles de la Sesión
            </h1>
            <p className="text-gray-600">
              {session && getTimeUntilSession()}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(session.status)} w-fit`}>
            {getStatusText(session.status)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {isTherapist ? 'Información del Paciente' : 'Información del Terapeuta'}
            </h2>
            <div className="flex items-start space-x-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={otherPerson?.image || '/api/placeholder/96/96'}
                  alt={otherPerson?.name || 'Usuario'}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {otherPerson?.name || 'Usuario'}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-gray-400" />
                    <span className="text-sm truncate">{otherPerson?.email || 'Email no disponible'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-3 flex-shrink-0 text-gray-400" />
                    <span className="text-sm">{isTherapist ? 'Paciente' : 'Terapeuta Profesional'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Información de la Sesión
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Fecha</p>
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
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Hora</p>
                  <p className="font-medium text-gray-900">
                    {new Date(session.date).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duración</p>
                  <p className="font-medium text-gray-900">{getSessionDuration()}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Modalidad</p>
                  <p className="font-medium text-gray-900">Videollamada</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-1">ID de Sesión</p>
              <p className="text-sm font-mono text-gray-700 break-all">{session.id}</p>
            </div>
          </div>

          {canJoinSession && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-600 rounded-lg">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Link de Videollamada
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Usa este link para unirte a la sesión cuando sea el momento
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => window.open(session.chimeLink, '_blank')}
                      size="lg"
                      className="flex-1 sm:flex-none"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Unirse Ahora
                    </Button>
                    <Button
                      variant="outline"
                      onClick={copyLinkToClipboard}
                      className="flex-1 sm:flex-none"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copiedLink ? '¡Copiado!' : 'Copiar Link'}
                    </Button>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border border-indigo-200">
                    <p className="text-xs text-gray-600 break-all font-mono">
                      {session.chimeLink}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isTherapist && session.status !== SessionStatus.COMPLETED && session.status !== SessionStatus.CANCELLED && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Gestionar Sesión
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Como terapeuta, puedes actualizar el estado de esta sesión
              </p>
              <div className="flex flex-wrap gap-3">
                {session.status === SessionStatus.PENDING && (
                  <Button
                    onClick={() => updateSessionStatus(SessionStatus.CONFIRMED)}
                    disabled={isUpdating}
                    className="flex-1 sm:flex-none"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirmar Sesión
                  </Button>
                )}
                {session.status === SessionStatus.CONFIRMED && (
                  <Button
                    onClick={() => updateSessionStatus(SessionStatus.IN_PROGRESS)}
                    disabled={isUpdating}
                    className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                )}
                {session.status === SessionStatus.IN_PROGRESS && (
                  <Button
                    onClick={() => updateSessionStatus(SessionStatus.COMPLETED)}
                    disabled={isUpdating}
                    className="flex-1 sm:flex-none bg-gray-600 hover:bg-gray-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marcar como Completada
                  </Button>
                )}
                {(session.status === SessionStatus.PENDING || session.status === SessionStatus.CONFIRMED) && (
                  <Button
                    variant="outline"
                    onClick={() => updateSessionStatus(SessionStatus.CANCELLED)}
                    disabled={isUpdating}
                    className="flex-1 sm:flex-none text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancelar Sesión
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Estado Actual</h3>
            <div className="space-y-4">
              <div>
                <div className={`px-4 py-3 rounded-lg border-2 ${getStatusColor(session.status)} text-center`}>
                  <p className="font-semibold">{getStatusText(session.status)}</p>
                </div>
              </div>
              {session.status === SessionStatus.PENDING && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">
                     Esperando confirmación del terapeuta
                  </p>
                </div>
              )}
              {session.status === SessionStatus.CONFIRMED && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800">
                     Sesión confirmada. Podrás unirte el día programado.
                  </p>
                </div>
              )}
              {session.status === SessionStatus.IN_PROGRESS && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-800">
                    Sesión en progreso. Únete ahora.
                  </p>
                </div>
              )}
              {session.status === SessionStatus.COMPLETED && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-800">
                    Sesión completada exitosamente
                  </p>
                </div>
              )}
              {session.status === SessionStatus.CANCELLED && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-800">
                    Esta sesión fue cancelada
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Información Útil</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <FileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p>Por favor, únete a la sesión 5 minutos antes del horario programado.</p>
              </div>
              <div className="flex items-start space-x-2">
                <Video className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p>Asegúrate de tener una buena conexión a internet y un espacio privado.</p>
              </div>
              <div className="flex items-start space-x-2">
                <LinkIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p>El link de videollamada es privado y solo para esta sesión.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <History className="h-4 w-4 mr-2" />
              Historial
            </h3>
            <p className="text-xs text-gray-500">
              El historial de cambios estará disponible próximamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

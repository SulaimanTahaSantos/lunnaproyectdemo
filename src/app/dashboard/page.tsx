'use client';

import { useAuth } from '@/contexts/AuthContext';
import { formatRole } from '@/utils';
import { User, Calendar, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import PrivateRoute from '@/components/auth/PrivateRoute';
import RoleBasedAccess from '@/components/auth/RoleBasedAccess';
import { Role } from '@/types';

function DashboardContent() {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  🌙 Lunna Platform
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {user.image ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.image}
                      alt={user.name}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="hidden md:block">
                  <div className="text-base font-medium text-gray-700">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {formatRole(user.role)}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout('manual')}
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    ¡Bienvenido, {user.name}!
                  </h2>
                  <p className="text-sm text-gray-500">
                    Estás conectado como {formatRole(user.role)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Mis Sesiones
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Próximamente
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                    Ver todas las sesiones →
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Mi Perfil
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {user.email}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                    Editar perfil →
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Configuración
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Personalizar
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                    Ver configuración →
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Administración - Solo para ADMIN */}
          <RoleBasedAccess allowedRoles={[Role.ADMIN]}>
            <div className="mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-2">
                  🔧 Panel de Administración
                </h3>
                <p className="text-blue-700 mb-3">
                  Como administrador, tienes acceso a funciones especiales.
                </p>
                <div className="flex space-x-3">
                  <Button size="sm">Gestionar Usuarios</Button>
                  <Button variant="outline" size="sm">Ver Estadísticas</Button>
                </div>
              </div>
            </div>
          </RoleBasedAccess>

          {/* Panel de Terapeuta - Para THERAPIST y ADMIN */}
          <RoleBasedAccess allowedRoles={[Role.THERAPIST, Role.ADMIN]}>
            <div className="mt-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-green-900 mb-2">
                  🩺 Panel de Terapeuta
                </h3>
                <p className="text-green-700 mb-3">
                  Gestiona tus sesiones y pacientes desde aquí.
                </p>
                <div className="flex space-x-3">
                  <Button size="sm">Ver Mis Sesiones</Button>
                  <Button variant="outline" size="sm">Configurar Horarios</Button>
                </div>
              </div>
            </div>
          </RoleBasedAccess>

          {/* Panel de Usuario - Solo para USER */}
          <RoleBasedAccess allowedRoles={[Role.USER]}>
            <div className="mt-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-purple-900 mb-2">
                  👤 Mi Espacio Personal
                </h3>
                <p className="text-purple-700 mb-3">
                  Encuentra terapeutas y programa tus sesiones.
                </p>
                <div className="flex space-x-3">
                  <Button size="sm">Buscar Terapeutas</Button>
                  <Button variant="outline" size="sm">Mis Citas</Button>
                </div>
              </div>
            </div>
          </RoleBasedAccess>

          {/* Ejemplo de contenido con fallback */}
          <RoleBasedAccess 
            allowedRoles={[Role.THERAPIST]} 
            fallback={
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-gray-600">
                  ℹ️ Algunas funciones están disponibles solo para terapeutas
                </p>
              </div>
            }
          >
            <div className="mt-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-900 mb-2">
                  📊 Herramientas Avanzadas de Terapia
                </h3>
                <p className="text-yellow-700 mb-3">
                  Accede a reportes detallados y herramientas especializadas.
                </p>
                <Button size="sm">Ver Reportes</Button>
              </div>
            </div>
          </RoleBasedAccess>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
  );
}
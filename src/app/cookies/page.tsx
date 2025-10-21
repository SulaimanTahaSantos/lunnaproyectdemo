'use client';

import MainLayout from '@/components/layout/MainLayout';
import { 
  Cookie,
  Settings,
  Shield,
  BarChart3,
  Users,
  Clock,
  Eye,
  CheckCircle,
  X,
  Info,
  ToggleLeft,
  ToggleRight,
  Download,
  Trash2
} from 'lucide-react';
import { useState } from 'react';

export default function CookiesPage() {
  const lastUpdated = "10 de octubre de 2025";
  
  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // Always required
    functional: true,
    analytics: false,
    marketing: false
  });

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Cookies Esenciales',
      icon: Shield,
      color: 'green',
      required: true,
      description: 'Estas cookies son necesarias para que la plataforma funcione correctamente y no se pueden desactivar.',
      purpose: 'Autenticación, seguridad, y funcionalidad básica del sitio web',
      duration: 'Sesión hasta 1 año',
      examples: [
        'Mantener su sesión iniciada',
        'Recordar configuración de seguridad',
        'Procesar pagos de forma segura',
        'Funcionalidad básica de la plataforma'
      ]
    },
    {
      id: 'functional',
      name: 'Cookies Funcionales',
      icon: Settings,
      color: 'blue',
      required: false,
      description: 'Estas cookies mejoran la funcionalidad y personalización de la plataforma.',
      purpose: 'Recordar preferencias y configuraciones del usuario',
      duration: '30 días hasta 1 año',
      examples: [
        'Idioma y zona horaria preferidos',
        'Configuración de notificaciones',
        'Tema visual (claro/oscuro)',
        'Preferencias de accesibilidad'
      ]
    },
    {
      id: 'analytics',
      name: 'Cookies Analíticas',
      icon: BarChart3,
      color: 'purple',
      required: false,
      description: 'Nos ayudan a entender cómo se utiliza la plataforma para poder mejorarla.',
      purpose: 'Análisis de uso y rendimiento de la plataforma',
      duration: '30 días hasta 2 años',
      examples: [
        'Páginas más visitadas',
        'Tiempo de permanencia en el sitio',
        'Rutas de navegación de usuarios',
        'Errores y problemas técnicos'
      ]
    },
    {
      id: 'marketing',
      name: 'Cookies de Marketing',
      icon: Users,
      color: 'orange',
      required: false,
      description: 'Se utilizan para mostrar contenido y anuncios relevantes basados en sus intereses.',
      purpose: 'Personalización de contenido y comunicaciones',
      duration: '30 días hasta 1 año',
      examples: [
        'Contenido personalizado en newsletters',
        'Recomendaciones de terapeutas',
        'Seguimiento de campañas promocionales',
        'Optimización de comunicaciones'
      ]
    }
  ];

  const thirdPartyCookies = [
    {
      provider: 'Google Analytics',
      purpose: 'Análisis de tráfico web',
      cookies: ['_ga', '_ga_*', '_gid'],
      privacy: 'https://policies.google.com/privacy',
      optOut: 'https://tools.google.com/dlpage/gaoptout'
    },
    {
      provider: 'Stripe',
      purpose: 'Procesamiento seguro de pagos',
      cookies: ['__stripe_mid', '__stripe_sid'],
      privacy: 'https://stripe.com/privacy',
      optOut: 'No aplicable (esencial para pagos)'
    },
    {
      provider: 'Hotjar',
      purpose: 'Análisis de experiencia de usuario',
      cookies: ['_hjid', '_hjAbsoluteSessionInProgress'],
      privacy: 'https://www.hotjar.com/legal/policies/privacy',
      optOut: 'https://www.hotjar.com/legal/compliance/opt-out'
    },
    {
      provider: 'Intercom',
      purpose: 'Chat de soporte al cliente',
      cookies: ['intercom-id-*', 'intercom-session-*'],
      privacy: 'https://www.intercom.com/legal/privacy',
      optOut: 'Configurable en settings'
    }
  ];

  const handleCookieToggle = (cookieType: string) => {
    if (cookieType === 'essential') return; 
    
    setCookieSettings(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType as keyof typeof prev]
    }));
  };

  const savePreferences = () => {
    alert('Preferencias de cookies guardadas correctamente');
  };

  const acceptAll = () => {
    setCookieSettings({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    });
  };

  const rejectAll = () => {
    setCookieSettings({
      essential: true, 
      functional: false,
      analytics: false,
      marketing: false
    });
  };

  return (
    <MainLayout title="Política de Cookies">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <Cookie className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Política de Cookies
          </h1>
          <p className="text-xl text-gray-600">
            Información sobre el uso de cookies en Lunna Platform
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-2 text-orange-800">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-semibold">Última actualización: {lastUpdated}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué son las Cookies?
          </h2>
          <p className="text-blue-800 mb-4">
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo 
            cuando visita un sitio web. Nos ayudan a hacer que su experiencia sea más 
            personalizada, segura y eficiente.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">¿Cómo las usamos?</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>✓ Mantener su sesión activa y segura</li>
                <li>✓ Recordar sus preferencias</li>
                <li>✓ Mejorar el rendimiento del sitio</li>
                <li>✓ Personalizar su experiencia</li>
              </ul>
            </div>
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Su control</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>✓ Puede configurar sus preferencias</li>
                <li>✓ Desactivar cookies no esenciales</li>
                <li>✓ Eliminar cookies existentes</li>
                <li>✓ Cambiar configuración en cualquier momento</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Settings className="h-6 w-6 mr-3 text-blue-600" />
            Centro de Preferencias de Cookies
          </h2>
          
          <div className="space-y-6">
            {cookieTypes.map((cookie) => {
              const isEnabled = cookieSettings[cookie.id as keyof typeof cookieSettings];
              const colorClasses = {
                green: 'border-green-200 bg-green-50',
                blue: 'border-blue-200 bg-blue-50',
                purple: 'border-purple-200 bg-purple-50',
                orange: 'border-orange-200 bg-orange-50'
              }[cookie.color];

              return (
                <div key={cookie.id} className={`border rounded-lg p-6 ${colorClasses}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        cookie.color === 'green' ? 'bg-green-100' :
                        cookie.color === 'blue' ? 'bg-blue-100' :
                        cookie.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        <cookie.icon className={`h-5 w-5 ${
                          cookie.color === 'green' ? 'text-green-600' :
                          cookie.color === 'blue' ? 'text-blue-600' :
                          cookie.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{cookie.name}</h3>
                          {cookie.required && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                              Requerido
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3">{cookie.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-900">Propósito:</span>
                            <span className="text-gray-700 ml-2">{cookie.purpose}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Duración:</span>
                            <span className="text-gray-700 ml-2">{cookie.duration}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Ejemplos de uso:</h4>
                          <ul className="grid md:grid-cols-2 gap-1 text-sm text-gray-700">
                            {cookie.examples.map((example, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleCookieToggle(cookie.id)}
                        disabled={cookie.required}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          cookie.required
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : isEnabled
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        }`}
                      >
                        {isEnabled ? (
                          <ToggleRight className="h-5 w-5" />
                        ) : (
                          <ToggleLeft className="h-5 w-5" />
                        )}
                        <span>{isEnabled ? 'Activado' : 'Desactivado'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
            <button 
              onClick={acceptAll}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Aceptar Todas
            </button>
            <button 
              onClick={rejectAll}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Rechazar Opcionales
            </button>
            <button 
              onClick={savePreferences}
              className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Guardar Preferencias
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Cookies de Terceros
          </h2>
          <p className="text-gray-600">
            También utilizamos servicios de terceros que pueden establecer sus propias cookies. 
            Aquí tienes información sobre estos proveedores:
          </p>
          
          <div className="grid gap-6">
            {thirdPartyCookies.map((provider, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{provider.provider}</h3>
                    <p className="text-gray-700 mb-3">{provider.purpose}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="font-semibold text-gray-900">Cookies:</span>
                        <div className="text-gray-700 ml-2">
                          {provider.cookies.join(', ')}
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Opt-out:</span>
                        <div className="text-gray-700 ml-2">{provider.optOut}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={provider.privacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-semibold flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Política de Privacidad
                  </a>
                  {provider.optOut !== 'No aplicable (esencial para pagos)' && provider.optOut !== 'Configurable en settings' && (
                    <a
                      href={provider.optOut}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 transition-colors text-sm font-semibold flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Darse de Baja
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            Controles del Navegador
          </h2>
          <p className="text-purple-800 mb-6">
            También puede gestionar las cookies directamente desde su navegador. 
            Aquí le explicamos cómo hacerlo en los navegadores más populares:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3">Navegadores de Escritorio</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                <li>• <strong>Firefox:</strong> Preferencias → Privacidad y seguridad</li>
                <li>• <strong>Safari:</strong> Preferencias → Privacidad</li>
                <li>• <strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
              </ul>
            </div>
            
            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3">Navegadores Móviles</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• <strong>Chrome Mobile:</strong> Menú → Configuración → Privacidad</li>
                <li>• <strong>Safari iOS:</strong> Ajustes → Safari → Privacidad</li>
                <li>• <strong>Firefox Mobile:</strong> Menú → Configuración → Privacidad</li>
                <li>• <strong>Samsung Internet:</strong> Menú → Configuración → Personal</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white border border-purple-200 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-purple-900 mb-2">⚠️ Importante:</h4>
            <p className="text-purple-800 text-sm">
              Desactivar todas las cookies puede afectar la funcionalidad de la plataforma. 
              Algunas características pueden no funcionar correctamente sin cookies esenciales.
            </p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Herramientas de Gestión
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white border border-green-200 rounded-lg p-6 text-center">
              <Download className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-green-900 mb-2">Exportar Configuración</h3>
              <p className="text-green-800 text-sm mb-4">
                Descarga tus preferencias de cookies actuales
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
                Descargar
              </button>
            </div>
            
            <div className="bg-white border border-green-200 rounded-lg p-6 text-center">
              <Trash2 className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-bold text-green-900 mb-2">Limpiar Cookies</h3>
              <p className="text-green-800 text-sm mb-4">
                Elimina todas las cookies no esenciales
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                Limpiar
              </button>
            </div>
            
            <div className="bg-white border border-green-200 rounded-lg p-6 text-center">
              <Settings className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-green-900 mb-2">Configuración Avanzada</h3>
              <p className="text-green-800 text-sm mb-4">
                Accede a opciones detalladas de privacidad
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                Configurar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-900 mb-6">
            Actualizaciones de la Política
          </h2>
          <p className="text-yellow-800 mb-4">
            Esta política de cookies se revisa regularmente y puede actualizarse. 
            Los cambios importantes serán comunicados mediante:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-yellow-800 text-sm">
              <li>• Notificación en el banner de cookies</li>
              <li>• Email a usuarios registrados</li>
              <li>• Aviso en el panel de usuario</li>
            </ul>
            <ul className="space-y-2 text-yellow-800 text-sm">
              <li>• Actualización automática de preferencias</li>
              <li>• Período de gracia para cambios</li>
              <li>• Historial de versiones disponible</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Preguntas sobre Cookies?
          </h2>
          <p className="text-gray-600 mb-6">
            Si tiene dudas sobre nuestra política de cookies o necesita ayuda 
            con la configuración, no dude en contactarnos.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <Info className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Centro de Ayuda</div>
              <div className="text-sm text-gray-600">Guías y tutoriales</div>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Soporte</div>
              <div className="text-sm text-gray-600">soporte@lunna.com</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
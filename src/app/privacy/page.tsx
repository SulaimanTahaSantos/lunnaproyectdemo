import MainLayout from '@/components/layout/MainLayout';
import { 
  Shield,
  Lock,
  Eye,
  Server,
  Users,
  Clock,
  Mail,
  FileText,
  CheckCircle,
  AlertCircle,
  Globe,
  Database,
  Key,
  Trash2,
  Scale
} from 'lucide-react';

export default function PrivacyPage() {
  const lastUpdated = "10 de octubre de 2025";
  
  const dataTypes = [
    {
      category: 'Información Personal',
      icon: Users,
      items: [
        'Nombre completo y fecha de nacimiento',
        'Dirección de email y número de teléfono', 
        'Información de facturación y pago',
        'Datos de ubicación (país/región)',
        'Preferencias de idioma y zona horaria'
      ]
    },
    {
      category: 'Información de Salud',
      icon: FileText,
      items: [
        'Historial médico y psicológico relevante',
        'Objetivos terapéuticos y preferencias',
        'Notas de sesiones (cuando sea aplicable)',
        'Evaluaciones y cuestionarios completados',
        'Medicación y tratamientos actuales'
      ]
    },
    {
      category: 'Datos Técnicos',
      icon: Server,
      items: [
        'Dirección IP y datos de geolocalización',
        'Información del dispositivo y navegador',
        'Cookies y tecnologías de seguimiento',
        'Registros de actividad en la plataforma',
        'Metadatos de comunicaciones'
      ]
    }
  ];

  const dataUses = [
    {
      purpose: 'Prestación de Servicios',
      description: 'Facilitar conexiones entre usuarios y terapeutas, gestionar citas y procesar pagos.',
      lawfulBasis: 'Ejecución de contrato',
      retention: '5 años después de la última actividad'
    },
    {
      purpose: 'Mejora de Servicios',
      description: 'Analizar patrones de uso para mejorar la plataforma y desarrollar nuevas funcionalidades.',
      lawfulBasis: 'Interés legítimo',
      retention: '2 años en forma agregada y anonimizada'
    },
    {
      purpose: 'Comunicación',
      description: 'Enviar notificaciones importantes, recordatorios de citas y actualizaciones de seguridad.',
      lawfulBasis: 'Interés legítimo / Consentimiento',
      retention: 'Hasta que retire el consentimiento'
    },
    {
      purpose: 'Cumplimiento Legal',
      description: 'Cumplir con obligaciones legales, incluidas auditorías y requerimientos judiciales.',
      lawfulBasis: 'Obligación legal',
      retention: 'Según requiera la legislación aplicable'
    }
  ];

  const userRights = [
    {
      right: 'Acceso',
      description: 'Solicitar una copia de todos los datos personales que tenemos sobre usted',
      icon: Eye
    },
    {
      right: 'Rectificación',
      description: 'Corregir datos personales inexactos o incompletos',
      icon: FileText
    },
    {
      right: 'Supresión',
      description: 'Solicitar la eliminación de sus datos personales ("derecho al olvido")',
      icon: Trash2
    },
    {
      right: 'Portabilidad',
      description: 'Recibir sus datos en un formato estructurado y legible por máquina',
      icon: Database
    },
    {
      right: 'Limitación',
      description: 'Restringir el procesamiento de sus datos en ciertas circunstancias',
      icon: Lock
    },
    {
      right: 'Oposición',
      description: 'Oponerse al procesamiento de sus datos para marketing directo',
      icon: Shield
    }
  ];

  const securityMeasures = [
    {
      measure: 'Encriptación de Datos',
      description: 'Todos los datos se encriptan en tránsito (TLS 1.3) y en reposo (AES-256)',
      icon: Key
    },
    {
      measure: 'Acceso Controlado',
      description: 'Autenticación multifactor y principio de menor privilegio para todos los accesos',
      icon: Lock
    },
    {
      measure: 'Auditorías Regulares',
      description: 'Evaluaciones de seguridad trimestrales por auditores externos certificados',
      icon: Shield
    },
    {
      measure: 'Monitoreo 24/7',
      description: 'Supervisión continua de la infraestructura para detectar amenazas',
      icon: Eye
    },
    {
      measure: 'Backup Seguro',
      description: 'Copias de seguridad encriptadas en múltiples ubicaciones geográficas',
      icon: Server
    },
    {
      measure: 'Formación del Personal',
      description: 'Capacitación regular en privacidad y seguridad para todo el equipo',
      icon: Users
    }
  ];

  return (
    <MainLayout title="Política de Privacidad">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Política de Privacidad
          </h1>
          <p className="text-xl text-gray-600">
            Cómo protegemos y utilizamos su información personal
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-2 text-green-800">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-semibold">Última actualización: {lastUpdated}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Nuestro Compromiso con su Privacidad
          </h2>
          <p className="text-blue-800 mb-4">
            En Lunna Platform, entendemos que la confianza es fundamental en los servicios de salud mental. 
            Esta Política de Privacidad explica cómo recopilamos, utilizamos, protegemos y compartimos 
            su información personal cuando utiliza nuestros servicios.
          </p>
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Principios Fundamentales:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>✓ Transparencia total sobre el uso de sus datos</li>
              <li>✓ Control completo sobre su información personal</li>
              <li>✓ Seguridad de nivel empresarial para proteger sus datos</li>
              <li>✓ Cumplimiento estricto con GDPR y normativas locales</li>
              <li>✓ Minimización de datos - solo recopilamos lo necesario</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            1. Información que Recopilamos
          </h2>
          
          {dataTypes.map((type, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <type.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{type.category}</h3>
                  <ul className="space-y-2">
                    {type.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            2. Cómo Utilizamos su Información
          </h2>
          
          <div className="grid gap-6">
            {dataUses.map((use, index) => (
              <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-900 mb-2">{use.purpose}</h3>
                <p className="text-purple-800 mb-4">{use.description}</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-purple-900">Base Legal:</span>
                    <span className="text-purple-700 ml-2">{use.lawfulBasis}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-900">Retención:</span>
                    <span className="text-purple-700 ml-2">{use.retention}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-900 mb-6">
            3. Cuándo Compartimos su Información
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-yellow-900 mb-2 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Con Terapeutas
              </h3>
              <p className="text-yellow-800 text-sm">
                Compartimos información relevante con su terapeuta asignado para facilitar 
                el tratamiento. Los terapeutas están sujetos al secreto profesional.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-yellow-900 mb-2 flex items-center">
                <Server className="h-5 w-5 mr-2" />
                Con Proveedores de Servicios
              </h3>
              <p className="text-yellow-800 text-sm">
                Trabajamos con proveedores certificados (procesadores de pago, hosting, etc.) 
                que han firmado acuerdos de procesamiento de datos y cumplen con GDPR.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-yellow-900 mb-2 flex items-center">
                <Scale className="h-5 w-5 mr-2" />
                Por Obligación Legal
              </h3>
              <p className="text-yellow-800 text-sm">
                Solo cuando sea requerido por ley, orden judicial o para proteger 
                la seguridad de usuarios en situaciones de riesgo inmediato.
              </p>
            </div>
          </div>
          
          <div className="bg-white border border-yellow-200 rounded-lg p-4 mt-6">
            <p className="text-yellow-900 font-semibold text-sm">
              NUNCA vendemos, alquilamos o comercializamos su información personal con terceros.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            4. Sus Derechos bajo GDPR
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {userRights.map((right, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <right.icon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">Derecho de {right.right}</h3>
                    <p className="text-green-800 text-sm">{right.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-3">¿Cómo Ejercer sus Derechos?</h3>
            <p className="text-gray-600 mb-4">
              Para ejercer cualquiera de estos derechos, contáctenos a través de:
            </p>
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-semibold">privacidad@lunna.com</div>
              </div>
              <div className="text-center">
                <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-semibold">Respuesta en 72 horas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            5. Medidas de Seguridad
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {securityMeasures.map((security, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <security.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{security.measure}</h3>
                    <p className="text-gray-700 text-sm">{security.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-3" />
            6. Transferencias Internacionales
          </h2>
          <div className="space-y-4 text-blue-800">
            <p>
              <strong>Ubicación de Datos:</strong> Todos los datos personales se almacenan 
              en servidores ubicados en la Unión Europea (Frankfurt, Alemania).
            </p>
            <p>
              <strong>Transferencias Limitadas:</strong> En casos excepcionales donde sea 
              necesario transferir datos fuera de la UE, utilizamos cláusulas contractuales 
              estándar aprobadas por la Comisión Europea.
            </p>
            <p>
              <strong>Proveedores Certificados:</strong> Todos nuestros proveedores de servicios 
              cumplen con certificaciones de seguridad internacionales (SOC 2, ISO 27001).
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            7. Retención de Datos
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Datos Activos</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Información de cuenta: Mientras mantenga su cuenta activa</li>
                <li>• Historial de sesiones: 5 años después de la última cita</li>
                <li>• Datos de facturación: 7 años por requisitos fiscales</li>
                <li>• Registros de soporte: 3 años después del último contacto</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Eliminación Automática</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Cookies de sesión: Al cerrar el navegador</li>
                <li>• Logs de acceso: 12 meses</li>
                <li>• Datos de marketing: 2 años sin actividad</li>
                <li>• Copias de seguridad: Eliminación según cronograma</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-orange-900 mb-6">
            8. Cookies y Tecnologías de Seguimiento
          </h2>
          <p className="text-orange-800 mb-4">
            Utilizamos diferentes tipos de cookies para mejorar su experiencia:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">Esenciales</h4>
              <p className="text-orange-700 text-sm">
                Necesarias para el funcionamiento básico de la plataforma
              </p>
            </div>
            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">Funcionales</h4>
              <p className="text-orange-700 text-sm">
                Recordar preferencias y configuraciones del usuario
              </p>
            </div>
            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">Analíticas</h4>
              <p className="text-orange-700 text-sm">
                Entender cómo se utiliza la plataforma (con consentimiento)
              </p>
            </div>
          </div>
          <p className="text-orange-700 text-sm">
            Puede gestionar sus preferencias de cookies en cualquier momento desde 
            la configuración de su cuenta o el banner de cookies.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-900 mb-6">
            9. Privacidad de Menores
          </h2>
          <div className="space-y-4 text-red-800">
            <p>
              <strong>Menores de 14 años:</strong> No recopilamos información de menores 
              de 14 años sin consentimiento parental verificable.
            </p>
            <p>
              <strong>Entre 14-18 años:</strong> Requieren consentimiento de padre/tutor 
              y supervisión durante las sesiones según normativa local.
            </p>
            <p>
              <strong>Protecciones Adicionales:</strong> Controles parentales, sesiones 
              supervisadas y políticas de comunicación restringidas.
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            10. Cambios a esta Política
          </h2>
          <p className="text-purple-800 mb-4">
            Podemos actualizar esta política periódicamente. Los cambios importantes 
            serán notificados con al menos 30 días de anticipación.
          </p>
          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">Le notificaremos por:</h4>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>• Email a su dirección registrada</li>
              <li>• Notificación prominente en la plataforma</li>
              <li>• Actualización en nuestro blog de privacidad</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contacto y Preguntas
          </h2>
          <p className="text-gray-600 mb-6">
            ¿Tiene preguntas sobre nuestra política de privacidad o sus datos personales?
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Oficial de Protección de Datos</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p> dpo@lunna.com</p>
                <p> +34 692 866 417</p>
                <p> Barcelona, España</p>
                <p> Respuesta en 72 horas</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Autoridad de Control</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Agencia Española de Protección de Datos (AEPD)</p>
                <p> www.aepd.es</p>
                <p> 901 100 099</p>
                <p>Si no está satisfecho con nuestra respuesta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
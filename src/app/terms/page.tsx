import MainLayout from '@/components/layout/MainLayout';
import { 
  FileText,
  Shield,
  Scale,
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  ExternalLink,
  Users,
  CreditCard,
  Lock
} from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = "10 de octubre de 2025";
  
  const sections = [
    {
      id: 'acceptance',
      title: '1. Aceptación de los Términos',
      icon: CheckCircle,
      content: `Al acceder y utilizar Lunna Platform (en adelante, "la Plataforma"), usted acepta estar sujeto a estos Términos de Servicio y a todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.`
    },
    {
      id: 'services',
      title: '2. Descripción de los Servicios',
      icon: Users,
      content: `Lunna Platform es una plataforma digital que facilita la conexión entre usuarios y profesionales de la salud mental licenciados para proporcionar servicios de terapia psicológica online. No somos un proveedor directo de servicios médicos, sino una plataforma tecnológica que facilita estas conexiones.`
    },
    {
      id: 'eligibility',
      title: '3. Elegibilidad y Registro',
      icon: Shield,
      content: `Para utilizar nuestros servicios, debe ser mayor de 18 años o tener el consentimiento de un padre/tutor legal. Para menores entre 14-18 años, se requiere supervisión parental. Al registrarse, confirma que toda la información proporcionada es veraz, precisa y completa.`
    },
    {
      id: 'user-responsibilities',
      title: '4. Responsabilidades del Usuario',
      icon: Users,
      content: `Los usuarios se comprometen a: usar la plataforma únicamente para fines terapéuticos legítimos, mantener la confidencialidad de sus credenciales de acceso, proporcionar información médica precisa y completa, asistir puntualmente a las citas programadas, y tratar a los terapeutas con respeto y profesionalidad.`
    },
    {
      id: 'therapist-responsibilities',
      title: '5. Responsabilidades de los Terapeutas',
      icon: Scale,
      content: `Los terapeutas en nuestra plataforma están licenciados y se comprometen a: mantener estándares éticos profesionales, proteger la confidencialidad del paciente según las leyes aplicables, proporcionar servicios competentes dentro de su área de especialización, mantener límites profesionales apropiados, y cumplir con todas las regulaciones de telemedicina.`
    },
    {
      id: 'payments',
      title: '6. Pagos y Facturación',
      icon: CreditCard,
      content: `Los pagos se procesan de forma segura a través de proveedores externos certificados. Los precios pueden cambiar con notificación previa de 30 días. Las cancelaciones realizadas con menos de 24 horas de anticipación pueden incurrir en cargos. Los reembolsos se evalúan caso por caso según nuestra política de reembolsos.`
    },
    {
      id: 'privacy',
      title: '7. Privacidad y Confidencialidad',
      icon: Lock,
      content: `La privacidad es fundamental en nuestros servicios. Cumplimos con GDPR, LOPD y todas las regulaciones aplicables de protección de datos. Los terapeutas están sujetos al secreto profesional. Nunca compartimos información personal sin consentimiento explícito, excepto cuando lo requiera la ley o en casos de riesgo inmediato.`
    },
    {
      id: 'limitations',
      title: '8. Limitaciones del Servicio',
      icon: AlertCircle,
      content: `Nuestros servicios no constituyen atención médica de emergencia. En caso de crisis o pensamientos suicidas, contacte servicios de emergencia (112) o la línea de crisis (024). La terapia online puede no ser apropiada para todas las condiciones. Los terapeutas pueden derivar a atención presencial cuando sea necesario.`
    }
  ];

  const prohibitedUses = [
    'Usar la plataforma para cualquier propósito ilegal o no autorizado',
    'Intentar obtener acceso no autorizado a otros usuarios o sistemas',
    'Transmitir virus, malware o cualquier código malicioso',
    'Acosar, amenazar o intimidar a otros usuarios o terapeutas',
    'Compartir información de inicio de sesión con terceros',
    'Usar la plataforma para publicidad comercial no autorizada',
    'Grabar sesiones sin consentimiento expreso por escrito'
  ];

  const intellectualProperty = [
    'Todo el contenido de la plataforma está protegido por derechos de autor',
    'Los usuarios mantienen derechos sobre su contenido personal',
    'Se prohíbe la reproducción no autorizada de material de la plataforma',
    'Las marcas comerciales de Lunna están protegidas legalmente'
  ];

  return (
    <MainLayout title="Términos de Servicio">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Términos de Servicio
          </h1>
          <p className="text-xl text-gray-600">
            Términos y condiciones para el uso de Lunna Platform
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-2 text-blue-800">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-semibold">Última actualización: {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Navegación Rápida</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors text-sm p-2 rounded hover:bg-white"
              >
                <section.icon className="h-4 w-4" />
                <span>{section.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Bienvenido a Lunna Platform
          </h2>
          <p className="text-gray-700 mb-4">
            Estos Términos de Servicio ("Términos") rigen su uso de Lunna Platform, 
            una plataforma digital que conecta usuarios con profesionales de salud mental 
            licenciados para servicios de terapia online.
          </p>
          <p className="text-gray-700">
            Al utilizar nuestros servicios, usted acepta estos términos en su totalidad. 
            Por favor, léalos cuidadosamente antes de usar la plataforma.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-red-900 mb-6 flex items-center">
            <AlertCircle className="h-6 w-6 mr-3" />
            9. Usos Prohibidos
          </h2>
          <p className="text-red-800 mb-4">
            Los siguientes usos están estrictamente prohibidos en nuestra plataforma:
          </p>
          <ul className="space-y-2">
            {prohibitedUses.map((use, index) => (
              <li key={index} className="flex items-start space-x-3 text-red-700">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{use}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-purple-900 mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-3" />
            10. Propiedad Intelectual
          </h2>
          <ul className="space-y-3">
            {intellectualProperty.map((item, index) => (
              <li key={index} className="flex items-start space-x-3 text-purple-700">
                <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-yellow-900 mb-6 flex items-center">
            <Scale className="h-6 w-6 mr-3" />
            11. Limitación de Responsabilidad
          </h2>
          <div className="space-y-4 text-yellow-800">
            <p>
              <strong>Exención de Garantías:</strong> Los servicios se proporcionan "tal como están" 
              sin garantías de ningún tipo, ya sean expresas o implícitas.
            </p>
            <p>
              <strong>Limitación de Daños:</strong> En ningún caso Lunna Platform será responsable 
              de daños indirectos, incidentales, especiales o consecuenciales.
            </p>
            <p>
              <strong>Responsabilidad Médica:</strong> Los terapeutas son profesionales independientes 
              responsables de sus propias decisiones clínicas y tratamientos.
            </p>
            <p>
              <strong>Emergencias:</strong> La plataforma no está diseñada para situaciones de emergencia. 
              En casos de crisis, contacte servicios de emergencia locales.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            12. Terminación de la Cuenta
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Por parte del Usuario:</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Puede cancelar su cuenta en cualquier momento</li>
                <li>• Los datos se mantienen según nuestra política de retención</li>
                <li>• Citas futuras serán canceladas automáticamente</li>
                <li>• Reembolsos según política establecida</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Por parte de Lunna:</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Violación de términos de servicio</li>
                <li>• Comportamiento inapropiado o abusivo</li>
                <li>• Actividad fraudulenta o ilegal</li>
                <li>• Notificación previa cuando sea posible</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6">
            13. Modificaciones a los Términos
          </h2>
          <p className="text-blue-800 mb-4">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. 
            Los cambios importantes serán notificados con al menos 30 días de anticipación.
          </p>
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Notificación de Cambios:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Email a todos los usuarios registrados</li>
              <li>• Notificación en la plataforma</li>
              <li>• Actualización de la fecha "última modificación"</li>
              <li>• Período de gracia de 30 días para objetar</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-green-900 mb-6">
            14. Ley Aplicable y Jurisdicción
          </h2>
          <p className="text-green-800 mb-4">
            Estos términos se rigen por las leyes de España. Cualquier disputa se resolverá 
            en los tribunales competentes de Barcelona, España.
          </p>
          <div className="text-sm text-green-700">
            <p><strong>Normativas aplicables:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Reglamento General de Protección de Datos (GDPR)</li>
              <li>Ley Orgánica de Protección de Datos (LOPD)</li>
              <li>Ley de Servicios de la Sociedad de la Información</li>
              <li>Código Deontológico del Colegio de Psicólogos</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            15. Información de Contacto
          </h2>
          <p className="text-gray-600 mb-6">
            Para preguntas sobre estos Términos de Servicio, puede contactarnos:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Email Legal</h3>
              <p className="text-sm text-gray-600">legal@lunna.com</p>
            </div>
            <div className="text-center">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Soporte</h3>
              <p className="text-sm text-gray-600">soporte@lunna.com</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Privacidad</h3>
              <p className="text-sm text-gray-600">privacidad@lunna.com</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-6 text-sm">
            <a href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
              <ExternalLink className="h-3 w-3 mr-1" />
              Política de Privacidad
            </a>
            <a href="/cookies" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
              <ExternalLink className="h-3 w-3 mr-1" />
              Política de Cookies
            </a>
            <a href="/consent" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
              <ExternalLink className="h-3 w-3 mr-1" />
              Consentimiento Informado
            </a>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-xs text-gray-600">
              Este documento constituye un acuerdo legal entre usted y Lunna Platform. 
              Al usar nuestros servicios, acepta estos términos en su totalidad.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
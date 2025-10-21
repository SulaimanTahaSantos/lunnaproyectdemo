import MainLayout from '@/components/layout/MainLayout';
import { 
  Search,
  BookOpen,
  Users,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  FileText,
  Video,
  Calendar,
  Shield,
  Heart,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function HelpPage() {
  const quickActions = [
    {
      title: 'Reservar Cita',
      description: 'Agenda una sesión con un terapeuta profesional',
      icon: Calendar,
      href: '/booking',
      color: 'blue'
    },
    {
      title: 'Chat en Vivo',
      description: 'Habla con nuestro equipo de soporte ahora',
      icon: MessageCircle,
      href: '/live-chat',
      color: 'green'
    },
    {
      title: 'Emergencias',
      description: 'Accede a recursos de crisis inmediata',
      icon: AlertCircle,
      href: '/emergency',
      color: 'red'
    },
    {
      title: 'FAQ',
      description: 'Encuentra respuestas rápidas a preguntas comunes',
      icon: HelpCircle,
      href: '/faq',
      color: 'purple'
    }
  ];

  const helpCategories = [
    {
      title: 'Primeros Pasos',
      icon: BookOpen,
      articles: [
        'Cómo crear tu cuenta en Lunna',
        'Completar tu perfil de salud mental',
        'Elegir el terapeuta adecuado',
        'Prepararte para tu primera sesión',
        'Configurar recordatorios y notificaciones'
      ]
    },
    {
      title: 'Sesiones y Citas',
      icon: Video,
      articles: [
        'Cómo unirse a una videollamada',
        'Reagendar o cancelar citas',
        'Problemas técnicos durante sesiones',
        'Grabar notas después de tu sesión',
        'Sistema de calificación de terapeutas'
      ]
    },
    {
      title: 'Facturación y Pagos',
      icon: FileText,
      articles: [
        'Métodos de pago aceptados',
        'Entender tu facturación',
        'Solicitar reembolsos',
        'Seguros y cobertura médica',
        'Planes de pago y descuentos'
      ]
    },
    {
      title: 'Privacidad y Seguridad',
      icon: Shield,
      articles: [
        'Cómo protegemos tu información',
        'Configuración de privacidad',
        'Compartir información con familiares',
        'Eliminar tu cuenta y datos',
        'Reportar problemas de seguridad'
      ]
    },
    {
      title: 'Recursos de Bienestar',
      icon: Heart,
      articles: [
        'Ejercicios de mindfulness gratuitos',
        'Biblioteca de recursos educativos',
        'Grupos de apoyo comunitarios',
        'Apps recomendadas de salud mental',
        'Crisis y recursos de emergencia'
      ]
    },
    {
      title: 'Soporte Técnico',
      icon: Users,
      articles: [
        'Problemas de audio y video',
        'Compatibilidad de navegadores',
        'App móvil: instalación y uso',
        'Sincronización entre dispositivos',
        'Reportar bugs y errores'
      ]
    }
  ];

  const contactMethods = [
    {
      method: 'Chat en Vivo',
      description: 'Respuesta inmediata durante horario laboral',
      availability: 'Lun-Vie 9:00-18:00',
      icon: MessageCircle,
      action: 'Iniciar Chat',
      color: 'green'
    },
    {
      method: 'Email Soporte',
      description: 'Respuesta en 24 horas máximo',
      availability: 'soporte@lunna.com',
      icon: Mail,
      action: 'Enviar Email',
      color: 'blue'
    },
    {
      method: 'Teléfono',
      description: 'Para emergencias y casos urgentes',
      availability: '692 866 417',
      icon: Phone,
      action: 'Llamar Ahora',
      color: 'purple'
    },
    {
      method: 'Centro de Ayuda',
      description: 'Documentación completa y guías',
      availability: 'Disponible 24/7',
      icon: BookOpen,
      action: 'Explorar',
      color: 'gray'
    }
  ];

  const popularArticles = [
    {
      title: '¿Cómo funciona la terapia online?',
      views: '12.5k visualizaciones',
      readTime: '5 min lectura',
      category: 'Primeros Pasos'
    },
    {
      title: 'Problemas técnicos: audio y video',
      views: '8.2k visualizaciones', 
      readTime: '3 min lectura',
      category: 'Soporte Técnico'
    },
    {
      title: 'Elegir el terapeuta correcto para ti',
      views: '15.3k visualizaciones',
      readTime: '7 min lectura', 
      category: 'Primeros Pasos'
    },
    {
      title: '¿Qué hacer en una crisis emocional?',
      views: '9.8k visualizaciones',
      readTime: '4 min lectura',
      category: 'Recursos de Bienestar'
    },
    {
      title: 'Configurar recordatorios de citas',
      views: '6.1k visualizaciones',
      readTime: '2 min lectura',
      category: 'Sesiones y Citas'
    }
  ];

  return (
    <MainLayout title="Centro de Ayuda">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            ¿En qué podemos ayudarte?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra respuestas rápidas, guías detalladas y contacta con nuestro 
            equipo de soporte especializado en salud mental.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Busca en nuestra base de conocimientos..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Acciones Rápidas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const bgColor = {
                blue: 'bg-blue-50 border-blue-200',
                green: 'bg-green-50 border-green-200', 
                red: 'bg-red-50 border-red-200',
                purple: 'bg-purple-50 border-purple-200'
              }[action.color];
              
              const iconColor = {
                blue: 'text-blue-600',
                green: 'text-green-600',
                red: 'text-red-600', 
                purple: 'text-purple-600'
              }[action.color];

              const buttonColor = {
                blue: 'bg-blue-600 hover:bg-blue-700',
                green: 'bg-green-600 hover:bg-green-700',
                red: 'bg-red-600 hover:bg-red-700',
                purple: 'bg-purple-600 hover:bg-purple-700'
              }[action.color];

              return (
                <div key={index} className={`${bgColor} border-2 rounded-lg p-6 text-center hover:shadow-lg transition-shadow`}>
                  <div className={`w-12 h-12 ${iconColor} mx-auto mb-4`}>
                    <action.icon className="h-12 w-12" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <button className={`${buttonColor} text-white px-4 py-2 rounded-md font-semibold transition-colors w-full`}>
                    {action.title}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Artículos Más Populares
          </h2>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border border-blue-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{article.views}</span>
                      <span>{article.readTime}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explora por Categoría
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                
                <ul className="space-y-3">
                  {category.articles.map((article, idx) => (
                    <li key={idx}>
                      <a 
                        href="#" 
                        className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors py-2 px-3 rounded hover:bg-gray-50"
                      >
                        <span className="text-sm">{article}</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full mt-4 text-blue-600 border border-blue-300 py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Ver Todos los Artículos
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            ¿Necesitas Más Ayuda?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Nuestro equipo de soporte está especializado en salud mental y está aquí 
            para ayudarte con cualquier pregunta o problema que tengas.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {contactMethods.map((contact, index) => {
              const bgColor = {
                green: 'bg-green-50 border-green-200',
                blue: 'bg-blue-50 border-blue-200',
                purple: 'bg-purple-50 border-purple-200',
                gray: 'bg-gray-50 border-gray-200'
              }[contact.color];
              
              const iconColor = {
                green: 'text-green-600',
                blue: 'text-blue-600', 
                purple: 'text-purple-600',
                gray: 'text-gray-600'
              }[contact.color];

              const buttonColor = {
                green: 'bg-green-600 hover:bg-green-700',
                blue: 'bg-blue-600 hover:bg-blue-700',
                purple: 'bg-purple-600 hover:bg-purple-700', 
                gray: 'bg-gray-600 hover:bg-gray-700'
              }[contact.color];

              return (
                <div key={index} className={`${bgColor} border-2 rounded-lg p-6`}>
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${iconColor} flex items-center justify-center bg-white rounded-lg`}>
                      <contact.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{contact.method}</h3>
                      <p className="text-gray-600 text-sm mb-2">{contact.description}</p>
                      <p className="text-xs text-gray-500 mb-4">{contact.availability}</p>
                      <button className={`${buttonColor} text-white px-4 py-2 rounded-md font-semibold transition-colors`}>
                        {contact.action}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-2">
                ¿Es una Emergencia de Salud Mental?
              </h3>
              <p className="text-red-800 mb-4">
                Si tienes pensamientos de autolesión o estás experimentando una crisis emocional, 
                busca ayuda inmediata. No esperes.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar 024 (Emergencias)
                </button>
                <button className="border border-red-300 text-red-700 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                  Recursos de Crisis
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Te resultó útil este contenido?
          </h2>
          <p className="text-gray-600 mb-6">
            Tu feedback nos ayuda a mejorar nuestros recursos de ayuda
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Sí, fue útil
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Necesito más ayuda
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
import MainLayout from '@/components/layout/MainLayout';
import { 
  Video, 
  MessageCircle, 
  Users, 
  Clock, 
  Shield, 
  CheckCircle, 
  Star,
  Calendar,
  Smartphone,
  Heart
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Video,
      title: 'Terapia Individual Online',
      description: 'Sesiones personalizadas uno a uno con terapeutas profesionales certificados.',
      features: [
        'Videollamadas seguras y privadas',
        'Horarios flexibles 24/7',
        'Seguimiento personalizado',
        'Historial clínico confidencial'
      ],
      price: 'Desde 45€/sesión',
      duration: '50 minutos',
      popular: true
    },
    {
      icon: Users,
      title: 'Terapia de Pareja',
      description: 'Fortalece tu relación con sesiones especializadas en terapia de pareja.',
      features: [
        'Especialistas en relaciones',
        'Técnicas probadas cientificamente',
        'Comunicación efectiva',
        'Resolución de conflictos'
      ],
      price: 'Desde 60€/sesión',
      duration: '60 minutos',
      popular: false
    },
    {
      icon: Users,
      title: 'Terapia Familiar',
      description: 'Sesiones grupales para mejorar la dinámica y comunicación familiar.',
      features: [
        'Sesiones grupales familiares',
        'Técnicas de comunicación',
        'Resolución de conflictos',
        'Fortalecimiento de vínculos'
      ],
      price: 'Desde 70€/sesión',
      duration: '75 minutos',
      popular: false
    },
    {
      icon: MessageCircle,
      title: 'Chat Terapéutico',
      description: 'Apoyo continuo a través de mensajería segura con tu terapeuta.',
      features: [
        'Comunicación asíncrona',
        'Respuesta en 24-48h',
        'Soporte entre sesiones',
        'Mensajería encriptada'
      ],
      price: 'Desde 25€/mes',
      duration: 'Ilimitado',
      popular: false
    }
  ];

  const specializations = [
    { name: 'Ansiedad y Estrés', count: '150+ terapeutas' },
    { name: 'Depresión', count: '120+ terapeutas' },
    { name: 'Terapia de Pareja', count: '85+ terapeutas' },
    { name: 'Trauma y PTSD', count: '95+ terapeutas' },
    { name: 'Trastornos Alimentarios', count: '60+ terapeutas' },
    { name: 'Adicciones', count: '70+ terapeutas' },
    { name: 'Terapia Infantil', count: '90+ terapeutas' },
    { name: 'Trastornos del Sueño', count: '45+ terapeutas' }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Disponibilidad 24/7',
      description: 'Accede a terapia en cualquier momento que lo necesites'
    },
    {
      icon: Shield,
      title: 'Privacidad Garantizada',
      description: 'Todas las sesiones están protegidas con encriptación de extremo a extremo'
    },
    {
      icon: Smartphone,
      title: 'Multiplataforma',
      description: 'Accede desde cualquier dispositivo: móvil, tablet o computadora'
    },
    {
      icon: Star,
      title: 'Terapeutas Certificados',
      description: 'Todos nuestros profesionales están colegiados y verificados'
    }
  ];

  return (
    <MainLayout title="Nuestros Servicios">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Servicios de Salud Mental Profesional
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una gama completa de servicios terapéuticos diseñados para 
            adaptarse a tus necesidades específicas y horarios.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-lg shadow-lg p-8 border-2 transition-shadow hover:shadow-xl ${
                service.popular ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-6 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Más Popular
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{service.price}</p>
                  <p className="text-sm text-gray-500">{service.duration}</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Especializaciones Disponibles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {specializations.map((spec, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-1">{spec.name}</h4>
                <p className="text-sm text-blue-600">{spec.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            ¿Por Qué Elegir Lunna Platform?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            ¿Cómo Funciona?
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                1
              </div>
              <h4 className="font-semibold">Regístrate</h4>
              <p className="text-sm text-gray-600">Crea tu cuenta y completa un breve cuestionario</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                2
              </div>
              <h4 className="font-semibold">Encuentra tu Terapeuta</h4>
              <p className="text-sm text-gray-600">Te conectamos con el profesional ideal para ti</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                3
              </div>
              <h4 className="font-semibold">Agenda tu Sesión</h4>
              <p className="text-sm text-gray-600">Elige el horario que mejor se adapte a ti</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                4
              </div>
              <h4 className="font-semibold">Inicia tu Terapia</h4>
              <p className="text-sm text-gray-600">Comienza tu camino hacia el bienestar mental</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-lg shadow-lg p-12">
          <Heart className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Listo para Comenzar?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Tu bienestar mental es nuestra prioridad. Comienza hoy mismo tu 
            viaje hacia una vida más plena y equilibrada.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Comenzar Ahora
            </button>
            <button className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Hablar con un Especialista
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
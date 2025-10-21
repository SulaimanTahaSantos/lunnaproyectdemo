import MainLayout from '@/components/layout/MainLayout';
import { Heart, Users, Shield, Award, Target, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Empatía y Comprensión',
      description: 'Creamos un espacio seguro donde cada persona se sienta escuchada y comprendida, sin juicios.'
    },
    {
      icon: Shield,
      title: 'Confidencialidad',
      description: 'La privacidad de nuestros usuarios es sagrada. Cumplimos con los más altos estándares de seguridad.'
    },
    {
      icon: Users,
      title: 'Profesionalismo',
      description: 'Nuestros terapeutas son profesionales certificados con experiencia en salud mental.'
    },
    {
      icon: Award,
      title: 'Calidad Garantizada',
      description: 'Nos comprometemos con la excelencia en cada sesión y en cada interacción.'
    }
  ];

  const milestones = [
    { year: '2023', event: 'Fundación de Lunna Platform', description: 'Iniciamos nuestra misión de hacer accesible la salud mental' },
    { year: '2024', event: '500+ Terapeutas Certificados', description: 'Construimos una red sólida de profesionales' },
    { year: '2024', event: '10,000+ Sesiones Realizadas', description: 'Impactamos positivamente miles de vidas' },
    { year: '2025', event: 'Expansión Internacional', description: 'Llevamos nuestros servicios a más países' }
  ];

  return (
    <MainLayout title="Acerca de Nosotros">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="text-6xl">🌙</span>
            <h1 className="text-4xl font-bold text-gray-900">Lunna Platform</h1>
          </div>
          
          <h2 className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Transformando vidas a través de la terapia psicológica accesible, 
            profesional y centrada en el bienestar mental
          </h2>
          
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            En Lunna Platform, creemos que la salud mental es un derecho fundamental. 
            Nuestra plataforma conecta a personas que buscan apoyo psicológico con 
            terapeutas profesionales certificados, creando un puente hacia el bienestar 
            emocional y mental.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-8 w-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Nuestra Misión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Democratizar el acceso a la salud mental proporcionando una plataforma 
              segura, confidencial y profesional que conecte a personas con terapeutas 
              certificados. Queremos eliminar las barreras que impiden a las personas 
              buscar ayuda psicológica cuando la necesitan.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-500">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="h-8 w-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Nuestra Visión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Ser la plataforma líder en salud mental a nivel global, donde cada 
              persona pueda acceder fácilmente al apoyo psicológico que necesita, 
              contribuyendo a una sociedad más saludable emocionalmente y 
              reduciendo el estigma asociado a la salud mental.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nuestro Crecimiento
          </h3>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {milestone.event}
                  </h4>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-white rounded-lg shadow-lg p-12">
          <Users className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Un Equipo Comprometido
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Detrás de Lunna Platform hay un equipo multidisciplinario de profesionales 
            de la salud mental, desarrolladores, diseñadores y especialistas en 
            experiencia de usuario, todos unidos por la pasión de mejorar el 
            bienestar mental de las personas.
          </p>
          <a 
            href="/team" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Conoce Nuestro Equipo
          </a>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Certificaciones y Reconocimientos
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <Shield className="h-12 w-12 text-blue-600 mx-auto" />
              <h4 className="font-semibold">ISO 27001</h4>
              <p className="text-sm text-gray-600">Seguridad de la Información</p>
            </div>
            <div className="space-y-2">
              <Shield className="h-12 w-12 text-green-600 mx-auto" />
              <h4 className="font-semibold">GDPR Compliance</h4>
              <p className="text-sm text-gray-600">Protección de Datos</p>
            </div>
            <div className="space-y-2">
              <Award className="h-12 w-12 text-purple-600 mx-auto" />
              <h4 className="font-semibold">Colegio Oficial de Psicólogos</h4>
              <p className="text-sm text-gray-600">Profesionales Certificados</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
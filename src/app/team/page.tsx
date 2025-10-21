import MainLayout from '@/components/layout/MainLayout';
import { 
  Award, 
  Users, 
  Globe, 
  BookOpen, 
  Star, 
  CheckCircle,
  MapPin,
  Calendar,
  MessageCircle
} from 'lucide-react';

export default function TeamPage() {
  const teamStats = [
    { label: 'Terapeutas Certificados', value: '500+', icon: Users },
    { label: 'Años de Experiencia Promedio', value: '8+', icon: Award },
    { label: 'Idiomas Disponibles', value: '15+', icon: Globe },
    { label: 'Especializaciones', value: '25+', icon: BookOpen }
  ];

  const leadership = [
    {
      name: 'Dr. María González',
      role: 'Directora Clínica',
      specialization: 'Psicología Clínica y Terapia Cognitivo-Conductual',
      experience: '15 años',
      education: 'Doctorado en Psicología, Universidad Complutense de Madrid',
      image: '/api/placeholder/200/200',
      bio: 'Especialista en trastornos de ansiedad y depresión con más de 15 años de experiencia clínica.',
      certifications: ['Colegio Oficial de Psicólogos', 'Certificación en TCC', 'Especialista EMDR']
    },
    {
      name: 'Dr. Carlos Ruiz',
      role: 'Director de Calidad',
      specialization: 'Psicología Organizacional y Desarrollo',
      experience: '12 años',
      education: 'Doctorado en Psicología Organizacional, Universidad de Barcelona',
      image: '/api/placeholder/200/200',
      bio: 'Experto en desarrollo de estándares de calidad y supervisión clínica en entornos digitales.',
      certifications: ['Colegio Oficial de Psicólogos', 'ISO 9001 Lead Auditor', 'Certificación en Supervisión Clínica']
    },
    {
      name: 'Dra. Ana Martín',
      role: 'Directora de Investigación',
      specialization: 'Neuropsicología y Terapias Digitales',
      experience: '10 años',
      education: 'Doctorado en Neuropsicología, Universidad Autónoma de Madrid',
      image: '/api/placeholder/200/200',
      bio: 'Investigadora en efectividad de terapias digitales y desarrollo de nuevos protocolos de intervención.',
      certifications: ['Colegio Oficial de Psicólogos', 'Neuropsychology Specialist', 'Digital Health Certificate']
    }
  ];

  const featuredTherapists = [
    {
      name: 'Laura Sánchez',
      specialization: 'Terapia de Pareja y Familiar',
      rating: 4.9,
      sessions: 1200,
      languages: ['Español', 'Inglés'],
      availability: 'Inmediata',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Miguel Torres',
      specialization: 'Trauma y PTSD',
      rating: 4.8,
      sessions: 950,
      languages: ['Español', 'Catalán'],
      availability: '2-3 días',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Isabel López',
      specialization: 'Trastornos Alimentarios',
      rating: 4.9,
      sessions: 800,
      languages: ['Español', 'Francés'],
      availability: 'Inmediata',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'David García',
      specialization: 'Ansiedad y Depresión',
      rating: 4.7,
      sessions: 1500,
      languages: ['Español', 'Inglés', 'Alemán'],
      availability: '1-2 días',
      image: '/api/placeholder/150/150'
    }
  ];

  const requirements = [
    'Licenciatura en Psicología de universidad acreditada',
    'Colegiación en el Colegio Oficial de Psicólogos',
    'Mínimo 3 años de experiencia clínica',
    'Especialización en al menos una área terapéutica',
    'Formación continua y supervisión regular',
    'Compromiso con la ética profesional y confidencialidad'
  ];

  return (
    <MainLayout title="Equipo Profesional">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Nuestro Equipo de Profesionales
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contamos con los mejores profesionales de la salud mental, 
            todos certificados y comprometidos con tu bienestar.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {teamStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Equipo Directivo
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                  <p className="text-blue-600 font-semibold">{leader.role}</p>
                  <p className="text-sm text-gray-500">{leader.specialization}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold">Experiencia:</span> {leader.experience}
                  </div>
                  <div>
                    <span className="font-semibold">Educación:</span> {leader.education}
                  </div>
                  <div>
                    <span className="font-semibold">Biografía:</span>
                    <p className="mt-1 text-gray-600">{leader.bio}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Certificaciones:</h4>
                  <div className="space-y-1">
                    {leader.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Terapeutas Destacados
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTherapists.map((therapist, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-gray-900 mb-1">{therapist.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{therapist.specialization}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{therapist.rating}</span>
                    <span className="text-gray-500">({therapist.sessions} sesiones)</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{therapist.languages.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Disponible: {therapist.availability}</span>
                  </div>
                </div>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Ver Perfil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Estándares de Selección
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Todos nuestros terapeutas pasan por un riguroso proceso de selección 
              y verificación para garantizar la más alta calidad en la atención.
            </p>
            <div className="space-y-3">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Eres Profesional de la Salud Mental?
            </h3>
            <p className="text-gray-600 mb-6">
              Únete a nuestro equipo de terapeutas y ayuda a más personas 
              a mejorar su bienestar mental.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Aplicar como Terapeuta
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Más Información
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitas Ayuda para Elegir?
          </h3>
          <p className="text-gray-600 mb-6">
            Nuestro equipo de coordinación te ayudará a encontrar el terapeuta 
            ideal para tus necesidades específicas.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Hablar con un Coordinador
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
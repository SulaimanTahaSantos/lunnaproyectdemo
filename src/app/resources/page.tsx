import MainLayout from '@/components/layout/MainLayout';
import { 
  BookOpen, 
  Video, 
  Headphones, 
  Download, 
  ExternalLink,
  Star,
  Clock,
  Users,
  Heart,
  Brain,
  Smartphone,
  Globe,
  FileText,
  Play,
  CheckCircle
} from 'lucide-react';

export default function ResourcesPage() {
  const resourceCategories = [
    {
      id: 'apps',
      title: 'Apps Recomendadas',
      icon: Smartphone,
      description: 'Aplicaciones móviles para el bienestar mental',
      color: 'blue'
    },
    {
      id: 'books',
      title: 'Libros y Lecturas',
      icon: BookOpen,
      description: 'Recursos bibliográficos sobre salud mental',
      color: 'green'
    },
    {
      id: 'podcasts',
      title: 'Podcasts y Audio',
      icon: Headphones,
      description: 'Contenido de audio sobre psicología y bienestar',
      color: 'purple'
    },
    {
      id: 'videos',
      title: 'Videos Educativos',
      icon: Video,
      description: 'Conferencias y contenido audiovisual',
      color: 'red'
    },
    {
      id: 'worksheets',
      title: 'Ejercicios y Herramientas',
      icon: FileText,
      description: 'Recursos descargables para auto-ayuda',
      color: 'yellow'
    },
    {
      id: 'websites',
      title: 'Sitios Web Útiles',
      icon: Globe,
      description: 'Plataformas y organizaciones de salud mental',
      color: 'indigo'
    }
  ];

  const apps = [
    {
      name: 'Headspace',
      category: 'Meditación y Mindfulness',
      rating: 4.8,
      price: 'Freemium',
      description: 'Meditación guiada y técnicas de mindfulness para reducir el estrés y la ansiedad.',
      features: ['Meditaciones guiadas', 'Ejercicios de respiración', 'Sonidos para dormir', 'Seguimiento del estado de ánimo'],
      platform: 'iOS/Android'
    },
    {
      name: 'Calm',
      category: 'Relajación y Sueño',
      rating: 4.7,
      price: 'Freemium',
      description: 'Historias para dormir, meditaciones y música relajante para mejorar el descanso.',
      features: ['Historias para dormir', 'Meditaciones', 'Música relajante', 'Programa de 7 días'],
      platform: 'iOS/Android'
    },
    {
      name: 'Sanvello',
      category: 'Ansiedad y Depresión',
      rating: 4.5,
      price: 'Freemium',
      description: 'Herramientas basadas en TCC para manejo de ansiedad, depresión y estado de ánimo.',
      features: ['Seguimiento del estado de ánimo', 'Ejercicios de TCC', 'Meditaciones', 'Comunidad de apoyo'],
      platform: 'iOS/Android'
    },
    {
      name: 'MindShift',
      category: 'Ansiedad',
      rating: 4.6,
      price: 'Gratuita',
      description: 'Desarrollada por psicólogos para adolescentes y adultos jóvenes con ansiedad.',
      features: ['Estrategias de afrontamiento', 'Seguimiento de pensamientos', 'Desafíos graduales', 'Recursos educativos'],
      platform: 'iOS/Android'
    }
  ];

  const books = [
    {
      title: 'Sentirse Bien: Una Nueva Terapia contra las Depresiones',
      author: 'David D. Burns',
      category: 'Depresión y TCC',
      rating: 4.9,
      description: 'Un clásico de la terapia cognitivo-conductual para superar la depresión.',
      topics: ['Distorsiones cognitivas', 'Técnicas de TCC', 'Auto-ayuda', 'Depresión']
    },
    {
      title: 'El Poder del Ahora',
      author: 'Eckhart Tolle',
      category: 'Mindfulness y Espiritualidad',
      rating: 4.7,
      description: 'Una guía hacia la iluminación espiritual y la vida en el presente.',
      topics: ['Mindfulness', 'Presencia', 'Ansiedad', 'Espiritualidad']
    },
    {
      title: 'Tus Zonas Erróneas',
      author: 'Wayne Dyer',
      category: 'Desarrollo Personal',
      rating: 4.6,
      description: 'Cómo liberarse de los comportamientos negativos y autodestructivos.',
      topics: ['Autoestima', 'Desarrollo personal', 'Patrones negativos', 'Crecimiento']
    },
    {
      title: 'El Hombre en Busca de Sentido',
      author: 'Viktor Frankl',
      category: 'Logoterapia y Resiliencia',
      rating: 4.9,
      description: 'Reflexiones sobre la búsqueda de propósito en la vida a partir de la experiencia en campos de concentración.',
      topics: ['Sentido de vida', 'Resiliencia', 'Trauma', 'Filosofía']
    }
  ];

  const podcasts = [
    {
      name: 'Radio Ambulante',
      category: 'Historias de Vida',
      episodes: '200+',
      duration: '25-35 min',
      description: 'Historias latinoamericanas que incluyen temas de salud mental y superación.',
      topics: ['Historias reales', 'Cultura latina', 'Superación', 'Comunidad']
    },
    {
      name: 'Entiende Tu Mente',
      category: 'Psicología Práctica',
      episodes: '150+',
      duration: '30-45 min',
      description: 'Psicología aplicada a la vida cotidiana con casos prácticos y consejos.',
      topics: ['Psicología práctica', 'Casos reales', 'Consejos', 'Bienestar']
    },
    {
      name: 'Hablando Se Entiende La Gente',
      category: 'Comunicación y Relaciones',
      episodes: '100+',
      duration: '40-60 min',
      description: 'Mejora tus habilidades de comunicación y relaciones interpersonales.',
      topics: ['Comunicación', 'Relaciones', 'Habilidades sociales', 'Parejas']
    }
  ];

  const worksheets = [
    {
      title: 'Registro de Pensamientos',
      category: 'TCC',
      format: 'PDF',
      pages: '2',
      description: 'Hoja de trabajo para identificar y cuestionar pensamientos automáticos negativos.',
      skills: ['Autoconciencia', 'Reestructuración cognitiva', 'Seguimiento diario']
    },
    {
      title: 'Diario de Gratitud',
      category: 'Bienestar',
      format: 'PDF',
      pages: '1',
      description: 'Plantilla semanal para practicar la gratitud y mejorar el estado de ánimo.',
      skills: ['Gratitud', 'Mindfulness', 'Estado de ánimo positivo']
    },
    {
      title: 'Plan de Seguridad Personal',
      category: 'Crisis',
      format: 'PDF',
      pages: '3',
      description: 'Herramienta para crear un plan personalizado en momentos de crisis emocional.',
      skills: ['Gestión de crisis', 'Autoayuda', 'Red de apoyo']
    },
    {
      title: 'Ejercicios de Respiración',
      category: 'Ansiedad',
      format: 'PDF',
      pages: '2',
      description: 'Guía con técnicas de respiración para manejo de ansiedad y estrés.',
      skills: ['Control de ansiedad', 'Relajación', 'Técnicas de respiración']
    }
  ];

  const websites = [
    {
      name: 'Confederación Salud Mental España',
      url: 'salud-mental.org',
      description: 'Organización que agrupa asociaciones de salud mental en España.',
      services: ['Información', 'Recursos locales', 'Advocacy', 'Programas'],
      type: 'Organización'
    },
    {
      name: 'Colegio Oficial de Psicólogos',
      url: 'cop.es',
      description: 'Colegio profesional con recursos y directorio de psicólogos colegiados.',
      services: ['Directorio profesional', 'Recursos técnicos', 'Formación', 'Código ético'],
      type: 'Profesional'
    },
    {
      name: 'Centro de Psicología Online',
      url: 'psicologia-online.com',
      description: 'Portal con artículos, tests y recursos de psicología y salud mental.',
      services: ['Artículos', 'Tests psicológicos', 'Consultas', 'Recursos educativos'],
      type: 'Educativo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <MainLayout title="Recursos de Salud Mental">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Recursos de Salud Mental
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Una colección curada de recursos, herramientas y materiales 
            para apoyar tu bienestar mental y el de tus seres queridos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCategories.map((category, index) => (
            <div key={category.id} className={`border-2 rounded-lg p-6 ${getColorClasses(category.color)}`}>
              <category.icon className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-sm">{category.description}</p>
            </div>
          ))}
        </div>

        <div id="apps">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Smartphone className="h-8 w-8 mr-3 text-blue-600" />
            Apps Recomendadas
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {apps.map((app, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                    <p className="text-blue-600 font-semibold">{app.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {renderStars(app.rating)}
                      <span className="text-sm text-gray-600 ml-2">{app.rating}</span>
                    </div>
                    <span className="text-sm text-green-600 font-semibold">{app.price}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{app.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Características:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{app.platform}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                    Ver App
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="books">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <BookOpen className="h-8 w-8 mr-3 text-green-600" />
            Libros Recomendados
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {books.map((book, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                  <p className="text-gray-600 font-semibold">por {book.author}</p>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm mt-2">
                    {book.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 mb-3">
                  {renderStars(book.rating)}
                  <span className="text-sm text-gray-600 ml-2">{book.rating}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{book.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Temas tratados:</h4>
                  <div className="flex flex-wrap gap-2">
                    {book.topics.map((topic, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Ver Libro
                </button>
              </div>
            ))}
          </div>
        </div>

        <div id="podcasts" className="bg-purple-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Headphones className="h-8 w-8 mr-3 text-purple-600" />
            Podcasts Recomendados
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {podcasts.map((podcast, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{podcast.name}</h3>
                <p className="text-purple-600 font-semibold mb-3">{podcast.category}</p>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{podcast.episodes} episodios</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{podcast.duration} por episodio</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{podcast.description}</p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {podcast.topics.map((topic, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center">
                  <Play className="h-4 w-4 mr-2" />
                  Escuchar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div id="worksheets">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-yellow-600" />
            Ejercicios y Herramientas Descargables
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {worksheets.map((worksheet, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{worksheet.title}</h3>
                <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm mb-3">
                  {worksheet.category}
                </span>
                
                <div className="text-sm text-gray-600 mb-3">
                  <div className="flex justify-between">
                    <span>Formato: {worksheet.format}</span>
                    <span>{worksheet.pages} páginas</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{worksheet.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Habilidades:</h4>
                  <div className="space-y-1">
                    {worksheet.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div id="websites" className="bg-indigo-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Globe className="h-8 w-8 mr-3 text-indigo-600" />
            Sitios Web Útiles
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {websites.map((website, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{website.name}</h3>
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                    {website.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{website.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Servicios:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {website.services.map((service, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{website.url}</span>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center">
                    Visitar
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <Brain className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Necesitas Ayuda Profesional?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Aunque estos recursos son muy útiles, nada sustituye la ayuda de un 
            profesional de la salud mental. Si necesitas apoyo personalizado, 
            estamos aquí para ayudarte.
          </p>
          <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Encontrar un Terapeuta
            </button>
            <button className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Consulta Gratuita
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
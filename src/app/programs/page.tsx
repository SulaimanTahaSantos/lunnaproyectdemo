import MainLayout from '@/components/layout/MainLayout';
import { 
  Target, 
  Users, 
  Calendar, 
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Heart,
  Brain,
  Shield,
  Zap,
  Award,
  BookOpen,
  Video,
  MessageCircle
} from 'lucide-react';

export default function ProgramsPage() {
  const featuredPrograms = [
    {
      id: 'anxiety-mastery',
      name: 'Programa Intensivo de Ansiedad',
      subtitle: 'Domina tu Ansiedad en 8 Semanas',
      icon: Shield,
      duration: '8 semanas',
      sessions: '16 sesiones (2 por semana)',
      groupSize: '6-8 participantes',
      price: '320€',
      originalPrice: '400€',
      rating: 4.9,
      reviews: 127,
      featured: true,
      description: 'Programa intensivo basado en TCC para superar la ansiedad generalizada, ataques de pánico y fobias específicas.',
      objectives: [
        'Identificar y modificar patrones de pensamiento ansiosos',
        'Dominar técnicas de relajación y respiración',
        'Desarrollar estrategias de afrontamiento efectivas',
        'Reducir significativamente los síntomas de ansiedad',
        'Prevenir recaídas y mantener el progreso'
      ],
      schedule: [
        'Semanas 1-2: Psicoeducación y técnicas básicas',
        'Semanas 3-4: Reestructuración cognitiva',
        'Semanas 5-6: Exposición gradual y desensibilización',
        'Semanas 7-8: Consolidación y prevención de recaídas'
      ],
      includes: [
        '16 sesiones grupales (90 min c/u)',
        '4 sesiones individuales de seguimiento',
        'Material didáctico personalizado',
        'App móvil con ejercicios diarios',
        'Seguimiento post-programa (3 meses)',
        'Certificado de participación'
      ],
      therapists: ['Dra. Ana García (Coordinadora)', 'Dr. Miguel Torres', 'Lic. Laura Martín'],
      nextStart: '15 de Noviembre, 2025'
    },
    {
      id: 'depression-recovery',
      name: 'Programa de Recuperación de Depresión',
      subtitle: 'Reconstruye tu Bienestar Emocional',
      icon: Heart,
      duration: '12 semanas',
      sessions: '24 sesiones (2 por semana)',
      groupSize: '4-6 participantes',
      price: '480€',
      originalPrice: '600€',
      rating: 4.8,
      reviews: 89,
      featured: true,
      description: 'Programa integral que combina TCC, terapia interpersonal y mindfulness para superar la depresión.',
      objectives: [
        'Superar episodios depresivos mayores y menores',
        'Mejorar el estado de ánimo y la motivación',
        'Reconstruir relaciones interpersonales saludables',
        'Desarrollar rutinas de autocuidado sostenibles',
        'Prevenir futuras recaídas depresivas'
      ],
      schedule: [
        'Semanas 1-3: Estabilización y psicoeducación',
        'Semanas 4-6: Activación conductual',
        'Semanas 7-9: Trabajo interpersonal y social',
        'Semanas 10-12: Consolidación y plan de mantenimiento'
      ],
      includes: [
        '24 sesiones grupales (90 min c/u)',
        '6 sesiones individuales personalizadas',
        'Talleres de mindfulness semanales',
        'Plan de activación conductual',
        'Seguimiento mensual (6 meses)',
        'Acceso a comunidad online de apoyo'
      ],
      therapists: ['Dr. Carlos Ruiz (Coordinador)', 'Dra. Elena Jiménez', 'Lic. Roberto Silva'],
      nextStart: '22 de Noviembre, 2025'
    }
  ];

  const specializedPrograms = [
    {
      category: 'Trastornos de Ansiedad',
      programs: [
        {
          name: 'Fobias Específicas - Exposición Gradual',
          duration: '6 semanas',
          format: 'Individual',
          price: '270€',
          description: 'Superación de fobias específicas mediante exposición gradual sistemática.'
        },
        {
          name: 'Trastorno de Pánico - Control Total',
          duration: '10 semanas',
          format: 'Grupal (4-5 personas)',
          price: '350€',
          description: 'Eliminación completa de ataques de pánico y agorafobia asociada.'
        },
        {
          name: 'Ansiedad Social - Confianza Social',
          duration: '12 semanas',
          format: 'Grupal (6-8 personas)',
          price: '420€',
          description: 'Desarrollo de confianza en situaciones sociales y profesionales.'
        }
      ]
    },
    {
      category: 'Relaciones y Familia',
      programs: [
        {
          name: 'Terapia de Pareja Intensiva',
          duration: '16 semanas',
          format: 'Pareja',
          price: '640€',
          description: 'Reconstrucción de la comunicación y intimidad en la relación.'
        },
        {
          name: 'Mediación Familiar',
          duration: '8 semanas',
          format: 'Familiar',
          price: '400€',
          description: 'Resolución de conflictos familiares y mejora de la dinámica.'
        },
        {
          name: 'Habilidades Parentales',
          duration: '6 semanas',
          format: 'Grupal padres',
          price: '210€',
          description: 'Desarrollo de estrategias efectivas de crianza y disciplina positiva.'
        }
      ]
    },
    {
      category: 'Trauma y Estrés',
      programs: [
        {
          name: 'EMDR Intensivo para Trauma',
          duration: '8-12 sesiones',
          format: 'Individual',
          price: '480€',
          description: 'Procesamiento de traumas mediante EMDR y técnicas especializadas.'
        },
        {
          name: 'Manejo del Estrés Laboral',
          duration: '4 semanas',
          format: 'Grupal corporativo',
          price: '160€',
          description: 'Técnicas específicas para manejar el estrés en el ambiente laboral.'
        },
        {
          name: 'Recuperación Post-Duelo',
          duration: '10 semanas',
          format: 'Grupal (4-6 personas)',
          price: '350€',
          description: 'Acompañamiento especializado en procesos de duelo complicado.'
        }
      ]
    },
    {
      category: 'Adicciones y Compulsiones',
      programs: [
        {
          name: 'Libertad de Adicciones',
          duration: '16 semanas',
          format: 'Grupal + Individual',
          price: '720€',
          description: 'Programa integral para superar adicciones a sustancias o comportamientos.'
        },
        {
          name: 'Control de Impulsos',
          duration: '8 semanas',
          format: 'Individual',
          price: '320€',
          description: 'Desarrollo del autocontrol y manejo de conductas impulsivas.'
        }
      ]
    }
  ];

  const corporatePrograms = [
    {
      name: 'Bienestar Organizacional',
      description: 'Programa integral de salud mental para empresas',
      features: [
        'Evaluación del clima laboral',
        'Talleres de manejo del estrés',
        'Sesiones individuales para empleados',
        'Protocolos de prevención del burnout',
        'Formación para líderes en salud mental'
      ],
      duration: 'Programa anual',
      price: 'Consultar'
    },
    {
      name: 'Prevención del Burnout',
      description: 'Estrategias específicas para prevenir y tratar el agotamiento laboral',
      features: [
        'Identificación temprana de síntomas',
        'Técnicas de desconexión digital',
        'Equilibrio trabajo-vida personal',
        'Apoyo psicológico especializado',
        'Seguimiento y métricas de mejora'
      ],
      duration: '3 meses',
      price: 'Desde 2,400€'
    }
  ];

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
    <MainLayout title="Programas Especializados">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Programas Especializados de Salud Mental
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Programas estructurados y basados en evidencia científica para 
            abordar necesidades específicas de salud mental con resultados comprobados.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Programas Destacados
          </h2>
          <div className="space-y-12">
            {featuredPrograms.map((program, index) => (
              <div key={program.id} className="bg-white rounded-lg shadow-xl p-8 border-2 border-blue-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <program.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{program.name}</h3>
                        {program.featured && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">
                            Destacado
                          </span>
                        )}
                      </div>
                      <p className="text-lg text-blue-600 font-semibold">{program.subtitle}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(program.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {program.rating} ({program.reviews} reseñas)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-green-600">{program.price}</span>
                      <span className="text-lg text-gray-500 line-through ml-2">{program.originalPrice}</span>
                    </div>
                    <p className="text-sm text-green-600 font-semibold">20% descuento hasta fin de mes</p>
                  </div>
                </div>

                <p className="text-gray-600 text-lg mb-6">{program.description}</p>

                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-600" />
                      Objetivos del Programa
                    </h4>
                    <ul className="space-y-2">
                      {program.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                      Cronograma
                    </h4>
                    <ul className="space-y-3">
                      {program.schedule.map((phase, idx) => (
                        <li key={idx} className="text-sm">
                          <div className="font-semibold text-gray-800">
                            {phase.split(':')[0]}
                          </div>
                          <div className="text-gray-600">
                            {phase.split(':')[1]}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-600" />
                      Incluye
                    </h4>
                    <ul className="space-y-2">
                      {program.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Información del Programa</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Duración: {program.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Video className="h-4 w-4 text-gray-400" />
                        <span>Sesiones: {program.sessions}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>Grupo: {program.groupSize}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Próximo inicio: {program.nextStart}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Equipo Terapéutico</h4>
                    <div className="space-y-2">
                      {program.therapists.map((therapist, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{therapist}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                    Inscribirse Ahora
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Más Información
                  </button>
                  <button className="border border-blue-300 text-blue-700 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Consulta Gratuita
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Programas por Especialidad
          </h2>
          <div className="space-y-12">
            {specializedPrograms.map((category, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Brain className="h-6 w-6 mr-3 text-purple-600" />
                  {category.category}
                </h3>
                <div className="grid lg:grid-cols-3 gap-6">
                  {category.programs.map((program, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{program.name}</h4>
                      <p className="text-gray-600 mb-4 text-sm">{program.description}</p>
                      
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Duración:</span>
                          <span className="font-semibold">{program.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Formato:</span>
                          <span className="font-semibold">{program.format}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Precio:</span>
                          <span className="font-bold text-green-600">{program.price}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm">
                          Ver Programa
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm">
                          Consultar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Programas Corporativos
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {corporatePrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.name}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                
                <h4 className="font-semibold text-gray-900 mb-3">Incluye:</h4>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Duración</div>
                    <div className="font-semibold">{program.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Precio</div>
                    <div className="font-bold text-indigo-600">{program.price}</div>
                  </div>
                </div>
                
                <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Solicitar Propuesta
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Por Qué Elegir Nuestros Programas?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Basados en Evidencia</h3>
                  <p className="text-gray-600">
                    Todos nuestros programas están respaldados por investigación científica 
                    y han demostrado su efectividad en estudios clínicos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Grupos Reducidos</h3>
                  <p className="text-gray-600">
                    Trabajamos con grupos pequeños para garantizar atención personalizada 
                    y mejores resultados terapéuticos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Resultados Rápidos</h3>
                  <p className="text-gray-600">
                    Nuestros programas intensivos están diseñados para obtener 
                    mejoras significativas en tiempos reducidos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿No sabes qué programa elegir?
            </h3>
            <p className="text-gray-600 mb-6">
              Nuestros especialistas te ayudarán a determinar qué programa 
              es más adecuado para tus necesidades específicas.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Evaluación Gratuita
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Ver Todos los Programas
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-8">Resultados Comprobados</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">92%</div>
              <div className="text-blue-100">Completan el programa</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">87%</div>
              <div className="text-blue-100">Mejora significativa</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8/5</div>
              <div className="text-blue-100">Satisfacción promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1,200+</div>
              <div className="text-blue-100">Vidas transformadas</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
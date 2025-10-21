import MainLayout from '@/components/layout/MainLayout';
import { 
  Brain, 
  Heart, 
  Users, 
  MessageCircle, 
  Target, 
  Lightbulb,
  Clock,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';

export default function TherapyTypesPage() {
  const therapyTypes = [
    {
      id: 'cbt',
      name: 'Terapia Cognitivo-Conductual (TCC)',
      icon: Brain,
      description: 'Enfoque basado en evidencia que ayuda a identificar y cambiar patrones de pensamiento y comportamiento negativos.',
      duration: '12-20 sesiones típicamente',
      effectiveness: '85% efectividad',
      bestFor: ['Ansiedad', 'Depresión', 'Fobias', 'TOC', 'Estrés postraumático'],
      howItWorks: 'La TCC se basa en la idea de que nuestros pensamientos, sentimientos y comportamientos están interconectados. Al cambiar patrones de pensamiento negativos, podemos mejorar nuestro estado emocional y comportamiento.',
      techniques: [
        'Reestructuración cognitiva',
        'Exposición gradual',
        'Registro de pensamientos',
        'Técnicas de relajación',
        'Tarea entre sesiones'
      ],
      popular: true
    },
    {
      id: 'humanistic',
      name: 'Terapia Humanística',
      icon: Heart,
      description: 'Enfoque centrado en la persona que enfatiza el crecimiento personal y la autorrealización.',
      duration: '20-40 sesiones típicamente',
      effectiveness: '78% efectividad',
      bestFor: ['Baja autoestima', 'Crisis existenciales', 'Desarrollo personal', 'Duelo', 'Relaciones'],
      howItWorks: 'Se centra en el aquí y ahora, promoviendo la autoconciencia y la aceptación personal. El terapeuta actúa como facilitador del proceso de autodescubrimiento.',
      techniques: [
        'Escucha activa',
        'Reflejo empático',
        'Técnicas gestálticas',
        'Mindfulness',
        'Exploración emocional'
      ],
      popular: false
    },
    {
      id: 'psychodynamic',
      name: 'Terapia Psicodinámica',
      icon: Lightbulb,
      description: 'Explora patrones inconscientes y experiencias pasadas que influyen en el comportamiento actual.',
      duration: '25-50 sesiones típicamente',
      effectiveness: '72% efectividad',
      bestFor: ['Traumas infantiles', 'Patrones relacionales', 'Depresión crónica', 'Trastornos de personalidad'],
      howItWorks: 'Examina cómo las experiencias tempranas y los conflictos inconscientes afectan la vida actual, promoviendo la introspección y el insight.',
      techniques: [
        'Interpretación de sueños',
        'Análisis de transferencia',
        'Asociación libre',
        'Exploración del pasado',
        'Insight terapéutico'
      ],
      popular: false
    },
    {
      id: 'family',
      name: 'Terapia Familiar Sistémica',
      icon: Users,
      description: 'Trabaja con familias para mejorar la comunicación y resolver conflictos desde una perspectiva sistémica.',
      duration: '15-25 sesiones típicamente',
      effectiveness: '80% efectividad',
      bestFor: ['Conflictos familiares', 'Adolescentes problemáticos', 'Divorcio', 'Comunicación familiar'],
      howItWorks: 'Ve a la familia como un sistema interconectado donde el cambio en un miembro afecta a todos. Se enfoca en patrones de interacción y comunicación.',
      techniques: [
        'Genograma familiar',
        'Reestructuración familiar',
        'Técnicas comunicacionales',
        'Terapia estratégica',
        'Intervenciones sistémicas'
      ],
      popular: false
    },
    {
      id: 'emdr',
      name: 'EMDR (Desensibilización y Reprocesamiento)',
      icon: Target,
      description: 'Terapia específica para trauma que utiliza movimientos oculares para procesar memorias traumáticas.',
      duration: '8-15 sesiones típicamente',
      effectiveness: '90% efectividad en trauma',
      bestFor: ['PTSD', 'Trauma', 'Fobias específicas', 'Ansiedad por eventos específicos'],
      howItWorks: 'Utiliza estimulación bilateral (movimientos oculares) mientras se procesa la memoria traumática, permitiendo que el cerebro la integre de forma adaptativa.',
      techniques: [
        'Estimulación bilateral',
        'Procesamiento de memorias',
        'Instalación de recursos',
        'Protocolo de 8 fases',
        'Trabajo corporal'
      ],
      popular: true
    },
    {
      id: 'dbt',
      name: 'Terapia Dialéctico-Conductual (TDC)',
      icon: MessageCircle,
      description: 'Combina TCC con técnicas de mindfulness para regular emociones intensas y mejorar relaciones.',
      duration: '20-30 sesiones típicamente',
      effectiveness: '82% efectividad',
      bestFor: ['Trastorno límite', 'Autolesiones', 'Inestabilidad emocional', 'Relaciones conflictivas'],
      howItWorks: 'Enseña cuatro módulos de habilidades: mindfulness, tolerancia al malestar, regulación emocional y efectividad interpersonal.',
      techniques: [
        'Mindfulness',
        'Regulación emocional',
        'Tolerancia al malestar',
        'Efectividad interpersonal',
        'Cadena conductual'
      ],
      popular: false
    }
  ];

  const specializedPrograms = [
    {
      name: 'Programa de Ansiedad',
      duration: '8 semanas',
      sessions: '8 sesiones grupales + 4 individuales',
      description: 'Programa integral para manejo de ansiedad con técnicas específicas y apoyo grupal.'
    },
    {
      name: 'Programa de Duelo',
      duration: '12 semanas',
      sessions: '12 sesiones individuales',
      description: 'Acompañamiento especializado en procesos de pérdida y duelo complicado.'
    },
    {
      name: 'Programa de Parejas',
      duration: '16 semanas',
      sessions: '16 sesiones de pareja',
      description: 'Mejora la comunicación y resuelve conflictos en la relación de pareja.'
    }
  ];

  return (
    <MainLayout title="Tipos de Terapia">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Tipos de Terapia Disponibles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos diferentes enfoques terapéuticos basados en evidencia científica, 
            adaptados a tus necesidades específicas y objetivos de tratamiento.
          </p>
        </div>

        <div className="space-y-12">
          {therapyTypes.map((therapy, index) => (
            <div 
              key={therapy.id} 
              className={`bg-white rounded-lg shadow-lg p-8 border-l-4 ${
                therapy.popular ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              {therapy.popular && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 mb-4">
                  <Star className="h-4 w-4 mr-1" />
                  Más Popular
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <therapy.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {therapy.name}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {therapy.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{therapy.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-500" />
                      <span className="text-green-700 font-semibold">{therapy.effectiveness}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      ¿Cómo Funciona?
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {therapy.howItWorks}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Técnicas Principales
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {therapy.techniques.map((technique, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{technique}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Mejor para:
                  </h3>
                  <div className="space-y-2 mb-6">
                    {therapy.bestFor.map((condition, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{condition}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Encontrar Terapeuta
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Más Información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Programas Especializados
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {specializedPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {program.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{program.sessions}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {program.description}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Ver Programa
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Cómo Elegir el Tipo de Terapia Adecuado?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Evalúa tus Necesidades</h3>
                  <p className="text-gray-600">
                    Considera qué problemas específicos quieres abordar y qué objetivos tienes para la terapia.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Consulta con un Profesional</h3>
                  <p className="text-gray-600">
                    Nuestros coordinadores te ayudarán a identificar el enfoque más apropiado para tu situación.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Encuentra tu Terapeuta</h3>
                  <p className="text-gray-600">
                    Te conectamos con especialistas certificados en el enfoque terapéutico más adecuado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿No estás seguro?
            </h3>
            <p className="text-gray-600 mb-6">
              Nuestros especialistas en salud mental te ayudarán a determinar 
              qué tipo de terapia es más efectivo para tus necesidades específicas.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                Evaluación Gratuita
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Hablar con un Coordinador
              </button>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                Terapias Basadas en Evidencia
              </h3>
              <p className="text-green-700">
                Todos nuestros enfoques terapéuticos están respaldados por investigación 
                científica y han demostrado su efectividad en estudios clínicos rigurosos. 
                Nuestros terapeutas reciben formación continua en las técnicas más actualizadas 
                y efectivas disponibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
import MainLayout from '@/components/layout/MainLayout';
import { 
  Phone, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Heart,
  Shield,
  Users,
  MessageCircle,
  ExternalLink,
  Zap,
  Hospital
} from 'lucide-react';

export default function EmergencyPage() {
  const emergencyNumbers = [
    {
      name: 'Línea de Atención a la Conducta Suicida',
      number: '024',
      description: 'Atención gratuita 24/7 para prevención del suicidio',
      availability: '24 horas',
      type: 'primary'
    },
    {
      name: 'Emergencias Generales',
      number: '112',
      description: 'Servicios de emergencia médica, policía y bomberos',
      availability: '24 horas',
      type: 'emergency'
    },
    {
      name: 'Teléfono de la Esperanza',
      number: '717 003 717',
      description: 'Apoyo emocional y prevención del suicidio',
      availability: '24 horas',
      type: 'support'
    },
    {
      name: 'Teléfono contra el Maltrato',
      number: '016',
      description: 'Información y asesoramiento en violencia de género',
      availability: '24 horas',
      type: 'support'
    }
  ];

  const warningSigns = [
    {
      category: 'Pensamientos Suicidas',
      signs: [
        'Expresiones directas sobre querer morir',
        'Hablar sobre no tener razón para vivir',
        'Búsqueda de métodos para hacerse daño',
        'Obsesión con la muerte',
        'Sensación de ser una carga para otros'
      ],
      urgency: 'immediate'
    },
    {
      category: 'Crisis de Pánico Severa',
      signs: [
        'Dificultad extrema para respirar',
        'Dolor en el pecho intenso',
        'Mareos o desmayos',
        'Sensación de muerte inminente',
        'Pérdida de control total'
      ],
      urgency: 'high'
    },
    {
      category: 'Episodio Psicótico',
      signs: [
        'Alucinaciones (ver/oír cosas que no existen)',
        'Delirios o ideas irreales',
        'Comportamiento muy extraño o agresivo',
        'Pérdida completa del contacto con la realidad',
        'Incoherencia total en el habla'
      ],
      urgency: 'immediate'
    },
    {
      category: 'Crisis de Ansiedad Severa',
      signs: [
        'Hiperventilación incontrolable',
        'Temblores extremos',
        'Sudoración profusa',
        'Náuseas intensas',
        'Miedo extremo a perder el control'
      ],
      urgency: 'moderate'
    }
  ];

  const immediateActions = [
    {
      situation: 'Pensamientos Suicidas',
      actions: [
        'No dejes sola a la persona',
        'Llama inmediatamente al 024 o 112',
        'Retira objetos peligrosos del alcance',
        'Habla con calma y sin juzgar',
        'Acompaña al servicio de urgencias más cercano'
      ]
    },
    {
      situation: 'Crisis de Pánico',
      actions: [
        'Mantén la calma y habla con voz suave',
        'Ayuda a regular la respiración (4-7-8)',
        'Busca un lugar tranquilo y ventilado',
        'Recuerda que es temporal y pasará',
        'Si persiste más de 20 min, busca ayuda médica'
      ]
    },
    {
      situation: 'Episodio Psicótico',
      actions: [
        'No confrontes las alucinaciones o delirios',
        'Mantén un entorno tranquilo y seguro',
        'Llama a emergencias (112)',
        'Evita movimientos bruscos o ruidos fuertes',
        'Documenta los síntomas para el personal médico'
      ]
    }
  ];

  const hospitals = [
    {
      name: 'Hospital Clínic de Barcelona',
      address: 'Carrer de Villarroel, 170, 08036 Barcelona',
      phone: '932 275 400',
      emergency: true,
      mentalHealth: true
    },
    {
      name: 'Hospital Universitario La Paz',
      address: 'Paseo de la Castellana, 261, 28046 Madrid',
      phone: '917 277 000',
      emergency: true,
      mentalHealth: true
    },
    {
      name: 'Hospital General Universitario de Valencia',
      address: 'Av. de Tres Cruces, 2, 46014 València',
      phone: '963 131 800',
      emergency: true,
      mentalHealth: true
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'moderate':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'primary':
        return 'bg-red-600 hover:bg-red-700';
      case 'emergency':
        return 'bg-orange-600 hover:bg-orange-700';
      case 'support':
        return 'bg-blue-600 hover:bg-blue-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <MainLayout title="Emergencias de Salud Mental">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-red-900 mb-4">
            Emergencias de Salud Mental
          </h1>
          <p className="text-xl text-red-800 max-w-3xl mx-auto mb-6">
            Si tú o alguien que conoces está en crisis de salud mental inmediata, 
            <strong> no esperes. Busca ayuda profesional ahora.</strong>
          </p>
          <div className="bg-red-600 text-white p-4 rounded-lg inline-block">
            <p className="text-lg font-semibold">
              🚨 En caso de emergencia inmediata, llama al <strong>112</strong> o <strong>024</strong>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Números de Emergencia
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyNumbers.map((emergency, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {emergency.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {emergency.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{emergency.availability}</span>
                    </div>
                  </div>
                </div>
                <a 
                  href={`tel:${emergency.number}`}
                  className={`w-full text-white py-3 px-6 rounded-lg font-bold text-xl text-center block transition-colors ${getTypeColor(emergency.type)}`}
                >
                  <Phone className="h-5 w-5 inline mr-2" />
                  {emergency.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Señales de Alarma
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {warningSigns.map((category, index) => (
              <div key={index} className={`rounded-lg p-6 border-l-4 ${getUrgencyColor(category.urgency)}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.signs.map((sign, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{sign}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-sm font-semibold">
                    Nivel de urgencia: 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      category.urgency === 'immediate' ? 'bg-red-100 text-red-800' :
                      category.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {category.urgency === 'immediate' ? 'INMEDIATA' :
                       category.urgency === 'high' ? 'ALTA' : 'MODERADA'}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Qué Hacer en Cada Situación?
          </h2>
          <div className="space-y-8">
            {immediateActions.map((situation, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  {situation.situation}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {situation.actions.map((action, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-sm text-gray-700">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hospitales con Urgencias Psiquiátricas
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {hospitals.map((hospital, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Hospital className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">{hospital.name}</h3>
                    <div className="flex items-center space-x-1 mt-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{hospital.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{hospital.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-700">Urgencias 24h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-purple-700">Salud Mental</span>
                  </div>
                </div>

                <a 
                  href={`tel:${hospital.phone}`}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-center block"
                >
                  Llamar Emergencias
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
              Chat de Crisis 24/7
            </h3>
            <p className="text-gray-600 mb-6">
              Si prefieres escribir en lugar de hablar, nuestro chat de crisis 
              está disponible las 24 horas con profesionales entrenados.
            </p>
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Iniciar Chat de Crisis
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="h-6 w-6 mr-2 text-green-600" />
              Apoyo para Familiares
            </h3>
            <p className="text-gray-600 mb-6">
              Si un ser querido está en crisis, también necesitas apoyo. 
              Contáctanos para orientación sobre cómo ayudar.
            </p>
            <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Orientación Familiar
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Prevención y Autocuidado
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Cuida tu Bienestar
              </h3>
              <p className="text-gray-600 text-sm">
                Mantén rutinas saludables, ejercítate regularmente y 
                mantén conexiones sociales significativas.
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Reconoce las Señales
              </h3>
              <p className="text-gray-600 text-sm">
                Aprende a identificar síntomas tempranos y 
                busca ayuda profesional antes de que empeoren.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Construye una Red de Apoyo
              </h3>
              <p className="text-gray-600 text-sm">
                Mantén contacto con familiares, amigos y profesionales 
                de la salud mental de confianza.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-lg shadow-lg p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Tu Vida es Valiosa
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Si estás pasando por un momento difícil, recuerda que no estás solo. 
            Hay ayuda disponible y las crisis son temporales. Tu vida tiene valor 
            y mereces apoyo y cuidado.
          </p>
          <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <a 
              href="tel:024"
              className="w-full sm:w-auto bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors block"
            >
              Llamar al 024 Ahora
            </a>
            <a 
              href="/help"
              className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors block"
            >
              Buscar Ayuda Profesional
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
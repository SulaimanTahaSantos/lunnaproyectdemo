"use client";
import MainLayout from '@/components/layout/MainLayout';
import { 
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Users,
  Shield,
  CreditCard,
  Video,
  Calendar,
  MessageCircle,
  CheckCircle,
  ExternalLink,
  Clock,
  Star
} from 'lucide-react';
import { useState } from 'react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'Todas las Preguntas', icon: HelpCircle },
    { id: 'getting-started', name: 'Primeros Pasos', icon: Users },
    { id: 'sessions', name: 'Sesiones y Citas', icon: Video },
    { id: 'billing', name: 'Facturación', icon: CreditCard },
    { id: 'privacy', name: 'Privacidad', icon: Shield },
    { id: 'technical', name: 'Técnico', icon: MessageCircle },
  ];

  const faqData = [
    {
      category: 'getting-started',
      question: '¿Cómo funciona la terapia online en Lunna?',
      answer: 'La terapia online en Lunna es tan efectiva como la presencial. Te conectas con terapeutas licenciados a través de videollamadas seguras desde la comodidad de tu hogar. Nuestros profesionales están especializados en diversas áreas de salud mental y utilizan técnicas basadas en evidencia científica.',
      popular: true
    },
    {
      category: 'getting-started', 
      question: '¿Cómo elijo el terapeuta adecuado para mí?',
      answer: 'Utilizamos un sistema de emparejamiento inteligente basado en tus necesidades, preferencias y objetivos terapéuticos. Puedes filtrar por especialidad, género, idioma, experiencia y enfoque terapéutico. También ofrecemos una sesión de consulta gratuita de 15 minutos para asegurar la compatibilidad.',
      popular: true
    },
    {
      category: 'getting-started',
      question: '¿Qué necesito para empezar?',
      answer: 'Solo necesitas: 1) Una conexión estable a internet, 2) Un dispositivo con cámara y micrófono (computadora, tablet o smartphone), 3) Crear tu cuenta y completar tu perfil de salud mental, 4) Reservar tu primera cita. Todo el proceso toma menos de 10 minutos.',
      popular: false
    },
    {
      category: 'getting-started',
      question: '¿La terapia online es tan efectiva como la presencial?',
      answer: 'Estudios científicos han demostrado que la terapia online es igual de efectiva que la presencial para la mayoría de condiciones de salud mental. Muchos pacientes reportan sentirse más cómodos y abiertos en su propio espacio, lo que puede incluso mejorar los resultados terapéuticos.',
      popular: false
    },
    {
      category: 'sessions',
      question: '¿Cómo me uno a una sesión de terapia?',
      answer: 'Es muy sencillo: 1) Recibirás un recordatorio por email y SMS 24 horas y 1 hora antes, 2) Haz clic en el enlace de la sesión desde tu cuenta, 3) Verifica tu audio y video, 4) Espera a que tu terapeuta se una. No necesitas descargar ningún software adicional.',
      popular: true
    },
    {
      category: 'sessions',
      question: '¿Puedo reagendar o cancelar mi cita?',
      answer: 'Sí, puedes reagendar o cancelar hasta 24 horas antes de tu cita sin costo alguno. Para cambios con menos de 24 horas de anticipación, se aplica una tarifa del 50%. Las cancelaciones con menos de 2 horas se cobran completas por respeto al tiempo del terapeuta.',
      popular: false
    },
    {
      category: 'sessions',
      question: '¿Qué pasa si tengo problemas técnicos durante la sesión?',
      answer: 'Tenemos soporte técnico en tiempo real disponible durante todas las sesiones. Si experimentas problemas, puedes: 1) Usar el chat de soporte integrado, 2) Llamar a nuestra línea técnica, 3) Reconectarte usando el enlace de respaldo. Si la sesión se interrumpe por más de 10 minutos, la reprogramamos sin costo.',
      popular: false
    },
    {
      category: 'sessions',
      question: '¿Cuánto dura una sesión típica?',
      answer: 'Las sesiones individuales duran 50 minutos, las de pareja 60 minutos, y las grupales 90 minutos. También ofrecemos sesiones intensivas de 80 minutos para casos específicos. Siempre incluimos 5 minutos adicionales de buffer para conectar y despedirse cómodamente.',
      popular: false
    },
    {
      category: 'billing',
      question: '¿Cuánto cuesta la terapia en Lunna?',
      answer: 'Sesiones individuales: €45-65 según el terapeuta. Sesiones de pareja: €70-85. Paquetes mensuales desde €160 (4 sesiones). Ofrecemos descuentos para estudiantes, desempleados y familias. También aceptamos algunos seguros médicos y tenemos opciones de financiamiento.',
      popular: true
    },
    {
      category: 'billing',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, transferencias bancarias, y Bizum. También ofrecemos planes de pago mensuales sin intereses para tratamientos a largo plazo. Todos los pagos son seguros y encriptados.',
      popular: false
    },
    {
      category: 'billing',
      question: '¿Puedo obtener un reembolso?',
      answer: 'Ofrecemos garantía de satisfacción en la primera sesión. Si no estás satisfecho, te devolvemos el 100% del dinero. Para sesiones subsecuentes, los reembolsos se evalúan caso por caso. Los paquetes no utilizados se reembolsan proporcionalmente.',
      popular: false
    },
    {
      category: 'billing',
      question: '¿Cubre mi seguro médico las sesiones?',
      answer: 'Trabajamos con varios seguros médicos incluidos Sanitas, Mapfre, DKV y Adeslas. Proporcionamos facturas oficiales para que puedas solicitar reembolsos a tu seguro. También ofrecemos certificados médicos cuando sea necesario. Consulta con tu aseguradora sobre cobertura de telemedicina.',
      popular: false
    },
    {
      category: 'privacy',
      question: '¿Qué tan segura es mi información personal?',
      answer: 'Tu privacidad es nuestra máxima prioridad. Cumplimos con GDPR, utilizamos encriptación de extremo a extremo, servidores seguros en Europa, y nuestros terapeutas están sujetos al secreto profesional. Nunca compartimos tu información sin tu consentimiento explícito.',
      popular: true
    },
    {
      category: 'privacy',
      question: '¿Graban las sesiones de terapia?',
      answer: 'No, nunca grabamos las sesiones sin tu consentimiento explícito. En casos específicos donde la grabación pueda ser terapéuticamente beneficiosa, tu terapeuta te lo proponderá y necesitará tu autorización por escrito. Tienes control total sobre tus datos.',
      popular: false
    },
    {
      category: 'privacy',
      question: '¿Pueden mis familiares acceder a mi información?',
      answer: 'No, tu información es completamente confidencial. Solo tú y tu terapeuta tienen acceso. Para menores de edad, los padres tienen acceso limitado según la ley. Si quieres compartir información con familiares, debes autorizar específicamente qué información y con quién.',
      popular: false
    },
    {
      category: 'technical',
      question: '¿Qué dispositivos son compatibles con Lunna?',
      answer: 'Lunna funciona en cualquier dispositivo moderno: computadoras (Windows, Mac, Linux), tablets y smartphones (iOS y Android). Recomendamos navegadores actualizados: Chrome, Firefox, Safari o Edge. También tenemos app nativa para móviles con funciones adicionales.',
      popular: false
    },
    {
      category: 'technical', 
      question: '¿Qué hago si no tengo buena conexión a internet?',
      answer: 'Para sesiones óptimas recomendamos mínimo 5 Mbps de descarga. Si tu conexión es limitada, ofrecemos: 1) Sesiones por teléfono, 2) Modo de baja calidad de video, 3) Chat de texto en tiempo real, 4) Sesiones asíncronas por mensajes. La terapia no debe depender de la tecnología.',
      popular: false
    },
    {
      category: 'technical',
      question: '¿Necesito descargar algún software especial?',
      answer: 'No necesitas descargar nada. Lunna funciona completamente en tu navegador web. Sin embargo, recomendamos nuestra app móvil gratuita que incluye funciones adicionales como recordatorios, ejercicios entre sesiones, y chat con tu terapeuta.',
      popular: false
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqData.filter(faq => faq.popular);

  return (
    <MainLayout title="Preguntas Frecuentes">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra respuestas rápidas a las preguntas más comunes sobre 
            nuestros servicios de terapia online y salud mental.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-700">Preguntas resueltas inmediatamente</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">&lt;2min</div>
              <div className="text-gray-700">Tiempo promedio de respuesta</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700">Centro de ayuda disponible</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            Preguntas Más Populares
          </h2>
          <div className="space-y-4">
            {popularFAQs.map((faq, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-start w-full text-left"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openFAQs.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFAQs.includes(index) && (
                  <div className="mt-4 pt-4 border-t border-yellow-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explorar por Categoría</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No encontramos resultados
              </h3>
              <p className="text-gray-600">
                Intenta con otros términos de búsqueda o selecciona una categoría diferente.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <button
                  onClick={() => toggleFAQ(index + popularFAQs.length)}
                  className="flex justify-between items-start w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openFAQs.includes(index + popularFAQs.length) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFAQs.includes(index + popularFAQs.length) && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="text-gray-600 mb-6">
                Nuestro equipo de soporte especializado en salud mental está disponible 
                para ayudarte con cualquier pregunta específica que tengas.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Respuesta garantizada en 2 horas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Soporte especializado en salud mental</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Disponible en español e inglés</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat con Soporte
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Centro de Ayuda
              </button>
              <div className="text-center text-sm text-gray-600">
                <Clock className="h-4 w-4 inline mr-1" />
                Disponible Lun-Vie 9:00-18:00
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="font-bold text-red-900 mb-2">
            ¿Experimentas una Crisis de Salud Mental?
          </h3>
          <p className="text-red-800 mb-4">
            Si tienes pensamientos de autolesión o necesitas ayuda inmediata, 
            no busques respuestas aquí. Contacta servicios de emergencia ahora.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Línea de Crisis 024
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ¿Estas preguntas frecuentes te fueron útiles?
          </h2>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Sí, muy útiles
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Necesito más ayuda
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
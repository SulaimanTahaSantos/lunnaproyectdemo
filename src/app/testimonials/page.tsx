import MainLayout from '@/components/layout/MainLayout';
import { Star, Quote, Heart, Users, CheckCircle, Play } from 'lucide-react';

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: 'María José',
      age: 28,
      location: 'Madrid',
      issue: 'Ansiedad y Estrés Laboral',
      therapist: 'Dr. Ana García',
      rating: 5,
      text: 'Después de meses de ansiedad constante por el trabajo, encontré en Lunna Platform el apoyo que necesitaba. Mi terapeuta me ayudó a desarrollar herramientas prácticas que uso todos los días. Ahora me siento mucho más tranquila y en control.',
      duration: '6 meses de terapia',
      verified: true,
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Carlos M.',
      age: 35,
      location: 'Barcelona',
      issue: 'Depresión',
      therapist: 'Dra. Laura Martín',
      rating: 5,
      text: 'La depresión me había alejado de todo lo que amaba. Gracias a las sesiones online, pude recibir ayuda sin salir de casa cuando más lo necesitaba. El proceso ha sido transformador, he recuperado la motivación y la alegría de vivir.',
      duration: '8 meses de terapia',
      verified: true,
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Elena y Pedro',
      age: '32 y 34',
      location: 'Valencia',
      issue: 'Terapia de Pareja',
      therapist: 'Dr. Miguel Torres',
      rating: 5,
      text: 'Nuestra relación pasaba por una crisis seria. La terapia de pareja online nos permitió trabajar nuestros conflictos de forma cómoda y privada. Aprendimos a comunicarnos mejor y nuestra relación es ahora más fuerte que nunca.',
      duration: '4 meses de terapia',
      verified: true,
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Sofía R.',
      age: 22,
      location: 'Sevilla',
      issue: 'Trastorno Alimentario',
      therapist: 'Dra. Isabel López',
      rating: 5,
      text: 'Luchaba con bulimia desde la adolescencia. Encontrar una especialista en trastornos alimentarios fue crucial. El apoyo constante y las técnicas que aprendí me han ayudado a recuperar una relación saludable con la comida y conmigo misma.',
      duration: '10 meses de terapia',
      verified: true,
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Roberto L.',
      age: 45,
      location: 'Bilbao',
      issue: 'Trauma y PTSD',
      therapist: 'Dr. David García',
      rating: 5,
      text: 'Después de un accidente laboral, desarrollé PTSD que afectaba toda mi vida. La terapia EMDR que recibí a través de la plataforma fue increíblemente efectiva. Ahora puedo hablar del evento sin que me paralice el miedo.',
      duration: '7 meses de terapia',
      verified: true,
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Carmen F.',
      age: 52,
      location: 'Zaragoza',
      issue: 'Duelo y Pérdida',
      therapist: 'Dra. Marta Jiménez',
      rating: 5,
      text: 'Perder a mi esposo me dejó completamente perdida. Mi terapeuta me ayudó a navegar el proceso de duelo con compasión y profesionalismo. Aunque el dolor sigue ahí, ahora tengo herramientas para seguir adelante y honrar su memoria.',
      duration: '5 meses de terapia',
      verified: true,
      image: '/api/placeholder/80/80'
    }
  ];

  const stats = [
    { number: '94%', label: 'Reportan mejora significativa' },
    { number: '4.8/5', label: 'Calificación promedio' },
    { number: '89%', label: 'Recomiendan nuestros servicios' },
    { number: '15,000+', label: 'Vidas transformadas' }
  ];

  const videoTestimonials = [
    {
      name: 'Andrea M.',
      issue: 'Ansiedad Social',
      duration: '3:45',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      name: 'Javier P.',
      issue: 'Depresión Mayor',
      duration: '4:12',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      name: 'Lucía y Marco',
      issue: 'Terapia de Pareja',
      duration: '5:20',
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <MainLayout title="Testimonios">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Historias de Transformación
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lee las experiencias reales de personas que han encontrado el 
            apoyo y las herramientas necesarias para mejorar su bienestar mental.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Testimonios Escritos
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-200" />
                
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      {testimonial.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {testimonial.age} años • {testimonial.location}
                    </p>
                    <p className="text-sm text-blue-600 font-semibold">
                      {testimonial.issue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-gray-200 pt-4 space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Terapeuta:</span> {testimonial.therapist}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Duración:</span> {testimonial.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Testimonios en Video
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="relative bg-gray-300 rounded-lg h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all">
                      <Play className="h-8 w-8 text-blue-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{video.name}</p>
                    <p className="text-sm opacity-90">{video.issue}</p>
                    <p className="text-xs opacity-75">{video.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              *Los videos incluyen testimonios de pacientes que han dado su consentimiento 
              para compartir su experiencia.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Resultados Comprobados
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mejora Clínica Significativa</h3>
                  <p className="text-gray-600">
                    94% de nuestros pacientes reportan una mejora significativa 
                    en sus síntomas después de 3 meses de terapia.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Alta Satisfacción</h3>
                  <p className="text-gray-600">
                    Calificación promedio de 4.8/5 estrellas basada en más 
                    de 15,000 evaluaciones de pacientes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Recomendación Activa</h3>
                  <p className="text-gray-600">
                    89% de nuestros pacientes recomiendan activamente 
                    Lunna Platform a familiares y amigos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para Escribir tu Historia de Éxito?
            </h3>
            <p className="mb-6 opacity-90">
              Miles de personas ya han transformado su vida con nuestra ayuda. 
              Tu historia de bienestar mental puede ser la siguiente.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Comenzar mi Terapia
              </button>
              <button className="w-full border border-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
                Consulta Gratuita
              </button>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Privacidad y Consentimiento
              </h3>
              <p className="text-yellow-700">
                Todos los testimonios han sido compartidos con el consentimiento explícito 
                de nuestros pacientes. Los nombres han sido modificados para proteger la 
                privacidad, excepto cuando se ha otorgado permiso específico. 
                Cumplimos estrictamente con las regulaciones de privacidad y confidencialidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
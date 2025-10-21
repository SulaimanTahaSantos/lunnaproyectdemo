'use client';

import MainLayout from '@/components/layout/MainLayout';
import { 
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Send,
  Upload,
  AlertCircle,
  CheckCircle,
  User,
  FileText,
  Calendar,
  Shield,
  ExternalLink,
  Star
} from 'lucide-react';
import { useState } from 'react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    priority: 'medium',
    subject: '',
    description: '',
    attachments: null as FileList | null
  });
  
  const [submitted, setSubmitted] = useState(false);

  const supportCategories = [
    'Problemas técnicos',
    'Facturación y pagos',
    'Reagendar citas',
    'Problemas con terapeuta',
    'Privacidad y seguridad', 
    'Sugerencias y feedback',
    'Otros'
  ];

  const contactMethods = [
    {
      method: 'Chat en Vivo',
      description: 'Habla con un especialista ahora mismo',
      availability: 'Lun-Vie 9:00-18:00, Sáb 10:00-14:00',
      responseTime: 'Inmediato',
      icon: MessageCircle,
      color: 'green',
      action: 'Iniciar Chat',
      available: true
    },
    {
      method: 'Teléfono',
      description: 'Llámanos para soporte urgente',
      availability: '692 866 417',
      responseTime: 'Inmediato',
      icon: Phone,
      color: 'blue',
      action: 'Llamar Ahora',
      available: true
    },
    {
      method: 'Email',
      description: 'Envíanos tu consulta detallada',
      availability: 'soporte@lunna.com',
      responseTime: 'Máximo 2 horas',
      icon: Mail,
      color: 'purple',
      action: 'Enviar Email',
      available: true
    },
    {
      method: 'Formulario',
      description: 'Completa el formulario detallado abajo',
      availability: 'Disponible 24/7',
      responseTime: 'Máximo 4 horas',
      icon: FileText,
      color: 'orange',
      action: 'Ir al Formulario',
      available: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      attachments: e.target.files
    }));
  };

  if (submitted) {
    return (
      <MainLayout title="Soporte">
        <div className="max-w-2xl mx-auto text-center space-y-6 py-16">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Mensaje Enviado Exitosamente!
          </h1>
          <p className="text-lg text-gray-600">
            Hemos recibido tu consulta y nuestro equipo de soporte se pondrá en contacto contigo 
            dentro de las próximas 4 horas durante horario laboral.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Número de Ticket: #LS-{Date.now().toString().slice(-6)}</h3>
            <p className="text-blue-800 text-sm">
              Guarda este número para referencias futuras. También recibirás un email de confirmación.
            </p>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Enviar Otra Consulta
            </button>
            <div>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                Ver Estado de Mi Ticket
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Contactar Soporte">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Contactar Soporte
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro equipo de soporte especializado en salud mental está aquí para ayudarte. 
            Elige el método de contacto que prefieras.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
              <div className="text-sm text-gray-600">Satisfacción del cliente</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">&lt;2h</div>
              <div className="text-sm text-gray-600">Tiempo de respuesta</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Disponibilidad</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-1">5★</div>
              <div className="text-sm text-gray-600">Calificación promedio</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Elige Cómo Contactarnos
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {contactMethods.map((contact, index) => {
              const colorClasses = {
                green: 'bg-green-50 border-green-200 text-green-700',
                blue: 'bg-blue-50 border-blue-200 text-blue-700',
                purple: 'bg-purple-50 border-purple-200 text-purple-700',
                orange: 'bg-orange-50 border-orange-200 text-orange-700'
              }[contact.color];

              const buttonClasses = {
                green: 'bg-green-600 hover:bg-green-700',
                blue: 'bg-blue-600 hover:bg-blue-700',
                purple: 'bg-purple-600 hover:bg-purple-700',
                orange: 'bg-orange-600 hover:bg-orange-700'
              }[contact.color];

              return (
                <div key={index} className={`${colorClasses} border-2 rounded-lg p-6`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <contact.icon className={`h-6 w-6 ${contact.color === 'green' ? 'text-green-600' : contact.color === 'blue' ? 'text-blue-600' : contact.color === 'purple' ? 'text-purple-600' : 'text-orange-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{contact.method}</h3>
                      <p className="text-gray-700 text-sm mb-3">{contact.description}</p>
                      <div className="space-y-1 text-xs text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>{contact.availability}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-3 w-3" />
                          <span>Respuesta: {contact.responseTime}</span>
                        </div>
                      </div>
                      <button className={`${buttonClasses} text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm w-full`}>
                        {contact.action}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-600" />
            Formulario de Soporte Detallado
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono (Opcional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona una categoría</option>
                  {supportCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prioridad
              </label>
              <div className="flex space-x-4">
                {['low', 'medium', 'high', 'urgent'].map((priority) => (
                  <label key={priority} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${
                      priority === 'urgent' ? 'text-red-600 font-semibold' : 
                      priority === 'high' ? 'text-orange-600' : 
                      priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {priority === 'low' ? 'Baja' : 
                       priority === 'medium' ? 'Media' : 
                       priority === 'high' ? 'Alta' : 'Urgente'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Asunto *
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Resumen breve de tu consulta"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción Detallada *
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Describe tu problema o consulta de manera detallada. Incluye pasos que realizaste, mensajes de error, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Archivos Adjuntos (Opcional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  name="attachments"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Arrastra archivos aquí o <span className="text-blue-600 font-semibold">haz clic para seleccionar</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, PDF, TXT, DOC (máximo 10MB)
                  </p>
                </label>
              </div>
              {formData.attachments && formData.attachments.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {formData.attachments.length} archivo(s) seleccionado(s)
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Tu privacidad está protegida</p>
                <p>
                  Toda la información que compartas está encriptada y solo será utilizada 
                  para resolver tu consulta. Nunca compartimos datos personales con terceros.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Consulta
              </button>
              <button
                type="button"
                className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Guardar Borrador
              </button>
            </div>
          </form>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-900 mb-2">
                ¿Es una Emergencia de Salud Mental?
              </h3>
              <p className="text-red-800 mb-4">
                Si estás experimentando una crisis emocional o tienes pensamientos de autolesión, 
                busca ayuda inmediata. No uses este formulario para emergencias.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Línea de Crisis 024
                </button>
                <button className="border border-red-300 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                  Servicios de Emergencia
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Lo Que Dicen Nuestros Usuarios
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                name: "María G.",
                feedback: "El soporte técnico me ayudó a resolver un problema de conexión en menos de 10 minutos. Excelente servicio.",
                rating: 5
              },
              {
                name: "Carlos R.", 
                feedback: "Tuve un problema con la facturación y me lo resolvieron el mismo día. Muy profesionales.",
                rating: 5
              },
              {
                name: "Ana L.",
                feedback: "El equipo de soporte es muy empático y comprende las necesidades de salud mental. Recomendado.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.feedback}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
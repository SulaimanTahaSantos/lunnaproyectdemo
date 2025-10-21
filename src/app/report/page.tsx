'use client';

import MainLayout from '@/components/layout/MainLayout';
import { 
  AlertTriangle,
  Shield,
  Eye,
  Users,
  MessageSquare,
  Lock,
  Phone,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
  Camera,
  ExternalLink,
  User
} from 'lucide-react';
import { useState } from 'react';

export default function ReportPage() {
  const [formData, setFormData] = useState({
    reportType: '',
    targetUser: '',
    reporterName: '',
    reporterEmail: '',
    incident: '',
    details: '',
    evidence: null as FileList | null,
    anonymous: false,
    urgency: 'medium'
  });
  
  const [submitted, setSubmitted] = useState(false);

  const reportTypes = [
    {
      id: 'harassment',
      title: 'Acoso o Intimidación',
      description: 'Comportamiento hostil, amenazas, o acoso hacia ti u otros usuarios',
      icon: Shield,
      color: 'red'
    },
    {
      id: 'inappropriate',
      title: 'Comportamiento Inapropiado',
      description: 'Conducta no profesional de un terapeuta o usuario',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      id: 'privacy',
      title: 'Violación de Privacidad',
      description: 'Compartir información personal sin consentimiento',
      icon: Lock,
      color: 'purple'
    },
    {
      id: 'content',
      title: 'Contenido Inapropiado',
      description: 'Material ofensivo, discriminatorio o inadecuado',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 'fraud',
      title: 'Fraude o Estafa',
      description: 'Actividades fraudulentas o intentos de estafa',
      icon: AlertCircle,
      color: 'red'
    },
    {
      id: 'technical',
      title: 'Problema Técnico Grave',
      description: 'Errores del sistema que afectan la seguridad o funcionalidad',
      icon: MessageSquare,
      color: 'gray'
    },
    {
      id: 'other',
      title: 'Otro Problema',
      description: 'Cualquier otra situación que requiera atención',
      icon: FileText,
      color: 'green'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      evidence: e.target.files
    }));
  };

  if (submitted) {
    return (
      <MainLayout title="Reporte Enviado">
        <div className="max-w-2xl mx-auto text-center space-y-6 py-16">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reporte Recibido
          </h1>
          <p className="text-lg text-gray-600">
            Gracias por reportar este problema. Tomamos muy en serio todos los reportes 
            y nuestro equipo de seguridad los revisará inmediatamente.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              Número de Caso: #SEC-{Date.now().toString().slice(-6)}
            </h3>
            <p className="text-blue-800 text-sm mb-3">
              Tu reporte está siendo procesado por nuestro equipo especializado.
            </p>
            <div className="text-xs text-blue-700">
              <p>• Reportes de acoso/seguridad: Respuesta en 1 hora</p>
              <p>• Problemas técnicos: Respuesta en 4 horas</p>
              <p>• Otros reportes: Respuesta en 24 horas</p>
            </div>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Hacer Otro Reporte
            </button>
            <div>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                Seguimiento del Caso
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Reportar Problema">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Reportar un Problema
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tu seguridad y bienestar son nuestra prioridad. Utiliza este formulario para 
            reportar cualquier problema, comportamiento inapropiado o violación de nuestras políticas.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">
                Información Confidencial y Segura
              </h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Todos los reportes son revisados por nuestro equipo especializado</li>
                <li>• Tu información está protegida y encriptada</li>
                <li>• Puedes reportar de forma anónima si lo prefieres</li>
                <li>• Tomamos medidas inmediatas en casos de seguridad</li>
                <li>• No toleramos represalias contra quienes reportan problemas</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ¿Qué tipo de problema quieres reportar?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {reportTypes.map((type) => {
              const colorClasses = {
                red: 'border-red-200 hover:border-red-300',
                orange: 'border-orange-200 hover:border-orange-300',
                purple: 'border-purple-200 hover:border-purple-300',
                blue: 'border-blue-200 hover:border-blue-300',
                gray: 'border-gray-200 hover:border-gray-300',
                green: 'border-green-200 hover:border-green-300'
              }[type.color];

              const iconColor = {
                red: 'text-red-600',
                orange: 'text-orange-600',
                purple: 'text-purple-600',
                blue: 'text-blue-600',
                gray: 'text-gray-600',
                green: 'text-green-600'
              }[type.color];

              const selectedClasses = formData.reportType === type.id ? 
                `${type.color === 'red' ? 'border-red-500 bg-red-50' : 
                  type.color === 'orange' ? 'border-orange-500 bg-orange-50' :
                  type.color === 'purple' ? 'border-purple-500 bg-purple-50' :
                  type.color === 'blue' ? 'border-blue-500 bg-blue-50' :
                  type.color === 'gray' ? 'border-gray-500 bg-gray-50' : 
                  'border-green-500 bg-green-50'}` : '';

              return (
                <label key={type.id} className={`cursor-pointer border-2 rounded-lg p-4 transition-all hover:shadow-md ${colorClasses} ${selectedClasses}`}>
                  <input
                    type="radio"
                    name="reportType"
                    value={type.id}
                    checked={formData.reportType === type.id}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="flex items-start space-x-3">
                    <type.icon className={`h-6 w-6 ${iconColor} flex-shrink-0 mt-0.5`} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{type.title}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {formData.reportType && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Detalles del Reporte
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">Reportar de forma anónima</span>
                    <p className="text-sm text-gray-600">
                      Tu identidad no será revelada, pero no podremos contactarte para seguimiento.
                    </p>
                  </div>
                </label>
              </div>

              {!formData.anonymous && (
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tu Nombre *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="reporterName"
                        required={!formData.anonymous}
                        value={formData.reporterName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tu Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="reporterEmail"
                        required={!formData.anonymous}
                        value={formData.reporterEmail}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Usuario o Contenido Involucrado
                </label>
                <input
                  type="text"
                  name="targetUser"
                  value={formData.targetUser}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nombre del usuario, ID de sesión, o URL del contenido"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Nivel de Urgencia
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { value: 'low', label: 'Baja', desc: 'No urgente', color: 'green' },
                    { value: 'medium', label: 'Media', desc: 'Requiere atención', color: 'yellow' },
                    { value: 'high', label: 'Alta', desc: 'Problema serio', color: 'orange' },
                    { value: 'critical', label: 'Crítica', desc: 'Emergencia', color: 'red' }
                  ].map((urgency) => (
                    <label key={urgency.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value={urgency.value}
                        checked={formData.urgency === urgency.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`border-2 rounded-lg p-3 text-center transition-all ${
                        formData.urgency === urgency.value 
                          ? `border-${urgency.color}-500 bg-${urgency.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className={`font-semibold ${
                          urgency.color === 'green' ? 'text-green-700' :
                          urgency.color === 'yellow' ? 'text-yellow-700' :
                          urgency.color === 'orange' ? 'text-orange-700' : 'text-red-700'
                        }`}>
                          {urgency.label}
                        </div>
                        <div className="text-xs text-gray-600">{urgency.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Resumen del Incidente *
                </label>
                <input
                  type="text"
                  name="incident"
                  required
                  value={formData.incident}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe brevemente qué ocurrió"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción Detallada *
                </label>
                <textarea
                  name="details"
                  required
                  value={formData.details}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Proporciona todos los detalles relevantes: fecha, hora, qué sucedió exactamente, quién estuvo involucrado, etc. Mientras más información proporciones, mejor podremos ayudarte."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Evidencia (Opcional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    name="evidence"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="evidence-upload"
                    accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,.mp3,.mp4"
                  />
                  <label htmlFor="evidence-upload" className="cursor-pointer">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      Sube capturas de pantalla, archivos de audio, documentos o cualquier evidencia
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Formatos: PNG, JPG, PDF, TXT, DOC, MP3, MP4 (máximo 50MB por archivo)
                    </p>
                  </label>
                </div>
                {formData.evidence && formData.evidence.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    {formData.evidence.length} archivo(s) seleccionado(s)
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Información Importante:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Los reportes falsos o maliciosos pueden resultar en suspensión de cuenta</li>
                      <li>Si es una emergencia médica, llama al 112 inmediatamente</li>
                      <li>Para crisis de salud mental, contacta la línea 024</li>
                      <li>Mantendremos tu reporte confidencial según nuestras políticas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Reporte
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
        )}

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">
            ¿Es una Emergencia?
          </h3>
          <p className="text-red-800 mb-4">
            Si estás en peligro inmediato o es una emergencia médica, 
            no uses este formulario. Contacta servicios de emergencia ahora.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <Phone className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="font-semibold text-red-900">Emergencias</div>
              <div className="text-red-700">112</div>
            </div>
            <div className="text-center">
              <Phone className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="font-semibold text-red-900">Crisis Mental</div>
              <div className="text-red-700">024</div>
            </div>
            <div className="text-center">
              <Mail className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="font-semibold text-red-900">Urgente</div>
              <div className="text-red-700">urgente@lunna.com</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recursos Adicionales
          </h2>
          <div className="flex justify-center space-x-4">
            <button className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              Políticas de Comunidad
            </button>
            <button className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              Centro de Seguridad
            </button>
            <button className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              Recursos de Crisis
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
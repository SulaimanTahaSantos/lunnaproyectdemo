'use client';

import MainLayout from '@/components/layout/MainLayout';
import { 
  FileCheck,
  Shield,
  Heart,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle,
  Eye,
  Lock,
  Phone,
  Video,
  MessageCircle,
  Download,
  Mail
} from 'lucide-react';
import { useState } from 'react';

export default function ConsentPage() {
  const lastUpdated = "10 de octubre de 2025";
  
  const [consentItems, setConsentItems] = useState({
    therapy: false,
    dataProcessing: false,
    communication: false,
    recording: false,
    emergencyContact: false,
    minorConsent: false
  });

  const consentSections = [
    {
      id: 'therapy',
      title: 'Consentimiento para Terapia Online',
      icon: Video,
      required: true,
      description: 'Entiendo y acepto recibir servicios de terapia psicológica a través de medios digitales.',
      details: [
        'La terapia online es tan efectiva como la presencial para la mayoría de condiciones',
        'Las sesiones se realizan por videollamada segura y encriptada',
        'Puedo solicitar sesiones presenciales si mi terapeuta lo considera necesario',
        'Los terapeutas están licenciados y colegiados en España',
        'Puedo finalizar la terapia en cualquier momento con previo aviso'
      ]
    },
    {
      id: 'dataProcessing',
      title: 'Procesamiento de Datos de Salud',
      icon: Shield,
      required: true,
      description: 'Autorizo el procesamiento de mi información de salud mental para fines terapéuticos.',
      details: [
        'Mis datos de salud serán utilizados únicamente para proporcionar tratamiento',
        'Solo mi terapeuta asignado tendrá acceso a mi historial clínico',
        'La información está protegida por secreto profesional',
        'Cumplimos con GDPR y normativas de protección de datos sanitarios',
        'Puedo solicitar acceso, rectificación o supresión de mis datos'
      ]
    },
    {
      id: 'communication',
      title: 'Comunicaciones y Recordatorios',
      icon: MessageCircle,
      required: false,
      description: 'Acepto recibir comunicaciones relacionadas con mi tratamiento y bienestar.',
      details: [
        'Recordatorios de citas por email y SMS',
        'Seguimiento post-sesión cuando sea terapéuticamente apropiado',
        'Recursos educativos y ejercicios entre sesiones',
        'Encuestas de satisfacción y evaluación de progreso',
        'Información sobre nuevos servicios relevantes para mi tratamiento'
      ]
    },
    {
      id: 'recording',
      title: 'Grabación de Sesiones (Opcional)',
      icon: Eye,
      required: false,
      description: 'Autorizo la grabación de sesiones para fines terapéuticos específicos.',
      details: [
        'Las grabaciones solo se realizan con mi consentimiento explícito',
        'Se utilizan únicamente para revisión terapéutica y supervisión',
        'Están encriptadas y almacenadas de forma segura',
        'Se eliminan según cronograma establecido (máximo 1 año)',
        'Puedo retirar este consentimiento en cualquier momento'
      ]
    },
    {
      id: 'emergencyContact',
      title: 'Protocolo de Emergencias',
      icon: Phone,
      required: true,
      description: 'Entiendo el protocolo de actuación en situaciones de crisis o emergencia.',
      details: [
        'En crisis inmediata, debo contactar servicios de emergencia (112)',
        'Para crisis de salud mental, está disponible la línea 024',
        'Mi terapeuta puede contactar servicios de emergencia si estoy en peligro',
        'Puedo proporcionar contactos de emergencia familiares',
        'La plataforma no sustituye atención de emergencia presencial'
      ]
    },
    {
      id: 'minorConsent',
      title: 'Consentimiento para Menores (si aplica)',
      icon: Users,
      required: false,
      description: 'Consentimiento específico para tratamiento de menores de edad.',
      details: [
        'Menores 14-18 años requieren consentimiento parental',
        'Sesiones pueden incluir supervisión parental según el caso',
        'Se respeta la confidencialidad apropiada para la edad',
        'Los padres tienen derecho a información relevante sobre el tratamiento',
        'El menor puede expresar preferencias sobre la participación parental'
      ]
    }
  ];

  const informedConsentPoints = [
    {
      title: 'Naturaleza de la Terapia Online',
      content: 'La terapia online utiliza tecnología de comunicación para proporcionar servicios psicológicos a distancia. Aunque es efectiva, pueden existir limitaciones comparado con la terapia presencial.'
    },
    {
      title: 'Beneficios Esperados',
      content: 'La terapia puede ayudar a mejorar su bienestar emocional, desarrollar habilidades de afrontamiento, resolver problemas específicos y alcanzar sus objetivos terapéuticos.'
    },
    {
      title: 'Riesgos y Limitaciones',
      content: 'Como cualquier tratamiento, la terapia puede implicar recordar eventos difíciles o experimentar emociones intensas. Los riesgos específicos se discutirán con su terapeuta.'
    },
    {
      title: 'Alternativas Disponibles',
      content: 'Existen alternativas como terapia presencial, grupos de apoyo, o diferentes enfoques terapéuticos. Su terapeuta discutirá las opciones más apropiadas para su situación.'
    },
    {
      title: 'Confidencialidad',
      content: 'Sus sesiones y registros están protegidos por el secreto profesional. Existen excepciones limitadas por ley en casos de riesgo para usted o terceros.'
    },
    {
      title: 'Duración y Costos',
      content: 'La duración del tratamiento varía según sus necesidades. Los costos se discutirán claramente, incluyendo políticas de cancelación y métodos de pago.'
    }
  ];

  const handleConsentChange = (itemId: string) => {
    setConsentItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId as keyof typeof prev]
    }));
  };

  const allRequiredConsented = () => {
    const requiredItems = consentSections.filter(item => item.required).map(item => item.id);
    return requiredItems.every(id => consentItems[id as keyof typeof consentItems]);
  };

  const submitConsent = () => {
    if (!allRequiredConsented()) {
      alert('Debe aceptar todos los elementos requeridos para continuar.');
      return;
    }
    alert('Consentimiento informado registrado correctamente.');
  };

  return (
    <MainLayout title="Consentimiento Informado">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <FileCheck className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Consentimiento Informado
          </h1>
          <p className="text-xl text-gray-600">
            Información importante sobre su tratamiento y derechos como paciente
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-2 text-blue-800">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-semibold">Última actualización: {lastUpdated}</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
            <Heart className="h-6 w-6 mr-3" />
            Su Bienestar es Nuestra Prioridad
          </h2>
          <p className="text-green-800 mb-4">
            Este documento de consentimiento informado le proporciona información importante 
            sobre los servicios de terapia online que recibirá a través de Lunna Platform. 
            Por favor, léalo cuidadosamente y haga las preguntas que considere necesarias.
          </p>
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Principios Fundamentales:</h3>
            <ul className="text-green-800 text-sm space-y-1">
              <li>✓ Su consentimiento es voluntario y puede retirarlo en cualquier momento</li>
              <li>✓ Tiene derecho a hacer preguntas sobre cualquier aspecto de su tratamiento</li>
              <li>✓ Su privacidad y confidencialidad están completamente protegidas</li>
              <li>✓ Participará activamente en las decisiones sobre su tratamiento</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Información sobre el Tratamiento
          </h2>
          
          <div className="grid gap-6">
            {informedConsentPoints.map((point, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{point.title}</h3>
                <p className="text-gray-700">{point.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Consentimientos Específicos
          </h2>
          
          <div className="space-y-6">
            {consentSections.map((section) => {
              const isChecked = consentItems[section.id as keyof typeof consentItems];
              const colorClasses = section.required 
                ? 'border-red-200 bg-red-50' 
                : 'border-blue-200 bg-blue-50';
              
              return (
                <div key={section.id} className={`border rounded-lg p-6 ${colorClasses}`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border">
                      <section.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                        {section.required && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                            Requerido
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-700 mb-4">{section.description}</p>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Detalles:</h4>
                        <ul className="space-y-2">
                          {section.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleConsentChange(section.id)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`font-semibold ${isChecked ? 'text-green-700' : 'text-gray-700'}`}>
                          {section.required ? 'Acepto y entiendo' : 'Acepto (opcional)'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            Sus Derechos como Paciente
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-purple-900">Derechos Fundamentales:</h3>
              <ul className="space-y-2 text-purple-800 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Recibir información clara sobre su diagnóstico y tratamiento</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Participar en las decisiones sobre su cuidado</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Solicitar una segunda opinión profesional</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Interrumpir el tratamiento en cualquier momento</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Acceder a su historial clínico</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-purple-900">Derechos de Privacidad:</h3>
              <ul className="space-y-2 text-purple-800 text-sm">
                <li className="flex items-start space-x-2">
                  <Lock className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Confidencialidad absoluta de sus datos y sesiones</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Lock className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Control sobre quién puede acceder a su información</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Lock className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Derecho a solicitar corrección de datos inexactos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Lock className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Derecho al olvido y eliminación de datos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Lock className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Portabilidad de su información médica</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3" />
            Información Importante de Seguridad
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white border border-yellow-200 rounded-lg p-4">
              <h3 className="font-bold text-yellow-900 mb-2">Limitaciones de la Terapia Online:</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• No está disponible para emergencias psiquiátricas agudas</li>
                <li>• Puede tener limitaciones técnicas ocasionales</li>
                <li>• Algunos trastornos pueden requerir evaluación presencial</li>
                <li>• La confidencialidad depende de su entorno privado durante la sesión</li>
              </ul>
            </div>
            
            <div className="bg-white border border-yellow-200 rounded-lg p-4">
              <h3 className="font-bold text-yellow-900 mb-2">Cuándo Contactar Servicios de Emergencia:</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Si tiene pensamientos de hacerse daño a usted mismo o a otros</li>
                <li>• Si experimenta síntomas psicóticos agudos</li>
                <li>• En caso de crisis de pánico severa o descompensación aguda</li>
                <li>• Si se encuentra en situación de peligro inmediato</li>
              </ul>
            </div>
            
            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
              <h3 className="font-bold text-red-900 mb-2">Números de Emergencia:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-red-900">Emergencias Generales:</strong>
                  <div className="text-red-800">112</div>
                </div>
                <div>
                  <strong className="text-red-900">Línea de Atención al Suicidio:</strong>
                  <div className="text-red-800">024 (24 horas)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Confirmación de Consentimiento
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Resumen de sus Consentimientos:</h3>
            <div className="grid gap-3">
              {consentSections.map((section) => {
                const isChecked = consentItems[section.id as keyof typeof consentItems];
                return (
                  <div key={section.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-sm text-gray-700">{section.title}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      isChecked 
                        ? 'bg-green-100 text-green-800' 
                        : section.required 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isChecked ? 'Aceptado' : section.required ? 'Requerido' : 'No seleccionado'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {!allRequiredConsented() && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                Debe aceptar todos los elementos requeridos para proceder con el tratamiento.
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={submitConsent}
              disabled={!allRequiredConsented()}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                allRequiredConsented()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FileCheck className="h-4 w-4 mr-2" />
              Confirmar Consentimiento
            </button>
            
            <button className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Descargar Copia
            </button>
          </div>
          
          <p className="text-xs text-gray-600 mt-4 text-center">
            Al confirmar, acepta que ha leído, entendido y está de acuerdo con toda la información 
            proporcionada. Puede retirar su consentimiento en cualquier momento.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            ¿Preguntas sobre el Consentimiento Informado?
          </h2>
          <p className="text-blue-800 mb-6">
            Si tiene dudas sobre cualquier aspecto de su tratamiento o estos consentimientos, 
            no dude en contactarnos antes de proceder.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900 mb-1">Email</h3>
              <p className="text-sm text-blue-700">consentimiento@lunna.com</p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900 mb-1">Teléfono</h3>
              <p className="text-sm text-blue-700">692 866 417</p>
            </div>
            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900 mb-1">Chat</h3>
              <p className="text-sm text-blue-700">Disponible 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
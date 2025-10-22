'use client';

import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import { 
  User, 
  Settings, 
  Camera, 
  Mail, 
  Edit,
  Save,
  X,
  Shield,
  Bell,
  Calendar,
  Check,
  AlertCircle,
  Upload,
  Trash2
} from 'lucide-react';
import Image from 'next/image';

interface PersonalInfo {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<PersonalInfo>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: user?.name || '',
    email: user?.email || ''
  });

  const [profileImage, setProfileImage] = useState<string>(
    user?.image || '/api/placeholder/150/150'
  );

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        name: user.name,
        email: user.email
      });
      setProfileImage(user.image || '/api/placeholder/150/150');
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof PersonalInfo]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PersonalInfo> = {};

    if (!personalInfo.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!personalInfo.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await api.put('/auth/me', {
        name: personalInfo.name,
        email: personalInfo.email,
        image: profileImage
      });
      
      const updatedUser = response.data.user;
      
      updateUser(updatedUser);

      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      
      // Mostrar mensaje de error específico del servidor
      let errorMessage = 'Error al actualizar el perfil';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 409) {
        errorMessage = 'Este email ya está en uso';
      } else if (error.response?.status === 400) {
        errorMessage = 'Datos inválidos';
      }
      
      // Aquí podrías mostrar un toast de error
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setPersonalInfo({
        name: user.name,
        email: user.email
      });
      setProfileImage(user.image || '/api/placeholder/150/150');
    }
    setErrors({});
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setProfileImage('/api/placeholder/150/150');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!user) {
    return (
      <MainLayout title="Perfil">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error de Autenticación
            </h2>
            <p className="text-gray-600">
              No se pudo cargar la información del usuario.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Mi Perfil">
      <div className="max-w-4xl mx-auto space-y-8">
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <Check className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Perfil actualizado correctamente
            </span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                <p className="text-gray-600">Gestiona tu información personal y configuración</p>
              </div>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Editar Perfil</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancelar</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isLoading ? 'Guardando...' : 'Guardar'}</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                <Image
                  src={profileImage}
                  alt="Foto de perfil"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {personalInfo.name || 'Usuario'}
              </h2>
              <p className="text-gray-600 mb-4">
                {user.role === 'USER' ? 'Paciente' : 
                 user.role === 'THERAPIST' ? 'Terapeuta' : 
                 user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
              </p>
              
              {isEditing && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">Cambiar foto</span>
                  </button>
                  <button
                    onClick={handleImageRemove}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="text-sm">Eliminar</span>
                  </button>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-blue-600" />
            Información Personal
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre Completo *
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ingresa tu nombre completo"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3 py-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{personalInfo.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3 py-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{personalInfo.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            Información de la Cuenta
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Cuenta
              </label>
              <div className="flex items-center space-x-3 py-3">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-gray-900">
                  {user.role === 'USER' ? 'Paciente' : 
                   user.role === 'THERAPIST' ? 'Terapeuta' : 
                   user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Acciones Rápidas
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <Bell className="h-5 w-5 text-blue-600" />
              <span className="text-gray-900">Configurar Notificaciones</span>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-gray-900">Privacidad y Seguridad</span>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <Settings className="h-5 w-5 text-purple-600" />
              <span className="text-gray-900">Configuración Avanzada</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
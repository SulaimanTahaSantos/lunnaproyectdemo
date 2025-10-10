'use client';

import { useState, useEffect } from 'react';
import { X, Clock, Info } from 'lucide-react';

interface LoginSuccessAlertProps {
  onClose: () => void;
}

export default function LoginSuccessAlert({ onClose }: LoginSuccessAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg shadow-lg max-w-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-blue-800">
              ¡Sesión iniciada correctamente!
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  En <strong>24 horas</strong> se cerrará tu sesión y tendrás que iniciar sesión nuevamente.
                </span>
              </div>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className="bg-blue-50 rounded-md inline-flex text-blue-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
            >
              <span className="sr-only">Cerrar</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
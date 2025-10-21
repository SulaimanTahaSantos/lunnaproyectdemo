'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

interface ToastState {
  toasts: Toast[];
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  success: (title: string, message?: string, options?: Partial<Toast>) => void;
  error: (title: string, message?: string, options?: Partial<Toast>) => void;
  warning: (title: string, message?: string, options?: Partial<Toast>) => void;
  info: (title: string, message?: string, options?: Partial<Toast>) => void;
}

type ToastAction = 
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'CLEAR_ALL_TOASTS' };

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
    case 'CLEAR_ALL_TOASTS':
      return {
        ...state,
        toasts: []
      };
    default:
      return state;
  }
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export function ToastProvider({ 
  children, 
  position = 'top-right',
  maxToasts = 5 
}: ToastProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const newToast: Toast = {
      ...toast,
      id: generateId(),
      duration: toast.duration ?? (toast.type === 'error' ? 6000 : 4000)
    };

    dispatch({ type: 'ADD_TOAST', payload: newToast });

    if (state.toasts.length >= maxToasts) {
      const oldestToast = state.toasts[0];
      if (oldestToast && !oldestToast.persistent) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_TOAST', payload: oldestToast.id });
        }, 100);
      }
    }

    if (!newToast.persistent && newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: newToast.id });
      }, newToast.duration);
    }
  };

  const removeToast = (id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };

  const clearAllToasts = () => {
    dispatch({ type: 'CLEAR_ALL_TOASTS' });
  };

  const success = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ type: 'success', title, message, ...options });
  };

  const error = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ type: 'error', title, message, ...options });
  };

  const warning = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ type: 'warning', title, message, ...options });
  };

  const info = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ type: 'info', title, message, ...options });
  };

  const value: ToastContextType = {
    toasts: state.toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer position={position} />
    </ToastContext.Provider>
  );
}

// Hook
export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const iconMap = {
    success: CheckCircle,
    error: AlertTriangle,
    warning: AlertCircle,
    info: Info
  };

  const colorMap = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconColorMap = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  };

  const IconComponent = iconMap[toast.type];

  return (
    <div className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-300 ease-in-out ${colorMap[toast.type]}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <IconComponent className={`h-6 w-6 ${iconColorMap[toast.type]}`} />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">
              {toast.title}
            </p>
            {toast.message && (
              <p className="mt-1 text-sm opacity-90">
                {toast.message}
              </p>
            )}
            {toast.action && (
              <div className="mt-3">
                <button
                  onClick={toast.action.onClick}
                  className="bg-white rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 px-3 py-2 border transition-colors"
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => onRemove(toast.id)}
              className="rounded-md inline-flex hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 p-2 transition-colors"
            >
              <span className="sr-only">Cerrar</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {!toast.persistent && toast.duration && (
        <div className="h-1 bg-black bg-opacity-10">
          <div 
            className="h-full bg-current opacity-30 animate-[shrink_var(--duration)_linear_forwards]"
            style={{ 
              '--duration': `${toast.duration}ms`,
              animationName: 'toast-progress'
            } as any}
          />
        </div>
      )}
    </div>
  );
}

interface ToastContainerProps {
  position: ToastPosition;
}

function ToastContainer({ position }: ToastContainerProps) {
  const { toasts, removeToast } = useToast();

  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2'
  };

  if (toasts.length === 0) return null;

  return (
    <>
      <style jsx>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
      
      <div
        aria-live="assertive"
        className={`fixed z-50 flex flex-col space-y-4 p-6 pointer-events-none ${positionClasses[position]} ${
          position.includes('bottom') ? 'flex-col-reverse' : ''
        }`}
        style={{ maxWidth: '420px' }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-in slide-in-from-right-full duration-300 ease-out"
          >
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </>
  );
}
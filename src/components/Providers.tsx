'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginSuccessAlert from '@/components/auth/LoginSuccessAlert';
import { ReactNode, useState } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

function AlertsComponent() {
  const { showLoginAlert, hideLoginAlert } = useAuth();

  return (
    <>
      {showLoginAlert && (
        <LoginSuccessAlert onClose={hideLoginAlert} />
      )}
    </>
  );
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, 
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <AlertsComponent />
      </AuthProvider>
    </QueryClientProvider>
  );
}
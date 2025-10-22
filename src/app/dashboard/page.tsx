'use client';

import { useAuth } from '@/contexts/AuthContext';
import PrivateRoute from '@/components/auth/PrivateRoute';
import MainLayout from '@/components/layout/MainLayout';
import { Role } from '@/types';
import PatientDashboard from '@/components/dashboard/PatientDashboard';
import TherapistDashboard from '@/components/dashboard/TherapistDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

function DashboardContent() {
  const { user } = useAuth();
  
  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case Role.USER:
        return <PatientDashboard />;
      
      case Role.THERAPIST:
        return <TherapistDashboard />;
      
      case Role.ADMIN:
        return <AdminDashboard />;
      
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600">Dashboard no disponible para este rol</p>
          </div>
        );
    }
  };

  return (
    <MainLayout title="Dashboard">
      {renderDashboard()}
    </MainLayout>
  );
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
  );
}
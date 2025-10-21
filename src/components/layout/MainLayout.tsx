'use client';

import { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showSidebar?: boolean;
  showFooter?: boolean;
  className?: string;
}

export default function MainLayout({
  children,
  title,
  showSidebar = true,
  showFooter = true,
  className = ''
}: MainLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        title={title}
        onMenuToggle={toggleMobileSidebar}
        showMenuButton={showSidebar}
      />

      <div className="flex flex-1">
        {showSidebar && (
          <>
            <div className="hidden md:flex">
              <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebar}
                className="h-[calc(100vh-4rem)] sticky top-16"
              />
            </div>

            {isMobileSidebarOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                  onClick={toggleMobileSidebar}
                />
                <div className="fixed left-0 top-16 bottom-0 w-64 z-50 md:hidden">
                  <Sidebar
                    isCollapsed={false}
                    onToggle={toggleMobileSidebar}
                    className="h-full"
                  />
                </div>
              </>
            )}
          </>
        )}

        <main className={`flex-1 ${className}`}>
          <div className="p-6 min-h-[calc(100vh-8rem)]">
            {children}
          </div>
        </main>
      </div>

      {showFooter && <Footer />}
    </div>
  );
}
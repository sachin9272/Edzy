'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/QueryProvider';
import { AppProvider } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import OrderModal from '@/components/OrderModal';
import CreateStudentForm from '@/components/CreateStudentForm';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AppProvider>
        <Sidebar />
        <main className="ml-[260px] min-h-screen py-8 px-10 max-md:ml-0 max-md:pt-[72px] max-md:px-5 max-md:pb-6 max-sm:pt-[68px] max-sm:px-4 max-sm:pb-5">
          {children}
        </main>
        <OrderModal />
        <CreateStudentForm />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(20, 20, 35, 0.95)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
              fontSize: '14px',
            },
          }}
        />
      </AppProvider>
    </QueryProvider>
  );
}

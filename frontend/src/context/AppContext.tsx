'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Order } from '@/types';

interface AppState {
  recentOrders: Order[];
  orderModalOpen: boolean;
  selectedSnackId: string | null;
  createStudentModalOpen: boolean;
  createSnackModalOpen: boolean;
}

interface AppContextType extends AppState {
  addRecentOrder: (order: Order) => void;
  openOrderModal: (snackId: string) => void;
  closeOrderModal: () => void;
  openCreateStudentModal: () => void;
  closeCreateStudentModal: () => void;
  openCreateSnackModal: () => void;
  closeCreateSnackModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const RECENT_ORDERS_KEY = 'canteen-recent-orders';

export function AppProvider({ children }: { children: ReactNode }) {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedSnackId, setSelectedSnackId] = useState<string | null>(null);
  const [createStudentModalOpen, setCreateStudentModalOpen] = useState(false);
  const [createSnackModalOpen, setCreateSnackModalOpen] = useState(false);

  // Load recent orders from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_ORDERS_KEY);
      if (stored) {
        setRecentOrders(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const addRecentOrder = useCallback((order: Order) => {
    setRecentOrders((prev) => {
      const updated = [order, ...prev].slice(0, 20); // keep last 20
      localStorage.setItem(RECENT_ORDERS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const openOrderModal = useCallback((snackId: string) => {
    setSelectedSnackId(snackId);
    setOrderModalOpen(true);
  }, []);

  const closeOrderModal = useCallback(() => {
    setOrderModalOpen(false);
    setSelectedSnackId(null);
  }, []);

  const openCreateStudentModal = useCallback(() => {
    setCreateStudentModalOpen(true);
  }, []);

  const closeCreateStudentModal = useCallback(() => {
    setCreateStudentModalOpen(false);
  }, []);

  const openCreateSnackModal = useCallback(() => {
    setCreateSnackModalOpen(true);
  }, []);

  const closeCreateSnackModal = useCallback(() => {
    setCreateSnackModalOpen(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        recentOrders,
        orderModalOpen,
        selectedSnackId,
        createStudentModalOpen,
        createSnackModalOpen,
        addRecentOrder,
        openOrderModal,
        closeOrderModal,
        openCreateStudentModal,
        closeCreateStudentModal,
        openCreateSnackModal,
        closeCreateSnackModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

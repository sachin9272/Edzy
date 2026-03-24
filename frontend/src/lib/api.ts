import { Snack, Student, CreateStudentPayload, CreateOrderPayload, Order, StudentDetailResponse } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// Snacks
export const getSnacks = (): Promise<Snack[]> => fetchJSON('/snacks');

// Students
export const getStudents = (): Promise<Student[]> => fetchJSON('/students');

export const getStudentById = (id: string): Promise<StudentDetailResponse> =>
  fetchJSON(`/students/${id}`);

export const createStudent = (data: CreateStudentPayload): Promise<Student> =>
  fetchJSON('/students', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// Orders
export const createOrder = (data: CreateOrderPayload): Promise<Order> =>
  fetchJSON('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });

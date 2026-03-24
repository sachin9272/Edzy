export interface Snack {
  _id: string;
  name: string;
  price: number;
  ordersCount: number;
}

export interface Student {
  _id: string;
  name: string;
  referralCode: string;
  totalSpent: number;
  createdAt?: string;
}

export interface Order {
  _id: string;
  student: string | Student;
  snack: string | { _id: string; name: string; price: number };
  quantity: number;
  payableAmount: number;
  createdAt: string;
}

export interface CreateStudentPayload {
  name: string;
}

export interface CreateOrderPayload {
  studentId: string;
  snackId: string;
  quantity: number;
}

export interface StudentDetailResponse {
  student: Student;
  orders: Order[];
}

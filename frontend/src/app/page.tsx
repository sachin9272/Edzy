'use client';

import { useQuery } from '@tanstack/react-query';
import { getSnacks, getStudents } from '@/lib/api';
import { useAppContext } from '@/context/AppContext';
import { UtensilsCrossed, Users, ShoppingCart, Clock } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DashboardPage() {
  const { recentOrders } = useAppContext();

  const { data: snacks = [], isLoading: loadingSnacks } = useQuery({
    queryKey: ['snacks'],
    queryFn: getSnacks,
  });

  const { data: students = [], isLoading: loadingStudents } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  });

  if (loadingSnacks || loadingStudents) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  const totalOrders = snacks.reduce((sum, s) => sum + s.ordersCount, 0);
  const totalRevenue = students.reduce((sum, s) => sum + s.totalSpent, 0);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Dashboard</h1>
        <p className="text-base text-white/60 m-0">Welcome to the School Canteen ordering system</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 mb-10 max-md:grid-cols-2 max-sm:grid-cols-1">
        <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
            <UtensilsCrossed size={22} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold leading-tight m-0">{snacks.length}</h3>
            <p className="text-sm text-white/60 m-0">Available Snacks</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa' }}>
            <Users size={22} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold leading-tight m-0">{students.length}</h3>
            <p className="text-sm text-white/60 m-0">Registered Students</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>
            <ShoppingCart size={22} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold leading-tight m-0">{totalOrders}</h3>
            <p className="text-sm text-white/60 m-0">Total Orders</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}>
            <span style={{ fontSize: '18px', fontWeight: 700 }}>₹</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold leading-tight m-0">₹{totalRevenue}</h3>
            <p className="text-sm text-white/60 m-0">Total Revenue</p>
          </div>
        </div>
      </div>

      {recentOrders.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-5 flex items-center">
            <Clock size={18} className="inline-block align-middle mr-2" />
            Recent Orders (Local)
          </h2>
          <div className="w-full overflow-x-auto rounded-tl-xl rounded-tr-xl border border-white/10">
            <table className="w-full border-collapse text-left bg-white/5">
              <thead>
                <tr>
                  <th className="p-4 border-b border-white/10 text-white/60 font-medium text-sm">Snack</th>
                  <th className="p-4 border-b border-white/10 text-white/60 font-medium text-sm">Quantity</th>
                  <th className="p-4 border-b border-white/10 text-white/60 font-medium text-sm">Amount</th>
                  <th className="p-4 border-b border-white/10 text-white/60 font-medium text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 10).map((order) => (
                  <tr key={order._id} className="transition-colors hover:bg-white/5 border-b border-white/5 last:border-0">
                    <td className="p-4 text-sm">{typeof order.snack === 'object' ? order.snack.name : 'N/A'}</td>
                    <td className="p-4 text-sm">{order.quantity}</td>
                    <td className="p-4 text-sm text-purple-400 font-semibold">₹{order.payableAmount}</td>
                    <td className="p-4 text-sm text-white/80">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

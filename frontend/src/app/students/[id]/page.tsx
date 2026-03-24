'use client';

import { useQuery } from '@tanstack/react-query';
import { getStudentById, getSnacks } from '@/lib/api';
import { useAppContext } from '@/context/AppContext';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorState from '@/components/ErrorState';
import { Hash, Wallet, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StudentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { openOrderModal } = useAppContext();

  const { data: snacks = [] } = useQuery({
    queryKey: ['snacks'],
    queryFn: getSnacks,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['student', id],
    queryFn: () => getStudentById(id),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner message="Loading student details..." />;
  if (isError || !data) return <ErrorState message="Failed to load student" onRetry={() => refetch()} />;

  const { student, orders } = data;

  const handleNewOrder = () => {
    if (snacks.length > 0) {
      openOrderModal(snacks[0]._id);
    }
  };

  return (
    <>
      <Link href="/students" className="inline-flex items-center gap-1.5 text-white/40 text-sm mb-5 transition-colors hover:text-white">
        <ArrowLeft size={16} />
        Back to Students
      </Link>

      <div className="flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-2xl mb-10 max-md:flex-col max-md:text-center max-md:gap-4 max-md:p-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-3xl font-bold shrink-0 shadow-[0_8px_24px_rgba(99,102,241,0.25)]">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-3 m-0 tracking-tight">{student.name}</h2>
          <div className="flex items-center gap-4 flex-wrap max-md:justify-center">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white/60">
              <Hash size={14} />
              <strong>{student.referralCode}</strong>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white/60">
              <Wallet size={14} />
              Total Spent: <strong>₹{student.totalSpent}</strong>
            </span>
          </div>
        </div>
        <button 
          className="h-[44px] px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 max-sm:w-full max-sm:justify-center" 
          onClick={handleNewOrder}
        >
          <ShoppingCart size={16} />
          New Order
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-5 flex items-center">Order History ({orders.length})</h2>

        {orders.length === 0 ? (
          <div className="text-center p-12 text-white/60 bg-white/5 border border-white/10 rounded-xl mt-8">No orders yet for this student.</div>
        ) : (
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
                {orders.map((order) => (
                  <tr key={order._id} className="transition-colors hover:bg-white/5 border-b border-white/5 last:border-0">
                    <td className="p-4 text-sm font-medium text-white">
                      {typeof order.snack === 'object' ? order.snack.name : 'Unknown'}
                    </td>
                    <td className="p-4 text-sm">{order.quantity}</td>
                    <td className="p-4 text-sm text-purple-400 font-semibold">₹{order.payableAmount}</td>
                    <td className="p-4 text-sm text-white/80">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

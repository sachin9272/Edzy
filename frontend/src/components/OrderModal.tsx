'use client';

import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudents, createOrder } from '@/lib/api';
import { useAppContext } from '@/context/AppContext';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface OrderFormData {
  studentId: string;
  quantity: number;
}

export default function OrderModal() {
  const { orderModalOpen, selectedSnackId, closeOrderModal, addRecentOrder } = useAppContext();
  const queryClient = useQueryClient();

  const { data: students = [], isLoading: loadingStudents } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
    enabled: orderModalOpen,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<OrderFormData>({
    defaultValues: { quantity: 1 },
  });

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      addRecentOrder(order);
      queryClient.invalidateQueries({ queryKey: ['snacks'] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Order placed successfully! 🎉');
      reset();
      closeOrderModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to place order');
    },
  });

  const onSubmit = (data: OrderFormData) => {
    if (!selectedSnackId) return;
    mutation.mutate({
      studentId: data.studentId,
      snackId: selectedSnackId,
      quantity: Number(data.quantity),
    });
  };

  if (!orderModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-[8px] flex items-center justify-center z-[1000] animate-fade-in-overlay max-sm:items-end"
      onClick={closeOrderModal}
    >
      <div
        className="bg-[rgba(20,20,35,0.98)] border border-white/10 rounded-3xl w-[90%] max-w-[440px] p-7 animate-slide-up max-sm:w-full max-sm:max-w-full max-sm:rounded-t-[20px] max-sm:rounded-b-none max-sm:px-5 max-sm:py-6 max-sm:pb-[calc(20px+env(safe-area-inset-bottom,0px))] max-sm:animate-slide-up-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white max-sm:text-lg">Place Order</h2>
          <button
            aria-label="Close Order Modal"
            className="w-9 h-9 flex items-center justify-center border-none rounded-[10px] bg-white/6 text-white/50 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:text-white"
            onClick={closeOrderModal}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-white/60 uppercase tracking-wider">Student</label>
            {loadingStudents ? (
              <p className="text-sm text-white/40 py-3">Loading students...</p>
            ) : students.length === 0 ? (
              <p className="text-sm text-white/40 py-3">No students found. Create one first.</p>
            ) : (
              <select
                className="py-3 px-4 border border-white/10 rounded-xl bg-white/4 text-white text-[15px] cursor-pointer transition-colors duration-200 appearance-none focus:outline-none focus:border-accent/50 max-sm:py-3.5 max-sm:text-base max-sm:min-h-12"
                {...register('studentId', { required: 'Please select a student' })}
              >
                <option value="">Select a student...</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.referralCode})
                  </option>
                ))}
              </select>
            )}
            {errors.studentId && <span className="text-xs text-danger">{errors.studentId.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-white/60 uppercase tracking-wider">Quantity (1-5)</label>
            <select
              className="py-3 px-4 border border-white/10 rounded-xl bg-white/4 text-white text-[15px] cursor-pointer transition-colors duration-200 appearance-none focus:outline-none focus:border-accent/50 max-sm:py-3.5 max-sm:text-base max-sm:min-h-12"
              {...register('quantity', {
                required: 'Please select quantity',
                min: { value: 1, message: 'Minimum 1' },
                max: { value: 5, message: 'Maximum 5' },
              })}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {errors.quantity && <span className="text-xs text-danger">{errors.quantity.message}</span>}
          </div>

          <button
            type="submit"
            className="py-3.5 border-none rounded-xl bg-gradient-to-br from-accent to-accent-purple text-white text-[15px] font-semibold cursor-pointer transition-all duration-250 mt-1 disabled:opacity-50 disabled:cursor-not-allowed max-sm:py-4 max-sm:text-base max-sm:min-h-12"
            disabled={mutation.isPending || students.length === 0}
          >
            {mutation.isPending ? 'Placing Order...' : 'Confirm Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

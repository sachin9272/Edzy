'use client';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSnack } from '@/lib/api';
import { useAppContext } from '@/context/AppContext';
import { X, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface SnackFormData {
  name: string;
  price: number;
}

export default function CreateSnackForm() {
  const { createSnackModalOpen, closeCreateSnackModal } = useAppContext();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SnackFormData>();

  const mutation = useMutation({
    mutationFn: createSnack,
    onSuccess: (snack) => {
      queryClient.invalidateQueries({ queryKey: ['snacks'] });
      toast.success(`Snack "${snack.name}" added successfully!`);
      reset();
      closeCreateSnackModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add snack');
    },
  });

  const onSubmit = (data: SnackFormData) => {
    mutation.mutate({
      name: data.name.trim(),
      price: Number(data.price),
    });
  };

  if (!createSnackModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-[8px] flex items-center justify-center z-[1000] animate-fade-in-overlay max-sm:items-end"
      onClick={closeCreateSnackModal}
    >
      <div
        className="bg-[rgba(20,20,35,0.98)] border border-white/10 rounded-3xl w-[90%] max-w-[440px] p-7 animate-slide-up max-sm:w-full max-sm:max-w-full max-sm:rounded-t-[20px] max-sm:rounded-b-none max-sm:px-5 max-sm:py-6 max-sm:pb-[calc(20px+env(safe-area-inset-bottom,0px))] max-sm:animate-slide-up-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5 text-accent-light">
            <PlusCircle size={20} />
            <h2 className="text-xl font-bold text-white max-sm:text-lg">Add New Snack</h2>
          </div>
          <button
            aria-label="Close Add Snack Modal"
            className="w-9 h-9 flex items-center justify-center border-none rounded-[10px] bg-white/6 text-white/50 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:text-white"
            onClick={closeCreateSnackModal}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-white/60 uppercase tracking-wider">Snack Name</label>
            <input
              type="text"
              placeholder="Enter snack name..."
              className="py-3 px-4 border border-white/10 rounded-xl bg-white/4 text-white text-[15px] transition-colors duration-200 focus:outline-none focus:border-accent/50 placeholder:text-white/25 max-sm:py-3.5 max-sm:text-base max-sm:min-h-12"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                maxLength: { value: 50, message: 'Name must be under 50 characters' },
              })}
            />
            {errors.name && <span className="text-xs text-danger">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-white/60 uppercase tracking-wider">Price(₹)</label>
            <input
              type="number"
              placeholder="Enter price..."
              className="py-3 px-4 border border-white/10 rounded-xl bg-white/4 text-white text-[15px] transition-colors duration-200 focus:outline-none focus:border-accent/50 placeholder:text-white/25 max-sm:py-3.5 max-sm:text-base max-sm:min-h-12"
              {...register('price', {
                required: 'Price is required',
                min: { value: 1, message: 'Price must be greater than 0' },
                valueAsNumber: true,
              })}
            />
            {errors.price && <span className="text-xs text-danger">{errors.price.message}</span>}
          </div>

          <button
            type="submit"
            className="py-3.5 border-none rounded-xl bg-gradient-to-br from-accent to-accent-purple text-white text-[15px] font-semibold cursor-pointer transition-all duration-250 mt-1 disabled:opacity-50 disabled:cursor-not-allowed max-sm:py-4 max-sm:text-base max-sm:min-h-12"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Adding...' : 'Add Snack'}
          </button>
        </form>
      </div>
    </div>
  );
}

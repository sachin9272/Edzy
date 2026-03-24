'use client';

import { useQuery } from '@tanstack/react-query';
import { getSnacks } from '@/lib/api';
import { useAppContext } from '@/context/AppContext';
import SnackCard from '@/components/SnackCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorState from '@/components/ErrorState';

export default function SnacksPage() {
  const { openOrderModal } = useAppContext();

  const { data: snacks = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['snacks'],
    queryFn: getSnacks,
  });

  if (isLoading) return <LoadingSpinner message="Loading snacks..." />;
  if (isError) return <ErrorState message="Failed to load snacks" onRetry={() => refetch()} />;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">🍕 Snacks Menu</h1>
        <p className="text-base text-white/60 m-0">Browse available snacks and place your order</p>
      </div>

      {snacks.length === 0 ? (
        <div className="text-center p-12 text-white/60 bg-white/5 border border-white/10 rounded-xl mt-8">No snacks available yet.</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {snacks.map((snack) => (
            <SnackCard key={snack._id} snack={snack} onOrder={openOrderModal} />
          ))}
        </div>
      )}
    </>
  );
}

'use client';

import { useQuery } from '@tanstack/react-query';
import { getStudents } from '@/lib/api';
import { useAppContext } from '@/context/AppContext';
import StudentListItem from '@/components/StudentListItem';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorState from '@/components/ErrorState';
import { UserPlus } from 'lucide-react';

export default function StudentsPage() {
  const { openCreateStudentModal } = useAppContext();

  const { data: students = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  });

  if (isLoading) return <LoadingSpinner message="Loading students..." />;
  if (isError) return <ErrorState message="Failed to load students" onRetry={() => refetch()} />;

  return (
    <>
      <div className="flex justify-between items-end mb-8 max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <div>
          <h1 className="text-3xl font-bold m-0 tracking-tight">👨‍🎓 Students</h1>
          <p className="text-[15px] text-white/35 mt-1 m-0">
            {students.length} student{students.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        <button 
          className="h-[44px] px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 max-sm:w-full max-sm:justify-center" 
          onClick={openCreateStudentModal}
        >
          <UserPlus size={18} />
          Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <div className="text-center p-12 text-white/60 bg-white/5 border border-white/10 rounded-xl mt-8">No students yet. Add your first student!</div>
      ) : (
        <div className="flex flex-col gap-3">
          {students.map((student) => (
            <StudentListItem key={student._id} student={student} />
          ))}
        </div>
      )}
    </>
  );
}

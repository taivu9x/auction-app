import Head from 'next/head';
import { AuthProvider } from '@/packages/common/hooks/useAuth';
import AdminLayout from '@/packages/layout/AdminLayout';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import router from 'next/router';
import { depositApi } from '@/packages/rest/private/users';

export default function DepositPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await depositApi(data);
    setIsSubmitting(true);
    setIsSubmitting(false);

    router.push('/');
  };

  return (
    <AuthProvider>
      <AdminLayout>
        <div className='bg-white p-6 rounded-lg w-6/12 m-auto'>
          <h2 className='text-lg font-medium mb-6'>Create Item</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label htmlFor='amount' className='block font-medium mb-2'>
                Amount
              </label>
              <input
                type='number'
                id='amount'
                placeholder='Amount'
                className={`border border-gray-300 rounded-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50 ${
                  errors.amount ? 'border-red-500' : ''
                } w-full`}
                {...register('amount', {
                  required: true,
                  min: 0,
                })}
              />
              {errors.amount && <p className='text-red-500 mt-2'>Please enter a price</p>}
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-indigo-600 text-white px-4 py-2 rounded-lg'>
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AuthProvider>
  );
}

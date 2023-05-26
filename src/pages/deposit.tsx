import Head from 'next/head';
import { AuthProvider } from '@/packages/common/hooks/useAuth';
import AdminLayout from '@/packages/layout/AdminLayout';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import router from 'next/router';
import { depositApi } from '@/packages/rest/private/users';
import { Form } from '@/common/headless/Form';

export default function DepositPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm();
  const {
    register,
    formState: { errors },
  } = methods;

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
          <Form methods={methods} onSubmit={onSubmit}>
            <Form.Input
              className='mb-4'
              label='Amount'
              name='amount'
              type='number'
              placeholder='Amount'
              rules={{
                required: {
                  value: true,
                  message: 'Please enter a price',
                },
                min: {
                  value: 0,
                  message: 'Please enter a price greater than 0',
                },
              }}
            />
            <Form.ErrorMessage name='amount' />
            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-indigo-600 text-white px-4 py-2 rounded-lg'>
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </Form>
        </div>
      </AdminLayout>
    </AuthProvider>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider, useAuth } from '@/packages/common/hooks/useAuth';
import { loginApi } from '@/packages/rest/public/auth';
import { LocalStorageUtils } from '@/packages/common/utils';
import { Auth } from '@/packages/common/types/auth';
import { ACCESS_TOKEN_KEY } from '@/env/constants';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { isAuth, login } = useAuth();

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
  }, [router, isAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await loginApi({ email, password });
    if (response) {
      LocalStorageUtils.set(ACCESS_TOKEN_KEY, response.token);
      login(response.user as Auth, response.token);
      router.push('/');
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <AuthProvider>
      <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-3'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Log in to your account
            </h2>
          </div>
          {errorMessage && (
            <div
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
              role='alert'>
              <span className='block sm:inline'>{errorMessage}</span>
            </div>
          )}
          <form className='space-y-3' onSubmit={handleSubmit}>
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <svg
                    className='h-5 w-5 text-blue-500 group-hover:text-blue-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'>
                    <path
                      fillRule='evenodd'
                      d='M10.158 1.034c.48-.468 1.261-.468 1.742 0l7.417 7.2c.961.933.28 2.565-1.147 2.565H13v5.8c0 .745-.607 1.352-1.352 1.352H8.352A1.352 1.352 0 017 16.6v-5.8H3.787c-1.427 0-2.108-1.632-1.147-2.565l7.418-7.2z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>

          <div className='text-sm text-center mt-3'>
            <a href='register' className='font-medium text-blue-600 hover:text-blue-500'>
              Register
            </a>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Login;

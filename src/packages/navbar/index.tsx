import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../common/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 container'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <Image className='h-8 w-auto' src='https://jitera.com/images/logo.svg' alt='Logo' />
          </div>
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center md:ml-6'>
              <div className='ml-3 relative'>
                <div>
                  <button
                    className='w-8 h-8 bg-white rounded-full  text-black focus:outline-none focus:ring-2 hover:ring-offset-2 hover:ring-offset-gray-800 hover:ring-white'
                    id='user-menu'
                    aria-label='User menu'
                    aria-haspopup='true'
                    onClick={() => setIsOpen(!isOpen)}>
                    A
                  </button>
                </div>
                {isOpen && (
                  <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg'>
                    <div className='py-1 bg-white rounded-md shadow-xs'>
                      <Link
                        href='/item'
                        className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                        Create New Item
                      </Link>
                      <Link
                        href='/deposit'
                        className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                        Deposit
                      </Link>
                      <Link
                        onClick={logout}
                        className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        href={''}>
                        Sign out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            <button
              className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
              aria-label='Toggle menu'>
              <svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

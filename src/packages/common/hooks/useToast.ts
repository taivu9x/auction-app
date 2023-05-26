import { useEffect } from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export function useToast() {
  const toastError = (message: string, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
  };
  const toastSuccess = (message: string, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
  };
  const toastInfo = (message: string, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
  };
  const toastWarn = (message: string, options: ToastOptions = {}) => {
    toast.warn(message, { ...defaultOptions, ...options });
  };

  return {
    toastError,
    toastSuccess,
    toastInfo,
    toastWarn,
  };
}

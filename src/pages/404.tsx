const ErrorPage = () => {
  return (
    <div className='flex h-screen overflow-hidden items-center justify-center'>
      <div className='relative flex items-center justify-center flex-col'>
        <img src='/images/404-error.svg' alt='error-image' />
        <span className='text-h2 font-bold my-6'>
          The page you are looking for cannot be found.
        </span>
        <span>
          The page you tried to access may have been deleted, changed, or is currently unavailable.
        </span>
        <span>Please search for it from the top of the admin page.</span>
      </div>
    </div>
  );
};

export default ErrorPage;

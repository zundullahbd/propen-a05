import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
      <div className='bg-gray-100 w-full h-screen flex items-center justify-center'>
        <div className='w-screen'>
        {children}
        </div>
      </div>
  );
}
export default AuthLayout;

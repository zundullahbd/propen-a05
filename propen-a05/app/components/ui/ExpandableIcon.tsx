// ExpandableIcon.tsx
'use client'
import React, { useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { signOut } from 'next-auth/react'; // Import signOut from next-auth/react
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

const ExpandableIcon: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const router = useRouter(); // Initialize the router

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  // Add the logout function
  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = '/sign-in'; // Redirect to the home page
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center justify-center p-2 rounded-ful">
        <div className='text-white-800'> <AccountCircleOutlinedIcon fontSize='medium'/></div>
      </button>
      {isExpanded && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-800 hover:bg-indigo-100 cursor-pointer" role="menuitem">Log Out</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableIcon;
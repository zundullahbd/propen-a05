// navbar.tsx
import Image from 'next/image';
import ExpandableIcon from './ExpandableIcon';
import Link from 'next/link';

const Navbar = () => {

  return (
    <div className="flex items-center justify-between h-fit px-7 py-6 shadow-md w-full bg-white relative z-90">
      <Link href="/dashboard">
      <Image src="/logo best price.jpg" alt="Logo" width={100} height={50}/>
      </Link>
      <div className='flex justify-end items-center'>
        <ExpandableIcon />
      </div>
    </div>
  );
};

export default Navbar;
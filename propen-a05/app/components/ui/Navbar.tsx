// navbar.tsx
import Image from 'next/image';
import ExpandableIcon from './ExpandableIcon';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className="flex items-center justify-between h-fit px-7 py-6 shadow-md w-full bg-white relative z-90">
      <Link href="/home">
      <Image src="/logo best price.jpg" alt="Logo" width={100} height={50}/>
      </Link>
      <div className='flex justify-end items-center'>
        <div className='flex items-center space-x-2000 font-bold'>{session?.user.username}</div>
        <ExpandableIcon />
      </div>
    </div>
  );
};

export default Navbar;
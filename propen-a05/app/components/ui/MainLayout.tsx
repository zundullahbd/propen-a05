// components/Sidebar.js
'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathName = usePathname();
    console.log(pathName);
    const [activePage, setActivePage] = useState('/dashboard'); // Set initial active page
    const router = useRouter(); // Use useRouter hook
  
    const handlePageClick = (path: string, e: React.MouseEvent) => {
      e.preventDefault(); // Prevent default link action
      router.push(path); // Programmatically navigate
    };

    useEffect(() => {
        setActivePage(pathName);
    }, [pathName]);
  return (
    <div className="h-screen w-full bg-gray-100 position-absolute overflow-clip flex-wrap">
        {/*Navbar*/}
        <div className='flex resize-none w-full h-full'>
            {/* Sidebar */}
            <nav className="flex flex-col p-4 w-60 bg-white h-full space-y-3 text-sm flex-shrink-0">
                <Link href="/dashboard" onClick={(e) => handlePageClick('/dashboard', e)}>
                    <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/dashboard' ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'} : ''}`} >
                        <Image src="/dashboard.svg" alt="Dashboard" width={20} height={20}/>
                        <span className="ml-3">Dashboard</span>
                    </div>
                </Link>
                <Link href="/tickets" onClick={(e) => handlePageClick('/tickets', e)}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/tickets' ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'} : ''}`} >
                <Image src="/complaint management.svg" alt="Complaint Management" width={20} height={20}/>
                        <span className="ml-3">Complaint Management</span>
                    </div>
                </Link>
                <Link href="/products" onClick={(e) => handlePageClick('/products', e)}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/products' ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'} : ''}`} >
                <Image src="/package.svg" alt="Products" width={20} height={20}/>
                        <span className="ml-3">Products</span>
                    </div>
                </Link>
                <Link href="/productsales" onClick={(e) => handlePageClick('/productsales', e)}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/productsales' ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'} : ''}`} >
                <Image src="/product sales.svg" alt="Product Sales" width={20} height={20}/>
                        <span className="ml-3">Product Sales</span>
                    </div>
                </Link>
                <Link href="/brands" onClick={(e) => handlePageClick('/brands', e)}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/brands' ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'} : ''}`} >
                <Image src="/brands.svg" alt="Brands" width={20} height={20}/>
                        <span className="ml-3">Brands</span>
                    </div>
                </Link>
                <Link href="/users" onClick={(e) => handlePageClick('/users', e)}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage ==='/users' ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'} : ''}`} >
                <Image src="/user management.svg" alt="User Management" width={20} height={20}/>
                        <span className="ml-3">User Management</span>
                    </div>
                </Link>
                <Link href="/customers" onClick={(e) => handlePageClick('/customers', e)}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/customers' ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'} : ''}`} >
                        <Image src="/customers.svg" alt="Customers" width={20} height={20}/>
                        <span className="ml-3">Customers</span>
                    </div>
                </Link>
                <Link href="/articles" onClick={(e) => handlePageClick('/articles', e)}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/knowledgebase' ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'} : ''}`} >
                    <Image src="/knowledge base.svg" alt="FAQ & Article" width={20} height={20}/>
                    <span className="ml-3">FAQ & Article</span>
                    </div>
                </Link>
                <Link href="/knowledgebase" onClick={(e) => handlePageClick('/knowledgebase', e)}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/knowledgebase' ? 'bg-indigo-100 font-bold' : 'hover:bg-indigo-100'} : ''}`} >
                    <Image src="/knowledge base.svg" alt="Knowledge Base" width={20} height={20}/>
                    <span className="ml-3">Knowledge Base</span>
                    </div>
                </Link>
                <div className="flex items-center p-20 ">
                    <span className="ml-1">V1.0.0</span>
                </div>
            </nav>
            
            <div className="flex-grow overflow-y-auto p-4">
                {children}
            </div>
        </div>
    </div>
  );
};

export default MainLayout;
// components/Sidebar.js
'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExpandableIcon from "@/app/components/ui/ExpandableIcon";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState('/dashboard'); // Set initial active page

  const handlePageClick = (path: string) => {
    setActivePage(path);
  };

  return (
    <div className="h-screen w-full bg-gray-100 overflow-hidden">

        {/*Navbar*/}

        <div className='flex h-full w-full'>
            {/* Sidebar */}
            <nav className="flex flex-col p-4 w-60 bg-white h-full space-y-3 text-sm">
                <Link href="/dashboard" onClick={() => handlePageClick('/dashboard')}>
                    <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/dashboard' ? 'font-bold' : ''}`} >
                        <Image src="/dashboard.svg" alt="Dashboard" width={20} height={20}/>
                        <span className="ml-3">Dashboard</span>
                    </div>
                </Link>
                <Link href="/tickets" onClick={() => handlePageClick('/tickets')}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/tickets' ? 'font-bold' : ''}`} >
                <Image src="/complaint management.svg" alt="Complaint Management" width={20} height={20}/>
                        <span className="ml-3">Complaint Management</span>
                    </div>
                </Link>
                <Link href="/products" onClick={() => handlePageClick('/products')}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/products' ? 'font-bold' : ''}`} >
                <Image src="/package.svg" alt="Products" width={20} height={20}/>
                        <span className="ml-3">Products</span>
                    </div>
                </Link>
                <Link href="/productsales" onClick={() => handlePageClick('/productsales')}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/productsales' ? 'font-bold' : ''}`} >
                <Image src="/product sales.svg" alt="Product Sales" width={20} height={20}/>
                        <span className="ml-3">Product Sales</span>
                    </div>
                </Link>
                <Link href="/brands" onClick={() => handlePageClick('/brands')}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/brands' ? 'font-bold' : ''}`} >
                <Image src="/brands.svg" alt="Brands" width={20} height={20}/>
                        <span className="ml-3">Brands</span>
                    </div>
                </Link>
                <Link href="/account" onClick={() => handlePageClick('/account')}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage ==='/account' ? 'font-bold' : ''}`} >
                <Image src="/user management.svg" alt="User Management" width={20} height={20}/>
                        <span className="ml-3">User Management</span>
                    </div>
                </Link>
                <Link href="/customers" onClick={() => handlePageClick('/customers')}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/customers' ? 'font-bold' : ''}`} >
                        <Image src="/customers.svg" alt="Customers" width={20} height={20}/>
                        <span className="ml-3">Customers</span>
                    </div>
                </Link>
                <Link href="/knowledgebase" onClick={() => handlePageClick('/knowledgebase')}>
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${activePage === '/knowledgebase' ? 'font-bold' : ''}`} >
                    <Image src="/knowledge base.svg" alt="Knowledge Base" width={20} height={20}/>
                    <span className="ml-3">Knowledge Base</span>
                    </div>
                </Link>
            </nav>
            
            <div className="grow overflow-y-auto">
                {children}
            </div>
        </div>
    </div>
  );
};

export default MainLayout;
// components/Sidebar.js
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExpandableIcon from "@/app/components/ui/ExpandableIcon";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAtDashboard = window.location.pathname === '/dashboard';
  const isAtComplaintManagement = window.location.pathname === '/tickets';
  const isAtProducts = window.location.pathname === '/products';
  const isAtProductSales = window.location.pathname === '/productsales';
  const isAtBrands = window.location.pathname === '/brands';
  const isAtUserManagement = window.location.pathname === '/usermanagement';
  const isAtCustomers = window.location.pathname === '/customers';
  const isAtKnowledgeBase = window.location.pathname === '/knowledgebase';

  return (
    <div className="h-screen w-full bg-gray-100 overflow-hidden">

        {/*Navbar*/}

        <div className='flex h-full w-full'>
            {/* Sidebar */}
            <nav className="flex flex-col p-4 w-60 bg-white h-full space-y-3 text-sm">
                <Link href="/dashboard">
                    {/* <div className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg" > */}
                    <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${isAtDashboard ? 'font-bold' : ''}`} >
                        <Image src="/dashboard.svg" alt="Dashboard" width={20} height={20}/>
                        <span className="ml-3">Dashboard</span>
                    </div>
                </Link>
                <Link href="/tickets">
                {/* <div className="flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg"> */}
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${isAtComplaintManagement ? 'font-bold' : ''}`} >
                <Image src="/complaint management.svg" alt="Complaint Management" width={20} height={20}/>
                        <span className="ml-3">Complaint Management</span>
                    </div>
                </Link>
                <Link href="/products">
                {/* <div className="flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg"> */}
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${isAtProducts ? 'font-bold' : ''}`} >
                <Image src="/package.svg" alt="Products" width={20} height={20}/>
                        <span className="ml-3">Products</span>
                    </div>
                </Link>
                <Link href="/productsales">
                {/* <div className="flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg"> */}
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${isAtProductSales ? 'font-bold' : ''}`} >
                <Image src="/product sales.svg" alt="Product Sales" width={20} height={20}/>
                        <span className="ml-3">Product Sales</span>
                    </div>
                </Link>
                <Link href="/brands">
                {/* <div className="flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg"> */}
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${isAtBrands ? 'font-bold' : ''}`} >
                <Image src="/brands.svg" alt="Brands" width={20} height={20}/>
                        <span className="ml-3">Brands</span>
                    </div>
                </Link>
                <Link href="/usermanagement">
                {/* <div className="flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg"> */}
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${isAtUserManagement ? 'font-bold' : ''}`} >
                <Image src="/user management.svg" alt="User Management" width={20} height={20}/>
                        <span className="ml-3">User Management</span>
                    </div>
                </Link>
                <Link href="/customers">
                {/* <div className="flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg"> */}
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${isAtCustomers ? 'font-bold' : ''}`} >
                        <Image src="/customers.svg" alt="Customers" width={20} height={20}/>
                        <span className="ml-3">Customers</span>
                    </div>
                </Link>
                <Link href="/knowledgebase">
                {/* <div className="flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg"> */}
                <div className={`flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded-lg ${isAtKnowledgeBase ? 'font-bold' : ''}`} >
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
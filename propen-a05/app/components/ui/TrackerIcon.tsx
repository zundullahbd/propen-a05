import React from 'react'

import { cn } from '@/lib/utils';
import { formatDateTime } from '@/app/tickets/page';

interface TrackerIconProps {
    icon: React.ReactElement;
    label: string;
    isActive: boolean;
    date: string;
}

const TrackerIcon = ({ icon, label, isActive = false, date }: TrackerIconProps) => {
    return (
        <div className='flex flex-col space-y-3 items-center text-[#344054]'>
            <div className={cn("rounded-full p-5 border-[3px] items-center justify-center w-min", isActive ? "border-[#3D3FDF] text-[#3D3FDF]" : "border-[#98A2B3] text-[#98A2B3]")}>
                {icon}
            </div>
            <h2 className='font-medium'>{label}</h2>
            <p className='text-sm text-[#98A2B3]'>{formatDateTime(new Date(date))}</p>
        </div>
    )
}

export default TrackerIcon
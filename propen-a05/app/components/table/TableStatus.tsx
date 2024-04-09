import React from 'react'

enum StatusColor {
    "Submitted" = 'bg-[#E0EAFF] text-[#344054]',
    "Reviewed" = 'bg-[#FFBE46] text-[#344054]',
    "In Progress" = 'bg-[#3D3FDF] text-[#FFFFFF]',
    "Resolved" = 'bg-[#32D583] text-[#344054]',
    "Closed" = 'bg-[#344054] text-[#FFFFFF]',
}

interface TableStatusProps {
    status: String;
}

const TableStatus = ({status}: TableStatusProps) => {
    const color = StatusColor [status as keyof typeof StatusColor];
  return (
    <div className={`py-[6px] ${color} text-center px-2 rounded-lg font-medium`}>{status}</div>
  )
}

export default TableStatus
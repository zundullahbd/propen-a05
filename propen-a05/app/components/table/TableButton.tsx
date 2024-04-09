import React from 'react'

interface TableButtonProps {
    label: string;
    onClick: () => void;
    borderColor: string;
    textColor: string;
}

const TableButton = ({label, onClick, borderColor, textColor}: TableButtonProps) => {
  return (
    <button className={`py-[6px] border font-medium text-sm ${borderColor} ${textColor} rounded-lg px-4`} onClick={onClick}>{label}</button>
  )
}

export default TableButton
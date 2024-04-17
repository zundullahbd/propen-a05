import React from 'react';
import Link from 'next/link';

interface TableButtonProps {
  identifier: number;
  label: string;
  borderColor: string;
  textColor: string;
}

const TableButton = ({ identifier, label, borderColor, textColor }: TableButtonProps) => {
  return (
      <Link href={`/tickets/${identifier}`}>
          <button className={`bg-white bg-out; py-[6px] outline outline-gray-100 text-center px-2 rounded-lg font-medium ${borderColor} ${textColor}`}>
          {label}
        </button>
      </Link>

  );
};

export default TableButton;




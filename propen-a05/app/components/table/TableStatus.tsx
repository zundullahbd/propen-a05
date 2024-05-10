import React from 'react';

enum StatusColor {
	'Terbuka' = 'bg-[#E0EAFF] text-[#344054]',
	'Dalam Proses BestPrice' = 'bg-[#FFBE46] text-[#344054]',
	'Dalam Proses 3rd Party' = 'bg-[#3D3FDF] text-[#FFFFFF]',
	'Selesai' = 'bg-[#32D583] text-[#344054]',
	'Dibatalkan' = 'bg-[#344054] text-[#FFFFFF]',
	'Disabled/Active User' = 'bg-[#ff3333] text-[#FFFFFF]',
}

interface TableStatusProps {
	status: String;
}

const TableStatus = ({ status }: TableStatusProps) => {
	const color = StatusColor[status as keyof typeof StatusColor];
	return <div className={`py-2 ${color} text-center px-0 rounded-lg font-medium`}>{status}</div>;
};

export default TableStatus;
import React from 'react';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps {
	text: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick, className }) => {
	return (
		<button
			className={cn(
				'text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2',
				className
			)}
			onClick={onClick}>
			<span>{text}</span>
		</button>
	);
};

export default PrimaryButton;

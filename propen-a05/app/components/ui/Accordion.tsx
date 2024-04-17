'use client';
import { useState, FunctionComponent, ReactNode } from 'react';

type AccordionItemProps = {
  title: string;
  children: ReactNode;
};

const AccordionItem: FunctionComponent<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b mb-2">
      <button
        className="py-4 px-6 w-full flex justify-between items-center text-left bg-white hover:bg-gray-50 focus:outline-none rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-700">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transform transition duration-500 ease-in-out ${isOpen ? 'rotate-90' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div
        className={`transition-height duration-500 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'} overflow-hidden bg-white rounded-tl-none rounded-tr-none rounded-bl-md rounded-br-md`}
      >
        <div className="p-6 border-t text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
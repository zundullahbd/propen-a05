import { useState } from 'react';

// function DropdownButton(props: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined }) {

const DropdownButton = (props: {text: String}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-indigo-700 rounded-lg text-white flex items-center px-3 py-1.5 rounded shadow"
      >
        <span className="mr-2">{props.text}</span>
        <span className='relative mr-3'>
      <span className="border-r mx-1 border-white h-8 top-0 absolute -translate-y-2/4"></span>

        </span>
        <svg 
            width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div
        className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="py-1" role="none">
          <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
            role="menuitem"
          >
            Option 1
          </a>
          <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
            role="menuitem"
          >
            Option 2
          </a>
        </div>
      </div>
    </div>
  );
};

export default DropdownButton;
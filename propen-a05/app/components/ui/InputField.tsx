import React from 'react';

interface InputWithIconProps {
  label: string;
  placeholder: string;
  icon: JSX.Element;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ label, placeholder, icon }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-gray-400"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InputWithIcon;
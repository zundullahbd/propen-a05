import React, { ReactNode } from 'react';

type TextWithIconButtonProps = {
  text: string;
  onClick: () => void;
  icon: ReactNode;
};

const TextWithIconButton: React.FC<TextWithIconButtonProps> = ({ text, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
    >
      <span>{text}</span>

      {icon}

    </button>
  );
};

export default TextWithIconButton;

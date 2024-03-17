import React from 'react';

const SwitchButton = ({ port, onClick }) => {
  const handleClick = () => {
    onClick(port);
  };

  return (
    <button className="switch-button bg-gray-300 border border-gray-400 p-2 rounded-md hover:bg-gray-400" onClick={handleClick}>
      {port}
    </button>
  );
};

export default SwitchButton;
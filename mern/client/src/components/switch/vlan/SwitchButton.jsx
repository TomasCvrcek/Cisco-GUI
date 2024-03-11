import React from 'react';

const SwitchButton = ({ port, onClick }) => {
  const handleClick = () => {
    onClick(port);
  };

  return (
    <button className="switch-button" onClick={handleClick}>
      {port}
    </button>
  );
};

export default SwitchButton;
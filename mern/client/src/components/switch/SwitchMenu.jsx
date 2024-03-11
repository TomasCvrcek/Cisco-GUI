import React, { useState } from 'react';
import VLANMenu from './vlan/VLANMenu';

const SwitchMenu = ({ onComponentSelect, config, deviceId}) => {
  const handleBoxClick = (component) => {
    onComponentSelect(component);
  };

  return (
    <div className="switch-menu">
      <h3>Switch Configuration</h3>
      {/* Render boxes and handle click events */}
      <div className="switch-boxes">
        {/* Example: VLAN Configuration Box */}
        <div className="switch-box" onClick={() => handleBoxClick(<VLANMenu config={config} deviceId={deviceId}/>)}>
          VLAN Configuration
        </div>
        {/* Add other boxes for different configuration options */}
      </div>
    </div>
  );
};

export default SwitchMenu;
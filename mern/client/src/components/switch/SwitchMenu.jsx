import React, { useState } from 'react';
import VLANMenu from './vlan/VLANMenu';

const SwitchMenu = ({ onComponentSelect, config, deviceId}) => {
  const handleBoxClick = (component) => {
    onComponentSelect(component);
  };

  return (
    <div className="switch-menu">
      <h3>Switch Configuration</h3>
      <div className="switch-boxes">
        <div className="switch-box" onClick={() => handleBoxClick(<VLANMenu config={config} deviceId={deviceId}/>)}>
          VLAN Configuration
        </div>
      </div>
    </div>
  );
};

export default SwitchMenu;
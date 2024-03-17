import React, { useState } from 'react';
import VLANMenu from './vlan/VLANMenu';

const SwitchMenu = ({ onComponentSelect, config, deviceId}) => {

  const handleBoxClick = (component) => {
    onComponentSelect(component);
  };

  

  const [showVLANMenu, setShowVLANMenu] = useState(false);

  const handleBack = () => {
    setShowVLANMenu(false);
  };

  return (
    <div>
      {showVLANMenu ? (
        <VLANMenu config={config} deviceId={deviceId} onBack={handleBack} />
      ) : (
        <button className="switch-box bg-white border border-gray-300 p-4 rounded cursor-pointer" onClick={() => setShowVLANMenu(true)}>Show VLAN Menu</button>
      )}
    </div>
  );
}


export default SwitchMenu;
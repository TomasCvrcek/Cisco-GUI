import React, { useState } from 'react';
import SwitchMenu from './switch/SwitchMenu';

const DeviceMenu = ({ deviceId, type, config }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };
  const updatedDeviceId = deviceId.slice(0, -1)

  return (
    <div className="device-menu">
      <div className="device-menu-content">
        <h3>Device Configuration</h3>
        <p>Device ID: {updatedDeviceId}</p>
        {/* Render the selected component */}
        {selectedComponent ? (
          <div>{selectedComponent}</div>
        ) : (
          <SwitchMenu onComponentSelect={handleComponentSelect} config={config} deviceId={updatedDeviceId}/>
        )}
      </div>
    </div>
  );
};

export default DeviceMenu;
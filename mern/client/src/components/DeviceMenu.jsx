import React, { useState } from 'react';
import SwitchMenu from './switch/SwitchMenu';
import ConfigureButton from './ConfigureButton';

const DeviceMenu = ({ deviceId, type, config }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };
  const updatedDeviceId = deviceId.slice(0, -1)

  return (
      <div className="device-menu-content">
        {selectedComponent ? (
          <div>{selectedComponent}</div>
          
        ) : (
          <div>
            <SwitchMenu onComponentSelect={handleComponentSelect} config={config} deviceId={updatedDeviceId}/>
          </div>
        )}
      </div>
  );
};

export default DeviceMenu;
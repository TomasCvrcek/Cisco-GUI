import React from 'react';

const SelectedPortInfo = ({ selectedPort, assignedVLAN }) => {
  return (
    <div className="selected-port-info">
      {selectedPort && assignedVLAN ? (
        <div>
          Port {selectedPort}: {assignedVLAN.name} - {assignedVLAN.number}
        </div>
      ) : (
        <div>Port {selectedPort}: No VLAN selected</div>
      )}
    </div>
  );
};

export default SelectedPortInfo;
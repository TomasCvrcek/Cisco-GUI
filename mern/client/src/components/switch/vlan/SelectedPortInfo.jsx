import React from 'react';

const SelectedPortInfo = ({ selectedPort, assignedVLAN }) => {
  return (
    <div className="selected-port-info bg-gray-200 border border-gray-300 p-4 rounded mb-4">
      {selectedPort && assignedVLAN ? (
        <div>
          <p className="text-lg font-semibold mb-2">Port {selectedPort}: {assignedVLAN.name} - {assignedVLAN.number}</p>
        </div>
      ) : (
        <div>
          <p className="text-lg font-semibold mb-2">Port {selectedPort}: No VLAN selected</p>
        </div>
      )}
    </div>
  );
};

export default SelectedPortInfo;
import React from 'react';

const VLANList = ({ vlans, onSelectVLAN }) => {
  return (
    <div className="vlan-list bg-gray-200 border border-gray-300 p-4 rounded mb-4">
      <h4 className="text-lg font-semibold mb-2">Available VLANs</h4>
      <ul>
        {vlans.map((vlan) => (
          <li key={vlan.number} className="flex items-center justify-between">
            <span>{vlan.name} - {vlan.number}</span>
            <button className="btn" onClick={() => onSelectVLAN(vlan)}>Assign</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VLANList;
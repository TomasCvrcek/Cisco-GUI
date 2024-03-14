import React from 'react';

const VLANList = ({ vlans, onSelectVLAN }) => {
  return (
    <div className="vlan-list">
      <h4>Available VLANs</h4>
      <ul>
        {vlans.map((vlan) => (
          <li key={vlan.number}>
            {vlan.name} - {vlan.number}
            <button onClick={() => onSelectVLAN(vlan)}>Assign</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VLANList;
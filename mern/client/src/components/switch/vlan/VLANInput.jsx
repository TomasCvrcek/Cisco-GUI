import React, { useState } from 'react';

const VLANInput = ({ onCreateVLAN }) => {
  const [vlanName, setVlanName] = useState('');
  const [vlanNumber, setVlanNumber] = useState('');
  const [vlanType, setVlanType] = useState('access');

  const handleNameChange = (event) => {
    setVlanName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setVlanNumber(event.target.value);
  };

  const handleTypeChange = (event) => {
    setVlanType(event.target.value);
  };

  const handleCreateVLAN = () => {
    if (vlanName.trim() === '' || vlanNumber.trim() === '') {
      alert('Please enter both VLAN name and number.');
      return;
    }

    onCreateVLAN({ name: vlanName, number: vlanNumber, type: vlanType });
    setVlanName('');
    setVlanNumber('');
    setVlanType('access');
  };

  return (
    <div className="vlan-input">
      <label>VLAN Name:</label>
      <input type="text" value={vlanName} onChange={handleNameChange} placeholder="Enter VLAN name" />
      <label>VLAN Number:</label>
      <input type="number" value={vlanNumber} onChange={handleNumberChange} placeholder="Enter VLAN number" />
      <label>VLAN Type:</label>
      <select value={vlanType} onChange={handleTypeChange}>
        <option value="access">Access</option>
        <option value="trunk">Trunk</option>
      </select>
      <button onClick={handleCreateVLAN}>Create VLAN</button>
    </div>
  );
};

export default VLANInput;
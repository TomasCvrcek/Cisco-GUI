import React, { useState } from 'react';

const VLANInput = ({ onCreateVLAN }) => {
  const [vlanName, setVlanName] = useState('');
  const [vlanNumber, setVlanNumber] = useState('');
  const [vlanType, setVlanType] = useState('access');

  const handleNameChange = (event) => {
    setVlanName(event.target.value);
  };

  const handleNumberChange = (event) => {
    const number = parseInt(event.target.value);
    if (number >= 1) {
      setVlanNumber(number);
    } else {
      // Display an error message or handle the invalid input
      // For now, just ignore the input
    }
  };

  const handleTypeChange = (event) => {
    setVlanType(event.target.value);
  };

  const handleCreateVLAN = () => {
    if (vlanName.trim() === '' || vlanNumber === '') {
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
      <label className="block mb-2">VLAN Name:</label>
      <input className="input" type="text" value={vlanName} onChange={handleNameChange} placeholder="Enter VLAN name" />
      <label className="block mb-2">VLAN Number:</label>
      <input className="input" type="number" value={vlanNumber} onChange={handleNumberChange} placeholder="Enter VLAN number" />
      <label className="block mb-2">VLAN Type:</label>
      <select value={vlanType} onChange={handleTypeChange}>
        <option value="access">Access</option>
        <option value="trunk">Trunk</option>
      </select>
      <button className="btn" onClick={handleCreateVLAN}>Create VLAN</button>
    </div>
  );
};

export default VLANInput;
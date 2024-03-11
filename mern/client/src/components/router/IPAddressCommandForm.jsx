import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IPAddressCommandForm = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [subnetMask, setSubnetMask] = useState('');
/*
  
  const handleIPSubmit = async (e) => {
    e.preventDefault();}
  
    const handleInput = (event) => {
      setPost({...post, [event.target.name]: event.target.event})
      console.log(post)
    }
*/
  useEffect(() => {
    // Fetch the command body based on device, model, and typeOfAction
    const fetchCommandBody = async () => {
      try {
        // Replace 'http://localhost:5555' with your actual API endpoint
        const apiUrl = `http://localhost:5555/commands?typeOfAction=${typeOfAction}&device=${device}&model=${model}`;
        const response = await axios.get(apiUrl);

        // Assuming the API returns an array of commands matching the criteria
        if (response.data.length > 0) {
          // Set the command body from the first result (you might adjust this logic based on your requirements)
          setCommandBody(response.data[0].commandBody);
        } else {
          // Handle the case when no matching command is found
          setCommandBody(''); // or set a default value
        }
      } catch (error) {
        console.error('Error fetching command body:', error.message);
        // Handle errors here
      }
    };

    // Fetch command body only if all required inputs are provided
    if (typeOfAction && device && model) {
      fetchCommandBody();
    }
  }, [typeOfAction, device, model]);

  

  // Assuming you have an API endpoint for creating commands
  const apiUrl = '/api/commands';
 
  try {
    // Assuming 'Router' as default value for device if not provided
    const newCommand = {
      device: device || 'Router',
      typeOfAction: typeOfAction || 'ip address',
      models: model || '4321', // Add model if provided and it exists in models array
      commandBody: `ip address ${ipAddress} ${subnetMask}`,
    };
    // Handle the response if needed
    // Reset the form after successful submission
    setDevice('');
    setModel('');
    setTypeOfAction('');
    setIPAddress('');
    setSubnetMask('');
    setCommandBody('');
  } catch (error) {
    console.error('Error creating command:', error.message);
    // Handle errors here
  }


  return (
    <div>
      <h2>Create IP Address Command</h2>
      <form onSubmit={handleIPSubmit}>
        <div>
          <label htmlFor="device">Device:</label>
          <input
            type="text"
            name="device"
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            name="model"
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="typeOfAction">Type of Action:</label>
          <input
            type="text"
            name="typeOfAction"
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="ipAddress">IP Address:</label>
          <input
            type="text"
            name="ipAddress"
            value={ipAddress}
            onChange={(e) => setIPAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="subnetMask">Subnet Mask:</label>
          <input
            type="text"
            name="subnetMask"
            value={subnetMask}
            onChange={(e) => setSubnetMask(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="commandBody">Command Body:</label>
          <input
            type="text"
            id="commandBody"
            readOnly
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default IPAddressCommandForm;
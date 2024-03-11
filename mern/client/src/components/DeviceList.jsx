import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flow from '../components/Board'
import { useAuthContext } from '../hooks/useAuthContext';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState(null);
  const [models, setModels] = useState([]);
  const {user} = useAuthContext()



  useEffect(() => {
    axios.get('http://localhost:5555/generaldevices' ,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
      }
  })
      .then(response => {
        setDevices(response.data);
        console.log(devices)
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
}, []);



  const handleDeviceSelect = (device) => {
    setSelectedDevice(device.deviceType);
    setSelectedConfiguration(device.default_configuration);
    setModels(device.models)
  };


  const onDragStart = (event, nodeType, model, selectedDevice) => {
    console.log(model)
    console.log(nodeType)
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('bagr', model);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('typeOfDevice', selectedDevice);
    event.dataTransfer.setData('configuration', selectedConfiguration);
  };
  return(
    <div>
      <h2>Device List</h2>
      <ul>
        {devices.map(generalDevice => (
          <li key={generalDevice._id} onClick={() => handleDeviceSelect(generalDevice)}>
            {generalDevice.deviceType}
          </li>
        ))}
      </ul>
      <ul>
        {models.map((model,index) => (
          <li key={index} >
            <div className='dndnode' onDragStart={(event) => onDragStart(event, 'default', model, selectedDevice )} draggable>
              {model}
            </div>
          </li>
        ))}
      </ul>
      <Flow deviceSelect={selectedDevice}/>
    </div>
  );
};
export default DeviceList;
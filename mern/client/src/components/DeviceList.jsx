import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flow from '../components/Board';
import { useAuthContext } from '../hooks/useAuthContext';

const DeviceList = () => {
 const [devices, setDevices] = useState([]);
 const [selectedDevice, setSelectedDevice] = useState(null);
 const [selectedConfiguration, setSelectedConfiguration] = useState(null);
 const [models, setModels] = useState([]);
 const { user } = useAuthContext();

 useEffect(() => {
    axios.get('http://localhost:5555/generaldevices', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    })
      .then(response => {
        setDevices(response.data);
        console.log(devices);
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
 }, []);

 const handleDeviceSelect = (device) => {
    setSelectedDevice(device.deviceType);
    setSelectedConfiguration(device.default_configuration);
    setModels(device.models);
 };

 const onDragStart = (event, nodeType, model, selectedDevice) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('bagr', model);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('typeOfDevice', selectedDevice);
    event.dataTransfer.setData('configuration', selectedConfiguration);
 };

 return (
    <div className="flex flex-col md:flex-row h-screen"> {/* Set a fixed height */}
      <div className="w-full md:w-11/12 h-full"> {/* Take remaining height */}
        <Flow deviceSelect={selectedDevice} />
      </div>
      <div className="w-full md:w-1/12 flex flex-col border-l border-gray-300 overflow-y-auto"> {/* Added overflow-y-auto for vertical scrolling */}
        <h2 className="text-2xl font-bold mb-4 text-center">Device List</h2> {/* Centered text */}
        <div className="flex flex-col justify-center">
          {devices.map(generalDevice => (
            <div key={generalDevice._id} className="m-2 p-4 border border-gray-300 rounded-lg cursor-pointer text-center" onClick={() => handleDeviceSelect(generalDevice)}> {/* Centered text */}
              {generalDevice.deviceType}
            </div>
          ))}
        </div>
        <hr className="my-4" /> {/* Separator line */}
        <div className="flex flex-col justify-center">
          {models.map((model, index) => (
            <div key={index} className="m-2 p-4 border border-gray-300 rounded-lg cursor-move text-center" draggable onDragStart={(event) => onDragStart(event, 'default', model, selectedDevice)}> {/* Centered text */}
              {model}
            </div>
          ))}
        </div>
      </div>
    </div>
 );
};

export default DeviceList;
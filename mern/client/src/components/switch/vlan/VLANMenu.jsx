import React, { useState, useEffect } from 'react';
import SwitchButton from './SwitchButton';
import VLANInput from './VLANInput';
import VLANList from './VLANList';
import ConfigTranslator from '../../../Handlers/ConfigFileHandler';
import SelectedPortInfo from './SelectedPortInfo';
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios'; 

const VLANMenu = ({ config, deviceId, onBack }) => {
  const [selectedPort, setSelectedPort] = useState(null);
  const [vlanByPort, setVlanByPort] = useState({});
  const [interfaces, setInterfaces] = useState([]);
  const [parsedConfig, setParsedConfig] = useState([]);
  const [vlans, setVlans] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const { interfaces: parsedInterfaces, parsedConfig: newParsedConfig } = ConfigTranslator({ configFile: config, action: 'switchGet', vlanByPort: vlanByPort });
      setInterfaces(parsedInterfaces);
      console.log('newParsedConfig', newParsedConfig);
      console.log('parsedInterfaces', parsedInterfaces);
      const newconfig = await ConfigTranslator({ configFile: config, action: 'switchPut', alreadyParsedConfig: newParsedConfig, deviceId: deviceId, user: user });
      setParsedConfig(newconfig);
      console.log('newconfig', newconfig);
    };
  
    fetchData();

  }, [vlanByPort, config, deviceId, user]);

  const handleCreateVLAN = (vlan) => {
    setVlans([...vlans, vlan]);
  };

  const handlePortClick = (port) => {
    setSelectedPort(port);
  };

  const handleAssignVLAN = (vlan) => {
    setVlanByPort({ ...vlanByPort, [selectedPort]: vlan });
  };

  const configure = async (parsedConfig) => {
    try {
      console.log('I JUST FRICKIN CLICKED');
      console.log(parsedConfig);
      const response = await axios.post('http://localhost:5555/users/configure', { userMadeConfig: parsedConfig });
      console.log('Configuration successful:', response.data);
    } catch (error) {
      console.error('Configuration failed:', error);
    }
  };

  function downloadConfig(textInput) {
    const filename = 'new_configuration_file'

    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="vlan-menu bg-gray-100 border border-gray-300 p-4 rounded mb-4">
      <h3 className="text-lg font-semibold mb-4">VLAN Configuration</h3>
      <button className="mb-4" onClick={onBack}>Back</button>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {interfaces.map((interfaceName) => (
          <SwitchButton key={interfaceName} port={interfaceName} onClick={handlePortClick} />
        ))}
      </div>
      <VLANInput onCreateVLAN={handleCreateVLAN} />
      <VLANList vlans={vlans} onSelectVLAN={handleAssignVLAN} />
      <SelectedPortInfo selectedPort={selectedPort} assignedVLAN={vlanByPort[selectedPort]} />
      <div className="flex justify-between"> {/* Added class for flex */}
        <button className="btn" onClick={() => configure(parsedConfig)}>Configure</button>
        <button className="btn" onClick={() => downloadConfig(parsedConfig)}>Download</button>
      </div>
    </div>
  );
};

export default VLANMenu;
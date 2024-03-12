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
      // setLoading(false);
    } catch (error) {
      console.error('Configuration failed:', error);
      // setError(error.message);
      // setLoading(false);
    }
  };

  return (
    <div className="vlan-menu">
      <h3>VLAN Configuration</h3>
      <button onClick={onBack}>Back</button>
      <div className="switch-grid">
        {interfaces.map((interfaceName) => (
          <SwitchButton key={interfaceName} port={interfaceName} onClick={handlePortClick} />
        ))}
      </div>
      <VLANInput onCreateVLAN={handleCreateVLAN} />
      <VLANList vlans={vlans} onSelectVLAN={handleAssignVLAN} />
      <SelectedPortInfo selectedPort={selectedPort} assignedVLAN={vlanByPort[selectedPort]} />
     { <button onClick={() => configure(parsedConfig)}>configure</button>}
    </div>
  );
};

export default VLANMenu;
import React, { useState, useEffect } from 'react';
import SwitchButton from './SwitchButton';
import VLANInput from './VLANInput';
import VLANList from './VLANList';
import ConfigTranslator from '../../../Handlers/ConfigFileHandler';
import SelectedPortInfo from './SelectedPortInfo';
import { useAuthContext } from '../../../hooks/useAuthContext';

const VLANMenu = ({ config, deviceId, onBack }) => {
  const [selectedPort, setSelectedPort] = useState(null);
  const [vlanByPort, setVlanByPort] = useState({});
  const [interfaces, setInterfaces] = useState([]);
  const [vlans, setVlans] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const { interfaces: parsedInterfaces, parsedConfig: newParsedConfig } = ConfigTranslator({ configFile: config, action: 'switchGet', vlanByPort: vlanByPort });
    setInterfaces(parsedInterfaces).then((x) => {
      console.log(x)
    })

    setParsedConfig(newParsedConfig);
    ConfigTranslator({ configFile: config, action: 'switchPut', alreadyParsedConfig: newParsedConfig, deviceId: deviceId, user: user });
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

  return (
    <div className="vlan-menu">
      <h3>VLAN Configuration</h3>
      <button onClick={onBack}>Back</button> {/* Back button */}
      <div className="switch-grid">
        {interfaces.map((interfaceName) => (
          <SwitchButton key={interfaceName} port={interfaceName} onClick={handlePortClick} />
        ))}
      </div>
      <VLANInput onCreateVLAN={handleCreateVLAN} />
      <VLANList vlans={vlans} onSelectVLAN={handleAssignVLAN} />
      <SelectedPortInfo selectedPort={selectedPort} assignedVLAN={vlanByPort[selectedPort]} />
    </div>
  );
};

export default VLANMenu;
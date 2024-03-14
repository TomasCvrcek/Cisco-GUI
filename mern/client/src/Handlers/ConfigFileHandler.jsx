import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


const ConfigTranslator = ({ configFile, action, vlanByPort, alreadyParsedConfig, deviceId, user }) => {
  
    let interfaces = [];
    let parsedConfig = {};
    console.log(action)
    console.log('id: ',deviceId)
    

    const parseSwitchConfig = () => {
      const lines = configFile.split('\n');
      lines.forEach(line => {
          if (line.includes('hostname')) {
              const hostname = line.split(' ')[1];
              parsedConfig.hostname = hostname;
          }
          if (line.includes('Ethernet')) {
              const interfaceName = line.split(' ')[1];
              interfaces.push(interfaceName);
              const vlan = vlanByPort[interfaceName];
              const switchportMode = vlan ? vlan.type : '';
              parsedConfig[interfaceName] = { vlan: vlan ? vlan.number : '', switchportMode };
          }
      });
  
      return { parsedConfig, interfaces};
  };

  const generateSwitchConfig = async ({initialConfigFile, parsedConfig, deviceId} ) => {
    const lines = initialConfigFile.split('\n');
    //const {user} = useAuthContext()
  let newConfig = '';

  lines.forEach(line => {
    console.log(line)
      if (line.startsWith('interface')) {
          const interfaceName = line.split(' ')[1];
          const interfaceConfig = parsedConfig[interfaceName];

          if (interfaceConfig) {
              const vlanLine = interfaceConfig.vlan ? ` switchport access vlan ${interfaceConfig.vlan}` : '';
              const switchportModeLine = interfaceConfig.switchportMode ? ` switchport mode ${interfaceConfig.switchportMode}` : '';
              if (vlanLine || switchportModeLine) {
                newConfig += `${line}\n${vlanLine}\n${switchportModeLine}\n`;
              } else newConfig += `${line}\n`;
          } else {
              newConfig += `${line}\n`;
          }
      } else if (line.trim() !== '') {
          newConfig += `${line}\n`;
      }
  });
    if (user) {
      try {
        const response = await axios.put(`http://localhost:5555/devices/${deviceId}`, { configuration: newConfig }, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`
              }
          })
              console.log('Device configuration updated:', response);
      } catch (error) {
          console.error('Error updating device configuration:', error.message);
      }
  }
  console.log('TOTO JE NOVY CONFIG',newConfig)
  return newConfig;
};

const parseRouterConfig = () => {
const lines = configFile.split('\n');
const parsedConfig = lines.reduce((result, line) => {
  if (line.startsWith('interface GigabitEthernet')) {
    const interfaceName = line.split(' ')[1];
    const mode = lines.find(l => l.includes(interfaceName + ' switchport mode')) ? 'access' : 'N/A';
    result[interfaceName] = { mode };
  }
  return result;
}, {});

return parsedConfig;
};





  switch(action){
    case 'switchGet':
      return parseSwitchConfig();
    case 'switchPut':
      console.log(configFile);
      return generateSwitchConfig({parsedConfig: alreadyParsedConfig, initialConfigFile: configFile, deviceId: deviceId});
    case 'router':
      return parseRouterConfig();
    default:
      console.log('no switching');
      return {};
  }
};

export default ConfigTranslator;
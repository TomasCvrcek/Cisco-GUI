import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

  // scan available ports
  export const scanSerialPorts = ({userMadeConfig}) => {
    console.log('BBBBBBBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGGGGGGGGGGRRRRRRRRRRRRRRRRRRRRRR')
    SerialPort.list()
      .then(ports => {
        console.log('Available serial ports:');
        ports.forEach(port => {
          console.log(port.path)
          if (port !== ''){
            connectToDevice({portPath: port.path, userMadeConfig: userMadeConfig})
          }
        });
        
      })
      .catch(error => {
        console.error('Error scanning serial ports:', error);
      });
  };
  
  
  const connectToDevice = async ({ portPath, userMadeConfig }) => {
    const stringPortPath = portPath.toString();
    const port = new SerialPort({path: stringPortPath,  baudRate: 9600 });


    const sendCommands = (port) => {
      let runningConfig = '';
      port.write('\r\nen\r\nterminal length 0\r\nsh ru brief\r\n', error => {
        if (error) {
            console.error('Error sending commands:', error);
        } else {
            console.log('Commands sent: enable, terminal length 0, sh ru brief');
        }
    });

      port.on('readable', function () {
        const data = port.read().toString();
        runningConfig += data, '\r\n';

        if (data.includes('\nend')) {
            const bagr = mergeConfigFiles({ currentConfig: runningConfig, userMadeConfig: userMadeConfig });
            port.write(`\r\nconf t\r\n${bagr}\r\nexit`, error => {
              if (error) {
                  console.error('Error sending commands:', error);
              } else {
                  console.log('now in config mode', bagr);
              }
          });
        }
    });
    
    
    
  };

  const mergeConfigFiles = ({ currentConfig, userMadeConfig }) => {
    const parsedUser = parseConfig(userMadeConfig)
    //console.log('currentConfig', currentConfig)
    return generateNewConfig({initialConfigFile: currentConfig, parsedConfig: parsedUser})
  };

  const generateNewConfig = ({ initialConfigFile, parsedConfig }) => {
    const lines = initialConfigFile.split('\n');
    let newConfig = '';
    //console.log(parsedConfig);

    const existingInterfaces = new Set();

    lines.forEach(line => {
        if (line.startsWith('interface')) {
            const interfaceName = line.split(' ')[1].trim();
            existingInterfaces.add(interfaceName);

            /*parsedConfig.interfaces.forEach(interf => console.log('Key:', Object.keys(interf)[0]));*/
            const interfaceConfig = parsedConfig.interfaces.find(interf => Object.keys(interf)[0] === interfaceName);

            if (interfaceConfig) {
                const interfaceProps = interfaceConfig[interfaceName];
                const vlanLine = interfaceProps.vlan ? ` switchport access vlan ${interfaceProps.vlan}` : '';
                const switchportModeLine = interfaceProps.switchportMode ? ` switchport mode ${interfaceProps.switchportMode}` : '';
                if (vlanLine || switchportModeLine) {
                    newConfig += `${line}\n${vlanLine}\n${switchportModeLine}\n`;
                } else {
                    newConfig += `${line}\n`;
                }
            } else {
                newConfig += `${line}\n`;
            }
        } else if (line.trim() !== '') {
            newConfig += `${line}\n`;
        }
    });

    const startIndex = newConfig.indexOf('version');
    const endIndex = newConfig.indexOf('\nend') + 4
    newConfig = newConfig.substring(startIndex, endIndex);
    return newConfig;
};
    
  const parseConfig = (config) => {
    let parsedConfig = { hostname: '', interfaces: [] };
    let currentInterface = null;
    let interfaceName = null; // Define interfaceName outside the block

    const lines = config.split('\n');
    lines.forEach(line => {
        if (line.includes('hostname')) {
            const hostname = line.split(' ')[1];
            parsedConfig.hostname = hostname;
        }
        if (line.startsWith('interface')) {
            interfaceName = line.split(' ')[1]; // Assign interfaceName here
            currentInterface = { [interfaceName]: {} };
            parsedConfig.interfaces.push(currentInterface);
        }
        if (currentInterface && line.includes('switchport') && line.includes('vlan')) {
            const vlanNumber = line.split(' ')[4];
            currentInterface[interfaceName].vlan = vlanNumber;
        }
        if (currentInterface && line.includes('switchport mode')) {
            const switchportMode = line.split(' ')[3];
            currentInterface[interfaceName].switchportMode = switchportMode;
            //console.log(currentInterface[interfaceName])
        }

    });
    return parsedConfig;
};


    sendCommands(port);
    //console.log(bagr)
  };

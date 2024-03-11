import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

// Function to scan for available serial ports
export const deviceConnector = () =>{
  const scanSerialPorts = () => {
    SerialPort.list()
      .then(ports => {
        console.log('Available serial ports:');
        ports.forEach(port => {
          console.log(port.path)
          if (port !== ''){
            connectToDevice({portPath: port.path})
          }
        });
        
      })
      .catch(error => {
        console.error('Error scanning serial ports:', error);
      });
  };
  
  
  const connectToDevice = ({ portPath }) => {
    const stringPortPath = portPath.toString();
    const port = new SerialPort({path: stringPortPath,  baudRate: 9600 });
/*
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
    parser.on('data', console.log)    
    
    console.log('bagr')
    */
    const sendCommands = (port) => {
      let runningConfig = '';
      port.write('\r\nen\r\nterminal length 0\r\nshow running-config\r\n', error => {
        if (error) {
          console.error('Error sending commands:', error);
        } else {
          console.log('Commands sent: enable, terminal length 0, show running-config');
        }
      }); 

    port.on('readable', function () {
      const data = port.read().toString()
      runningConfig += data, '\r\n'

      if (data.includes('end')){ 
        console.log(runningConfig)
        return runningConfig
      }
    })
    
  };
    // Send commands to the device
    sendCommands(port);
    //console.log(bagr)
  };
  scanSerialPorts()
}

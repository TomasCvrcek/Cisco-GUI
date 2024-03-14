  import express, { request, response } from "express" ;
  import {PORT, mongoCommandURL, mongoUserURL, mongoDeviceURL} from "./config.js";
  import mongoose from "mongoose";
  import Readline  from '@serialport/parser-readline'
  import path from 'path'
  import commandRoute from "./routes/commandRoute.js";
  import userRoute from "./routes/userRoute.js";
  import deviceRoute from "./routes/deviceRoute.js";
  import commandSchema from "./models/commandModel.js";
  import userSchema from "./models/userModel.js";
  import deviceSchema from "./models/deviceModel.js";
  import generalDeviceSchema from "./models/generalDeviceModel.js";
  import cors from "cors";
import generalDeviceRoute from "./routes/generalDeviceRoute.js";
import authRoute from "./routes/authRoute.js";




  const app = express();
  app.use(express.json());

  app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("bagr");
  })


const originPORT = '5173'

  app.use(
    cors({
      origin:`http://localhost:${originPORT}`,
      methods:['POST, GET, DELETE, PUT'],
      allowedHeaders: ['Content-type', 'Authorization'],
    }
    )
  )





  export async function createConnections(commandUrl, userUrl, deviceUrl) {
    const commandDb =  mongoose.createConnection(commandUrl);
    const userDb =  mongoose.createConnection(userUrl);
    const deviceDb =  mongoose.createConnection(deviceUrl);
  
    const Command = commandDb.model('Command', commandSchema);
    const Device = deviceDb.model('Device', deviceSchema);
    const User = userDb.model('User', userSchema);
    const GeneralDevice = commandDb.model('GeneralDevice', generalDeviceSchema)
  
    return {
      Command,
      Device,
      User,
      GeneralDevice
    };
  }


  createConnections(mongoCommandURL, mongoUserURL, mongoDeviceURL)
  .then(({ Command, Device, User, GeneralDevice }) => {
    console.log('Connections to databases successful');

    app.use('/commands', authRoute(User));
    app.use('/commands', commandRoute(Command));
    app.use('/generaldevices', authRoute(User));
    app.use('/generaldevices', generalDeviceRoute(GeneralDevice));
    app.use('/devices', authRoute(User));
    app.use('/devices', deviceRoute(Device));
    app.use('/users', userRoute(User));

    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to databases:', error);
  });
/*
  deviceConnector
  ();
*/

/*
  const port = new SerialPort({path: 'COM3', baudRate: 9600 });

  port.open((err) => {
    if (err) {
      console.error('Error opening port:', err);
    } else {
      console.log('Port opened');
  
      // Read data from the port
      port.on('data', (data) => {
        console.log('Data received:', data.toString());
      });
    }
  });*/
  /*
  app.use('/Users', userRoute);
  app.use('/Devices', deviceRoute);

  //mongoose implementation



// Connect to command database
const commandDB = mongoose.createConnection(mongoCommandURL);
const Command = commandDB.model('Command',commandSchema);
const bagr = new Command({device: "bagr1",models: "bagr2", typeOfAction: "bagr3", commandBody: "bagr4"})
//module.exports = commandDB.model('Command',commandSchema);
const command = await Command.create(bagr);
commandDB.on('connected', () => {
  console.log('Connected to command database');
  console.log(commandDB)
  // Define the Command model
  
  

  // Export the Command model
  //app.use('/commands', commandRoute);
  

});
commandDB.on('error', (error) => {
  console.log('Error connecting to command database:', error);
});
// Connect to user database
const userDB = mongoose.createConnection(mongoUserURL);
userDB.on('connected', () => {
  console.log('Connected to user database');
});
userDB.on('error', (error) => {
  console.log('Error connecting to user database:', error);
});

// Connect to device database
const deviceDB = mongoose.createConnection(mongoDeviceURL);
deviceDB.on('connected', () => {
  console.log('Connected to device database');
});
deviceDB.on('error', (error) => {
  console.log('Error connecting to device database:', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


/*const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
app.listen(PORT, () => {
  // perform a database connection when server starts
  /*dbo.connectToServer(function (err) {
    if (err) console.error(err);
   });
  console.log(`Server is running on port: ${PORT}`);
});*/
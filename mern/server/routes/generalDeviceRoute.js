import express from 'express';


const router = express.Router();


export default function generalDeviceRoute(GeneralDevice) {
router.get('/', async (request, response) => {
    try{
      const generalDevices = await GeneralDevice.find({});
      console.log(GeneralDevice);
      return response.status(200).json(generalDevices);
  
      }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
  
      }
    });
  
  
    //list one command
    router.get('/:id', async (request, response) => {
      try{
  
        const {id} = request.params;
        const generalDevices = await GeneralDevice.findById(id);
        return response.status(200).json(generalDevices);
    
        }catch(error){
          console.log(error.message);
          response.status(500).send({message: error.message});
    
        }
      });
  
  
  
  //delete command
  router.delete('/:id', async (request, response) => {
    try{
  
      const {id} = request.params;
      const result = await GeneralDevice.findByIdAndDelete(id);
      if (!result){
        return response.status(404).send({
          message: 'Command not found',
        });
      }
  
        return response.status(200).json({message: "deleted"});
  
      }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
  
      }
    });
  
    //update command
    router.put('/:id', async (request, response) => {
    try{
      if(
        !request.body.deviceType ||
        !request.body.models ||
        !request.body.default_configuration
      ){
        return response.status(400).send({
            message: 'Send all required fields: deviceType,models, default_configuration',
        });
      }
      const {id} = request.params;
      const result = await GeneralDevice.findByIdAndUpdate(id, request.body);
  
      if (!result){
        return response.status(404).send({
          message: 'Command not found',
        });
      }
  
        return response.status(200).json({message: "updated"});
  
    }catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  
  
  //new command4
  router.post('/', async (request, response) => {
    try{
      if(
        !request.body.deviceType ||
        !request.body.models ||
        !request.body.default_configuration
      ){
        return response.status(400).send({
          message: 'Send all required fields: deviceType, models, default_configuration',
        });
      }
      const newGeneralDevice = {
        deviceType: request.body.deviceType,
        models: request.body.models,
        default_configuration: request.body.default_configuration,
      };
      const generalDevice = await GeneralDevice.create(newGeneralDevice);
      return response.status(201).send(generalDevice);
    }catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  return router;
}


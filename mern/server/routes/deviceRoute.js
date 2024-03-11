import express from 'express';


const router = express.Router();



export default function deviceRoute(Device) {
    
    
//list commands
router.get('/', async (request, response) => {
    try{
      console.log(request)
      const user_id = request.user._id
      const devices = await Device.find({user_id});
      return response.status(200).json(devices);
  
      }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
    });
  
  
    //list one command
    router.get('/:id', async (request, response) => {
      try{
        const {id} = request.params;
        const device = await Device.findById(id);
        return response.status(200).json(device);
    
        }catch(error){
          console.log(error.message);
          response.status(500).send({message: error.message});
    
        }
      });
  
  
  
  //delete command
  router.delete('/:id', async (request, response) => {
    try{
      const {id} = request.params;
      const result = await Device.findByIdAndDelete(id);
      if (!result){
        return response.status(404).send({
          message: 'Device not found',
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

      const {id} = request.params;
      const result = await Device.findByIdAndUpdate(id, request.body);
  
      if (!result){
        return response.status(404).send({
          message: 'Device not found',
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
        !request.body.device ||
        !request.body.model ||
        !request.body.name ||
        !request.body.position ||
        !request.body.configuration
      ){
        return response.status(400).send({
            message: 'Send all required fields:  device, model, name, configuration',
        });
      }
      const user_id = request.user._id
      const newDevice = {
        device: request.body.device,
        model: request.body.model,
        name: request.body.name,
        position: request.body.position,
        configuration: request.body.configuration,
        user_id: user_id
      };
      const device = await Device.create(newDevice);
      return response.status(201).send(device._id);
    }catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
    return router;
  }

import express from 'express';


const router = express.Router();


export default function commandRoute(Command) {
 //list commands
router.get('/', async (request, response) => {
    try{
      const commands = await Command.find({});
      return response.status(200).json(commands);
  
      }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
  
      }
    });
  
  
    //list one command
    router.get('/:id', async (request, response) => {
      try{
  
        const {id} = request.params;
        const commands = await Command.findById(id);
        return response.status(200).json(commands);
    
        }catch(error){
          console.log(error.message);
          response.status(500).send({message: error.message});
    
        }
      });
  
  
  
  //delete command
  router.delete('/:id', async (request, response) => {
    try{
  
      const {id} = request.params;
      const result = await Command.findByIdAndDelete(id);
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
        !request.body.device ||
        !request.body.typeOfAction ||
        !request.body.model
      ){
        return response.status(400).send({
          message: 'Send all required fields: device, typeOfAction, model',
        });
      }
      const {id} = request.params;
      const result = await Command.findByIdAndUpdate(id, request.body);
  
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
        !request.body.device ||
        !request.body.models ||
        !request.body.typeOfAction ||
        !request.body.commandBody
      ){
        return response.status(400).send({
          message: 'Send all required fields: devices, typeOfAction, models, commandBody',
        });
      }
      const newCommand = {
        device: request.body.device,
        models: request.body.models,
        typeOfAction: request.body.typeOfAction,
        commandBody: request.body.commandBody
      };
      const command = await Command.create(newCommand);
      return response.status(201).send(command);
    }catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

  return router;
}


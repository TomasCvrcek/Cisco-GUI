import express from 'express';
import  jwt  from "jsonwebtoken";
import { SECRET } from '../config.js'
import { scanSerialPorts } from '../connection/connectPort.js';

export const createToken = (_id) =>{
  return jwt.sign({_id}, SECRET, {expiresIn: '3d'})
}



const router = express.Router();


export default function userRoute(User) {
    
    
//list commands
router.get('/', async (request, response) => {
    try{
      const users = await User.find({});
      return response.status(200).json(users);
  
      }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
  
      }
    });
  
  
    //list one command
    router.get('/:id', async (request, response) => {
      try{
  
        const {id} = request.params;
        const user = await User.findById(id);
        return response.status(200).json(user);
    
        }catch(error){
          console.log(error.message);
          response.status(500).send({message: error.message});
    
        }
      });
  
  
  
  //delete command
  router.delete('/:id', async (request, response) => {
    try{
  
      const {id} = request.params;
      const result = await User.findByIdAndDelete(id);
      if (!result){
        return response.status(404).send({
          message: 'User not found',
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
        !request.body.email ||
        !request.body.password
      ){
        return response.status(400).send({
          message: 'Send all required fields:  email, password',
        });
      }
      const {id} = request.params;
      const result = await User.findByIdAndUpdate(id, request.body);
  
      if (!result){
        return response.status(404).send({
          message: 'User not found',
        });
      }
  
        return response.status(200).json({message: "updated"});
  
    }catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  
  
  //login
  router.post('/login', async (request, response) => {
    const {email, password} = request.body
    try{
      const user = await User.login(email, password)
      const token = createToken(user._id)
      console.log(user._id) 
      return response.status(201).json({email, token});
    }catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  

  //register
  router.post('/register', async (request, response) => {
    const  {email, password, permissions} = request.body
    try{
      const user = await User.register(email, password, permissions)
      const token = createToken(user._id)
      console.log(user) 
      return response.status(201).json({email, token});
    }catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });


  router.post('/configure', async (req, res) => {
  try {
    const { userMadeConfig } = req.body;
    scanSerialPorts({userMadeConfig: userMadeConfig})
    res.status(200).json({ message: 'Configuration successful', userMadeConfig  });
  } catch (error) {
    // Handle errors
    console.error('Configuration failed:', error);
    res.status(500).json({ error: 'Configuration failed' });
  }
});

    return router;
}
  

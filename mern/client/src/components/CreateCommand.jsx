import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner'
import { useAuthContext } from '../hooks/useAuthContext';



const CreateCommand = () => {
    const [loading, setLoading] = useState(false);
    const [commandData, setCommandData] = useState({
      device: '',
      models: [], 
      typeOfAction: '',
      commandBody: '',
    });
    const {user} = useAuthContext()
    
    const handleIPSubmit = (e) => {
      e.preventDefault();
      setCommandData({
        device: e.target.device.value,
        models: [e.target.models.value],
        typeOfAction: e.target.typeOfAction.value,
        commandBody: e.target.commandBody.value,
      });
      setLoading(true);
    };
  
    useEffect(() => {
      console.log(commandData);
      if (loading) {
        if(user){
        try {
          axios.post('http://localhost:5555/commands', commandData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(() => setLoading(false))
            .catch((error) => {
              console.error('Error posting command data:', error.message);
              setLoading(false);
            });
        } catch (error) {
          console.error('Error fetching command body:', error.message);
          setLoading(false);
        }
      }
    }
    }, [loading, commandData, user]);
  
    return (
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold underline'>Home</h1>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Create IP Address Command</h2>
            <form onSubmit={handleIPSubmit}>
              <div>
                <label htmlFor='device'>Device:</label>
                <input type='text' name='device' required />
              </div>
              <div>
                <label htmlFor='models'>Models:</label>
                <input type='text' name='models' required />
              </div>
              <div>
                <label htmlFor='typeOfAction'>Type of Action:</label>
                <input type='text' name='typeOfAction' required />
              </div>
              <div>
                <label htmlFor='commandBody'>Command Body:</label>
                <input type='text' name='commandBody' required />
              </div>
              <div>
                <button type='submit'>Submit</button>
              </div>
            </form>
            <div>
              <h3>Post State:</h3>
              <pre>{JSON.stringify(commandData, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default CreateCommand;
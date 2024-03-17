import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import DeviceList from '../components/DeviceList'
import { useAuthContext } from '../hooks/useAuthContext';




const Home = () => {
  const [commands, setCommands] = useState([])
  const [loading, setLoading] = useState(false)
  const {user} = useAuthContext()
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/commands' ,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
      }
  })
      .then((response) => {
        setCommands(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user]);
  return (
    <div className='p-4'>
      
      <div className='flex justify-between items-center'>   
      </div>

      <DeviceList></DeviceList>

      
    </div>
  )
}

export default Home
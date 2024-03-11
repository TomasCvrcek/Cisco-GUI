import React from 'react'
import axios from 'axios'
import Spinner from '../components/spinner'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import DragAndDropBoard from '../components/Board'
import DeviceList from '../components/DeviceList'
import CreateCommand from '../components/CreateCommand'
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
      {/* 
      {loading ? (
        <Spinner />
      ) : (


        <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 rounded-md'>No</th>
                <th className='border border-slate-600 rounded-md'>Device</th>
                <th className='border border-slate-600 rounded-md'>Model</th>
                <th className='border border-slate-600 rounded-md max-md:hidden'>Type Of Action</th>
                <th className='border border-slate-600 rounded-md max-md:hidden'>Command body</th>
              </tr>
            </thead>
            <tbody>
              {commands.map((command, index) => (
                <tr key={command._id} className='h-8'>
                  <td className='border border-slate-800 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-800 rounded-md text-center'>
                    {command.device}
                  </td>
                  <td className='border border-slate-800 rounded-md text-center'>
                    {command.models}
                  </td>
                  <td className='border border-slate-800 rounded-md text-center'>
                    {command.typeOfAction}
                  </td>
                  <td className='border border-slate-800 rounded-md text-center'>
                    {command.commandBody}
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        <p></p>
      <CreateCommand>

      </CreateCommand>

      )}
*/}
      
      <DeviceList></DeviceList>
      
    </div>
  )
}

export default Home
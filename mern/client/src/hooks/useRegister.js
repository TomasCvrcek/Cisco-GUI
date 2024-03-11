import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const register = async (email, password) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5555/users/register', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.status)

            if (response.status === 201) {
                console.log(response.data)
                localStorage.setItem('user', JSON.stringify(response.data));
                dispatch({ type: 'LOGIN', payload: response.data });
            } else {
                setIsLoading(false);
                setError(response.data.error);
            }
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };
    return { register, isLoading, error };
};



 /*
            try {
                axios.post('http://localhost:5555/users/register', email, password, {headers: {'Content-type': 'application/json'}})
                .then((response) => {
                    if (response.ok){
                        //save to local storage
                        localStorage.setItem('user' ,response)
                    }
                })
                .catch((error) => {
                    console.error('Error posting command data:', error.message);
                    setIsLoading(false);
                });
            } catch (error) {
                console.error('Error fetching command body:', error.message);
                setIsLoading(false);
        }*/


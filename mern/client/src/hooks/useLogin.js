import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5555/users/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                console.log('login: ',response.data)
                // Save to local storage
                localStorage.setItem('user', JSON.stringify(response.data));

                // Update authContext
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

    return { login, isLoading, error };
};

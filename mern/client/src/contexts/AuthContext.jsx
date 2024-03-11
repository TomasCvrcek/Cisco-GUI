import {createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext()


export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            console.log('LOGOIN', action.payload)
            return {user: action.payload}
        case 'LOGOUT':
            console.log('LOGOUT', action.payload)
            return {user: null}
        default: state
    }
}



export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        user: null 
    })


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, [])
    console.log('AuthState', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}



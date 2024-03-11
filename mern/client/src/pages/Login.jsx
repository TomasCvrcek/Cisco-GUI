import { useState } from "react"
import Navbar from "../components/Navbar"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(email, password)

        await login(email, password)
    }


    return(
        <div>
            <form className="login" onSubmit={handleSubmit}>
                <h3>Logn in</h3>
                <lable>Email:</lable>
                <input
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <lable>Password:</lable>
                <input
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading}>Log in</button>
                {error && <div className="error"> {error}</div>}
            </form>
        </div>
    )
}

export default Login
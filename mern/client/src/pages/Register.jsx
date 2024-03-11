import { useState } from "react"
import { useRegister } from "../hooks/useRegister"
import Navbar from "../components/Navbar"

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register, error, isLoading} = useRegister()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(email, password)

        await register(email, password)
    }


    return(
        <div>
            <form className="register" onSubmit={handleSubmit}>
                <h3>Sign up</h3>
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

                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error"> {error}</div>}
            </form>
        </div>
    )
}

export default Register
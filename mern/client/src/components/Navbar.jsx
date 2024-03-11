import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
useAuthContext

const Navbar = ()=> {
    const {logout} = useLogout()
    const {user}  =useAuthContext()
    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className='container'>
            <Link to='/'>
                <h1>Home</h1>
            </Link>
            </div>
            <nav>
                {user &&(
                <div>
                    <span>{user.eamil}</span>
                    <button onClick={handleClick}>Log out</button>
                </div>
                )}
                {!user &&(
                    <div>
                        <Link to='/login'>
                            Login
                        </Link>
                        <Link to='/register'>
                            Register
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar
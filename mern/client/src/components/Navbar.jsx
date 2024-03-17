import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="bg-gray-800 py-4 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300">
                    Home
                </Link>
                <nav>
                    {user ? (
                        <div className="flex items-center">
                            <span className="text-white mr-4">{user.email}</span>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Link
                                to="/login"
                                className="text-white hover:text-gray-300 mr-4 font-semibold transition duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-white hover:text-gray-300 font-semibold transition duration-300"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
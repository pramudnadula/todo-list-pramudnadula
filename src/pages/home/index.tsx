import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import TodoList from '../../components/todo/TodoList';
import LogoutIcon from '@mui/icons-material/Logout';

const Home: React.FC = () => {
    const { logout, user } = useAuth();
    const [toggle, setToggle] = useState(false);

    // when clik the profile image it will toggle the value of toggle

    return (
        <>
            <nav className="py-4 px-4 sm:px-[3.75rem] flex justify-between items-center mb-4 shadow-md">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://pramudnadula.com/assets/img/about1.png"
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                        onClick={() => setToggle(!toggle)}
                    />
                    <h1 className="capitalize text-2xl font-bold">{user?.name}</h1>
                </div>
                <IconButton
                    className='text-secondaryColor hover:text-tertiaryColor font-bold'
                    size='large'
                    onClick={logout}
                >
                    <LogoutIcon />
                </IconButton>
            </nav>
            <div className="container mx-auto p-4">

                <TodoList />
            </div>
        </>
    );
};

export default Home;

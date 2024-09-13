import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import TodoList from '../../components/todo/TodoList';

const Home: React.FC = () => {
    const { logout, user } = useAuth();
    const [toggle, setToggle] = useState(false);

    // when clik the profile image it will toggle the value of toggle

    return (
        <div className="container mx-auto p-4">
            <nav className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://pramudnadula.com/assets/img/about1.png"
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                        onClick={() => setToggle(!toggle)}
                    />
                    <h1 className="text-2xl font-bold">{user?.name}</h1>
                </div>
                <Button variant="contained" color="error" onClick={logout}>
                    Logout
                </Button>
            </nav>

            <TodoList />
        </div>
    );
};

export default Home;

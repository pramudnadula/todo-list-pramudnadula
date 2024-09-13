import React from 'react';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TodoList from '../../components/todo/TodoList';

const Home: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/login'); // Redirect to login if not authenticated
    }

    return (
        <div className="p-6">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Todo List</h1>
                <Button variant="contained" color="secondary" onClick={logout}>
                    Logout
                </Button>
            </header>
            <TodoList />
        </div>
    );
};

export default Home;

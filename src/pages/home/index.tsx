import React from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import TodoList from '../../components/todo/TodoList';

const Home: React.FC = () => {
    const { logout } = useAuth();

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

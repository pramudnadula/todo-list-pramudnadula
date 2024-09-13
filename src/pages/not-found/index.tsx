import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Go Home
            </Button>
        </div>
    );
};

export default NotFound;

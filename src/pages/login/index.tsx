import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { Card, CardContent, Typography } from '@mui/material';

const Login: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-full max-w-md p-4">
                <CardContent>
                    <Typography variant="h5" component="h2" className="mb-4">
                        Login
                    </Typography>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;

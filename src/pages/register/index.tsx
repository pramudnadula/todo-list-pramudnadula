import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import { Card, CardContent, Typography } from '@mui/material';

const Register: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-full max-w-md p-4">
                <CardContent>
                    <Typography variant="h5" component="h2" className="mb-4">
                        Register
                    </Typography>
                    <RegisterForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;

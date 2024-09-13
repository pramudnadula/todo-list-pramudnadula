// src/pages/Profile.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, Button, Typography } from '@mui/material';

const Profile: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {isAuthenticated ? (
                <Card className="w-full max-w-md p-4">
                    <CardContent>
                        <Typography variant="h5" component="h2" className="mb-4">
                            User Profile
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="h6">Please log in to view your profile.</Typography>
            )}
        </div>
    );
};

export default Profile;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Must contain at least one lowercase letter')
                .matches(/\d/, 'Must contain at least one number')
                .matches(/[@$!%*?&]/, 'Must contain at least one special character')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                await register(values.name, values.email, values.password);
                navigate('/login');  // Redirect to login page after registration
            } catch (error) {
                console.error('Registration error:', error);
            }
        },
    });


    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button
                className='h-12 bg-gradient-to-r from-secondaryColor to-tertiaryColor text-white'
                variant="contained"
                fullWidth
                type="submit"
            >
                Sign Up
            </Button>
        </form>
    );
};

export default RegisterForm;

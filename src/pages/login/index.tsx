import React, { useEffect } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);


    return (
        <div className='flex flex-row h-screen'>
            <div className="hidden w-[45%] md:flex justify-center items-center relative h-[100vh]" >
                <img
                    src="assets/images/background/login-bg.svg"
                    alt="login-bg"
                    className="w-full h-full object-top object-cover"
                />
                <Link to="/" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' >
                    <div className='bg-gradient-to-r from-secondaryColor to-tertiaryColor p-2 rounded-md flex items-center gap-2'>
                        <span className='text-4xl font-bold text-primaryColor'> Todo App</span>
                    </div>
                </Link>
            </div>
            <div className="w-full md:w-[55%] bg-white overflow-y-auto h-screen">
                <div className='flex flex-col items-center justify-center h-screen md:justify-center py-20 md:py-10 gap-5'>
                    <div className='container px-10 md:px-0 w-full sm:w-[400px] flex flex-col gap-3'>
                        <LoginForm />
                        <span className='text-center font-bold text-secondaryColor'>Or</span>
                        <div className='h-[1px] bg-gray-300 w-full'></div>
                        <div className='flex flex-row justify-center items-center gap-2 text-[14px]'>
                            <p className='text-center'> Don{"'"}t have an account? </p> <Link to="/register" className='text-secondaryColor hover:text-primaryColor font-bold text-center'>Sing Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

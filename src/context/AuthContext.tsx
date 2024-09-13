import React, { createContext, useContext, useState, ReactNode } from 'react';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { User } from '../types';


interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const hashPassword = (password: string) => {
    return CryptoJS.SHA256(password).toString();
};

const verifyPassword = (password: string, hash: string) => {
    return hashPassword(password) === hash;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    React.useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            try {
                const savedUser = localStorage.getItem('users');
                if (savedUser) {
                    const users = JSON.parse(savedUser);
                    const user = users.find((user: User) => user.email === email);
                    if (user) {
                        if (user && verifyPassword(password, user.passwordHash)) {
                            setUser(user);
                            setIsAuthenticated(true);
                            localStorage.setItem('user', JSON.stringify(user));
                            localStorage.setItem('currentUserEmail', user.email);
                            toast.success('Login successful');
                            resolve();
                        } else {
                            toast.error('Invalid credentials');
                            reject(new Error('Invalid credentials'));
                        }
                    } else {
                        toast.error('No user found');
                        reject(new Error('No user found'));
                    }
                } else {
                    toast.error('No users found');
                    reject(new Error('No users found'));
                }
            } catch (error) {
                toast.error('Login failed');
                reject(error);
            }
        });
    };


    const register = async (name: string, email: string, password: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            try {
                const userData = { name, email, passwordHash: hashPassword(password) };
                const savedUser = localStorage.getItem('users');
                if (savedUser) {
                    const users = JSON.parse(savedUser);
                    if (users.find((user: User) => user.email === email)) {
                        toast.error('User already exists');
                        reject(new Error('User already exists'));
                        return;
                    }
                    localStorage.setItem('users', JSON.stringify([...users, userData]));
                } else {
                    localStorage.setItem('users', JSON.stringify([userData]));
                }
                setUser(userData);
                toast.success('Registration successful');
                resolve();
            } catch (error) {
                toast.error('Registration failed');
                reject(error);
            }
        });
    };


    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('currentUserEmail');
        setUser(null);
        setIsAuthenticated(false);
        toast.info('Logged out');
    };

    React.useEffect(() => {
        if (localStorage.getItem('user')) {
            setIsAuthenticated(true);
        }
    }, []);

    React.useEffect(() => {
        if (!isAuthenticated && localStorage.getItem('user')) {
            // localStorage.removeItem('user');
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

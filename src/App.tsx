// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import { Home, Login, Register } from './pages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/register" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;

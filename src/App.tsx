import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import { Home, Login, NotFound, Register } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth(); // isAuthenticated is a boolean value
  const user = localStorage.getItem('user'); // user is a string value
  // If the user is authenticated or the user is saved in the local storage, return the element
  return (user || isAuthenticated) ? element : <Navigate to="/login" />;
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;

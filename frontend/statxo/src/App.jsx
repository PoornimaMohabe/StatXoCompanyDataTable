import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { UserContextProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login1';
import ProtectedRoute from '../ProtectedRoute';

const App = () => {
  return (

    <UserContextProvider>
      <Navbar />
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
           </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </UserContextProvider>

  );
};

export default App;

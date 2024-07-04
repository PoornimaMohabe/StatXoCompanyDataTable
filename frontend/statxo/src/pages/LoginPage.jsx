

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { UserContext } from '../contexts/UserContext';

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const history = useNavigate();

  const handleLogin = (role) => {
    setUser({ role });
    history.push('/');
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Login Page</Heading>
      <VStack spacing={4} align="stretch">
        <Button onClick={() => handleLogin('user')} colorScheme="teal">
          Login as User
        </Button>
        <Button onClick={() => handleLogin('admin')} colorScheme="blue">
          Login as Admin
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;



import React, { useContext } from 'react';
import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const toast = useToast();

  const handleLogin = (role) => {
    const user = { username: role, role };
    setUser(user);
    toast({
      title: `Logged in as ${role}.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bg="gray.100">
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading mb={6} textAlign="center">Login</Heading>
        <Button
          colorScheme="teal"
          width="full"
          mb={4}
          onClick={() => handleLogin('user')}
        >
          Login as User
        </Button>
        <Button
          colorScheme="teal"
          width="full"
          onClick={() => handleLogin('admin')}
        >
          Login as Admin
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;

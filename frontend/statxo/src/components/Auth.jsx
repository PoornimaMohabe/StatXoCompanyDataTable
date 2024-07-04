
import React, { useState, useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading } from '@chakra-ui/react';
import { UserContext } from '../contexts/UserContext';
import { loginUser, registerUser } from '../services/authService';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password };
      const response = isLogin ? await loginUser(userData) : await registerUser(userData);
      setUser(response.user);
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={5} boxShadow="lg" borderRadius="md">
      <Heading mb={6}>{isLogin ? 'Login' : 'Register'}</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="md" width="full">
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Auth;

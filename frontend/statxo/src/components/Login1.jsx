import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { username, password, role };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in local storage and context
        const userData = { username, role, token: data.token };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', role);
       
        setUser(userData);

        toast({
          title: 'Login successful.',
          description: 'You have logged in successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Redirect to homepage
        navigate('/home');
      } else {
        toast({
          title: 'Error logging in.',
          description: data.message || 'An error occurred. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error logging in.',
        description: 'An error occurred. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="role" isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Select>
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            isFullWidth
          >
            {role === 'admin' ? 'Login as Admin' : 'Login as User'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;

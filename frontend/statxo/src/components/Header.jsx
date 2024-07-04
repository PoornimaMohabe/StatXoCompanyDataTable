

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Heading, Spacer, useToast } from '@chakra-ui/react';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex alignItems="center">
        <Heading size="md">STATXO Application</Heading>
        <Spacer />
        <Flex alignItems="center">
          <Link to="/">
            <Button colorScheme="teal" variant="outline" mr={4}>
              Home
            </Button>
          </Link>
          <Link to="/add">
            <Button colorScheme="teal" variant="outline" mr={4}>
              Add Record
            </Button>
          </Link>
          {user && user.role === 'admin' && (
            <Link to="/admin">
              <Button colorScheme="teal" variant="outline" mr={4}>
                Admin Panel
              </Button>
            </Link>
          )}
          {user ? (
            <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button colorScheme="teal" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

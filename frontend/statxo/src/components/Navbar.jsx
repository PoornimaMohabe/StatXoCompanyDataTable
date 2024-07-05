import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Link as ChakraLink } from '@chakra-ui/react'; // Import necessary Chakra UI components

function Navbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Box>
        <ChakraLink as={Link} to="/" mr={8} _hover={{ textDecoration: 'none', color: 'white' }}>
          Login
        </ChakraLink>
        <ChakraLink as={Link} to="/signup" mr={8} _hover={{ textDecoration: 'none', color: 'white' }}>
          Signup
        </ChakraLink>
        <ChakraLink as={Link} to="/home" _hover={{ textDecoration: 'none', color: 'white' }}>
          Homepage
        </ChakraLink>
      </Box>
    </Flex>
  );
}

export default Navbar;

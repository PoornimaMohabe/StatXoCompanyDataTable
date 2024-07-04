

import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box p={4} textAlign="center">
      <Heading as="h1" mb={4}>404 - Page Not Found</Heading>
      <Text mb={4}>The page you are looking for does not exist.</Text>
      <Button as={Link} to="/" colorScheme="teal">
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;

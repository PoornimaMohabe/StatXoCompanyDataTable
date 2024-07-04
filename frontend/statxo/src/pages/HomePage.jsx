

import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react';
import { UserContext } from '../contexts/UserContext';
import DataTable from '../components/DataTable';
import { fetchRecords, saveRecords } from '../services/dataService';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [records, setRecords] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchRecords()
      .then((data) => {
        setRecords(data);
      })
      .catch((error) => {
        toast({
          title: 'Error fetching records.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleSave = () => {
    saveRecords(records)
      .then(() => {
        toast({
          title: 'Records saved successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Error saving records.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Home Page</Heading>
      <VStack spacing={4} align="stretch">
        <DataTable records={records} setRecords={setRecords} />
        <Button onClick={handleSave} colorScheme="teal" alignSelf="flex-end">
          Save
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;



import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast
} from '@chakra-ui/react';
import { createRecord } from '../services/dataService';

const Form = ({ onAddRecord }) => {
  const [formData, setFormData] = useState({
    quantity: '',
    amount: '',
    postingYear: new Date().getFullYear(),
    postingMonth: new Date().toLocaleString('default', { month: 'long' }),
    actionType: 'Type1',
    actionNumber: '',
    actionName: 'Action1',
    impact: 'Low'
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRecord = await createRecord(formData);
      onAddRecord(newRecord);
      setFormData({
        quantity: '',
        amount: '',
        postingYear: new Date().getFullYear(),
        postingMonth: new Date().toLocaleString('default', { month: 'long' }),
        actionType: 'Type1',
        actionNumber: '',
        actionName: 'Action1',
        impact: 'Low'
      });
      toast({
        title: 'Record added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error adding record.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} maxWidth="500px" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl mb={3} isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={3} isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={3} isRequired>
          <FormLabel>Action Type</FormLabel>
          <Select
            name="actionType"
            value={formData.actionType}
            onChange={handleChange}
          >
            <option value="Type1">Type1</option>
            <option value="Type2">Type2</option>
            <option value="Type3">Type3</option>
          </Select>
        </FormControl>
        <FormControl mb={3} isRequired>
          <FormLabel>Action Number</FormLabel>
          <Input
            type="text"
            name="actionNumber"
            value={formData.actionNumber}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={3} isRequired>
          <FormLabel>Action Name</FormLabel>
          <Select
            name="actionName"
            value={formData.actionName}
            onChange={handleChange}
          >
            <option value="Action1">Action1</option>
            <option value="Action2">Action2</option>
            <option value="Action3">Action3</option>
          </Select>
        </FormControl>
        <FormControl mb={3} isRequired>
          <FormLabel>Impact</FormLabel>
          <Select
            name="impact"
            value={formData.impact}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
            <option value="High">High</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full" mt={4}>
          Add Record
        </Button>
      </form>
    </Box>
  );
};

export default Form;

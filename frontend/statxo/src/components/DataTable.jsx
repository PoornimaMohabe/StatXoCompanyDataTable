import React, { useContext, useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  Button,
  Box,
  useToast,
  FormControl,
  FormLabel,
  VStack
} from '@chakra-ui/react';
import { UserContext } from '../contexts/UserContext';
import { fetchRecords, updateRecords, addRecord } from '../services/dataService';

const DataTable = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [newRecord, setNewRecord] = useState({
    quantity: '',
    amount: '',
    postingYear: new Date().getFullYear(),
    postingMonth: new Date().getMonth() + 1,
    actionType: '',
    actionNumber: '',
    actionName: '',
    status: 'Pending',
    impact: 'Low',
  });
  const [userdata, setUserData] = useState("");
  const toast = useToast();

  const userlocal = localStorage.getItem('user');
  console.log(userlocal);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchRecords();
      setData(result);
      setEditData(result);
    };
    getData();
  }, []);

  useEffect(() => {
    fetchDATA();
  }, []);

  const fetchDATA = () => {
    fetch('http://localhost:5000/api/data/records')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data.records);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...editData];
    newData[index][field] = value;
    setEditData(newData);
  };

  const handleSave = async () => {
    try {
      await updateRecords(editData);
      setData(editData);
      toast({
        title: 'Records updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating records.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNewRecordChange = (field, value) => {
    setNewRecord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddRecord = async () => {
    try {
      await addRecord(newRecord);
      setNewRecord({
        quantity: '',
        amount: '',
        postingYear: new Date().getFullYear(),
        postingMonth: new Date().getMonth() + 1,
        actionType: '',
        actionNumber: '',
        actionName: '',
        status: 'Pending',
        impact: 'Low',
      });
      fetchDATA();
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
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="teal" mt={5}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Quantity</Th>
            <Th>Amount</Th>
            <Th>Posting Year</Th>
            <Th>Posting Month</Th>
            <Th>Action Type</Th>
            <Th>Action Number</Th>
            <Th>Action Name</Th>
            <Th>Status</Th>
            <Th>Impact</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userdata && userdata.map((item, index) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.quantity}</Td>
              <Td>
                <Input
                  type="number"
                  value={item.amount}
                  onChange={(e) => handleInputChange(index, 'amount', parseFloat(e.target.value))}
                />
              </Td>
              <Td>{item.postingYear}</Td>
              <Td>{item.postingMonth}</Td>
              <Td>
                <Select
                  value={item.actionType}
                  onChange={(e) => handleInputChange(index, 'actionType', e.target.value)}
                >
                  <option value="Type1">Type1</option>
                  <option value="Type2">Type2</option>
                  <option value="Type3">Type3</option>
                </Select>
              </Td>
              <Td>{item.actionNumber}</Td>
              <Td>
                <Select
                  value={item.actionName}
                  onChange={(e) => handleInputChange(index, 'actionName', e.target.value)}
                >
                  <option value="Action1">Action1</option>
                  <option value="Action2">Action2</option>
                  <option value="Action3">Action3</option>
                </Select>
              </Td>
              <Td>
                {userlocal.role === 'admin' ? (
                  <Select
                    value={item.status}
                    onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Approved">Approved</option>
                  </Select>
                ) : (
                  item.status
                )}
              </Td>
              <Td>{item.impact}</Td>
              <Td><Button>Edit</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleSave} colorScheme="teal" mt={4}>
        Save Changes
      </Button>
      <Box mt={8}>
        <VStack spacing={4}>
          <FormControl id="quantity">
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              value={newRecord.quantity}
              onChange={(e) => handleNewRecordChange('quantity', parseFloat(e.target.value))}
            />
          </FormControl>
          <FormControl id="amount">
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              value={newRecord.amount}
              onChange={(e) => handleNewRecordChange('amount', parseFloat(e.target.value))}
            />
          </FormControl>
          <FormControl id="actionType">
            <FormLabel>Action Type</FormLabel>
            <Select
              value={newRecord.actionType}
              onChange={(e) => handleNewRecordChange('actionType', e.target.value)}
            >
              <option value="Type1">Type1</option>
              <option value="Type2">Type2</option>
              <option value="Type3">Type3</option>
            </Select>
          </FormControl>
          <FormControl id="actionNumber">
            <FormLabel>Action Number</FormLabel>
            <Input
              type="text"
              value={newRecord.actionNumber}
              onChange={(e) => handleNewRecordChange('actionNumber', e.target.value)}
            />
          </FormControl>
          <FormControl id="actionName">
            <FormLabel>Action Name</FormLabel>
            <Select
              value={newRecord.actionName}
              onChange={(e) => handleNewRecordChange('actionName', e.target.value)}
            >
              <option value="Action1">Action1</option>
              <option value="Action2">Action2</option>
              <option value="Action3">Action3</option>
            </Select>
          </FormControl>
          <FormControl id="impact">
            <FormLabel>Impact</FormLabel>
            <Select
              value={newRecord.impact}
              onChange={(e) => handleNewRecordChange('impact', e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Mid">Mid</option>
              <option value="High">High</option>
            </Select>
          </FormControl>
          <Button onClick={handleAddRecord} colorScheme="teal">
            Add Record
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default DataTable;

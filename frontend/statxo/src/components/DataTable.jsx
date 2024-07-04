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
  useToast
} from '@chakra-ui/react';
import { UserContext } from '../contexts/UserContext';
import { fetchRecords, updateRecords } from '../services/dataService';

const DataTable = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      const result = await fetchRecords();
      setData(result);
      setEditData(result);
    };
    getData();
  }, []);

  function fetchDATA(){
    fetch(`http://localhost:5000/api/data/records`)
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    fetchDATA();
  },[])

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
          </Tr>
        </Thead>
        <Tbody>
          {editData.map((item, index) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
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
                {user.role === 'admin' ? (
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
              <Td>{item.impact}</Td> {/* Ensure 'impact' field is rendered */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleSave} colorScheme="teal" mt={4}>
        Save Changes
      </Button>
    </Box>
  );
};

export default DataTable;

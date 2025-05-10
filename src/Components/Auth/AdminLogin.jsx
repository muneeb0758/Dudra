import React, { useState } from 'react';
import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../Redux/auth/auth.actions';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

const AdminLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await dispatch(adminLogin(data.email, data.password));
      toast({
        position: 'top-left',
        render: () => (
          <Flex color='white' border="4px solid white" p={"10px"} bgColor='green.400'>
            <CheckCircleIcon w={30} h={30} />
            <Text size="lg" ml="15px">Welcome Admin!</Text>
          </Flex>
        ),
      });
      navigate("/admin");
    } catch (error) {
      toast({
        position: 'top-left',
        render: () => (
          <Flex color='white' border="4px solid white" p={"10px"} bgColor='red'>
            <WarningIcon w={30} h={30} />
            <Text size="lg" ml="15px">{error.message}</Text>
          </Flex>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p="30px">
      <Box w={["95%", "95%", "30%"]} shadow="2xl" mt="30px" m="auto" p="25px" bgColor="white">
        <Heading size="lg" mb="30px">Admin Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input 
              h="50px" 
              type="email" 
              value={data.email} 
              onChange={(e) => setData({...data, email: e.target.value})} 
              mb="30px" 
            />
            <FormLabel>Password</FormLabel>
            <Input 
              h="50px" 
              type="password" 
              value={data.password} 
              onChange={(e) => setData({...data, password: e.target.value})} 
              mb="30px" 
            />
          </FormControl>
          <Button 
            w="100%" 
            color="white" 
            mt="20px" 
            borderRadius="0px" 
            bgColor="black" 
            _hover={{ bgColor: "#28bdb7", color: "black" }} 
            type="submit"
            isLoading={loading}
            loadingText="Signing In..."
          >
            SIGN IN
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLogin;
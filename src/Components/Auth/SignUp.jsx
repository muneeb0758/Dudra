import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSignUp } from '../Redux/auth/auth.actions'; // Fixed path
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.username || !data.email || !data.password) {
      toast({
        position: 'top',
        render: () => (
          <Flex color='white' p={3} bgColor='red.500' borderRadius="md" alignItems="center">
            <WarningIcon mr={2} />
            <Text>Please fill in all fields</Text>
          </Flex>
        ),
      });
      return;
    }

    setLoading(true);
    const result = await dispatch(userSignUp(data));
    if (result.success) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Flex color='white' p={3} bgColor='green.500' borderRadius="md" alignItems="center">
            <CheckCircleIcon mr={2} />
            <Text>Account created successfully!</Text>
          </Flex>
        ),
      });
      setTimeout(() => navigate('/'), 2000);
    } else {
      toast({
        position: 'top',
        render: () => (
          <Flex color='white' p={3} bgColor='red.500' borderRadius="md" alignItems="center">
            <WarningIcon mr={2} />
            <Text>{result.error}</Text>
          </Flex>
        ),
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box bgColor="#f5f5f5" pt="50px" pb="50px">
      <Box w={["90%", "50%", "40%"]} m="auto" p="25px" bgColor="white" boxShadow="md">
        <Heading size="lg" mb="30px">Create Account</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Your Name</FormLabel>
            <Input
              h="50px"
              name="username"
              value={data.username}
              onChange={handleChange}
              mb="30px"
              placeholder="Enter your full name"
            />
            <FormLabel>Email address</FormLabel>
            <Input
              h="50px"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              mb="30px"
              placeholder="Enter your email"
            />
            <FormLabel>Password</FormLabel>
            <Input
              h="50px"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              mb="30px"
              placeholder="Create a password"
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={loading}
            loadingText="Creating Account..."
            w="100%"
            color="white"
            bgColor="black"
            _hover={{ bgColor: "#28bdb7" }}
            mt="20px"
          >
            SIGN UP
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
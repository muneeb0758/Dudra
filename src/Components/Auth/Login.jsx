import React, { useState } from 'react';
import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin, userGoogleLogin } from '../Redux/auth/auth.actions';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'; // Added imports
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.authManager.isAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await dispatch(userLogin(data.email, data.password));
    if (result.success) {
      toast({
        position: 'top-left',
        render: () => (
          <Flex color='white' border="4px solid white" p={"10px"} bgColor='green.400'>
            <CheckCircleIcon w={30} h={30} />
            <Text size="lg" ml="15px">Signed In Successfully!</Text>
          </Flex>
        ),
      });
      navigate('/');
    } else {
      toast({
        position: 'top-left',
        render: () => (
          <Flex color='white' border="4px solid white" p={"10px"} bgColor='red'>
            <WarningIcon w={30} h={30} />
            <Text size="lg" ml="15px">{result.error}</Text>
          </Flex>
        ),
      });
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await dispatch(userGoogleLogin());
    if (result.success) {
      toast({
        position: 'top-left',
        render: () => (
          <Flex color='white' border="4px solid white" p={"10px"} bgColor='green.400'>
            <CheckCircleIcon w={30} h={30} />
            <Text size="lg" ml="15px">Signed In with Google!</Text>
          </Flex>
        ),
      });
      navigate('/');
    } else {
      toast({
        position: 'top-left',
        render: () => (
          <Flex color='white' border="4px solid white" p={"10px"} bgColor='red'>
            <WarningIcon w={30} h={30} />
            <Text size="lg" ml="15px">{result.error}</Text>
          </Flex>
        ),
      });
    }
    setLoading(false);
  };

  return (
    <Box bgColor="#f5f5f5" pb="50px">
      <Flex w={["90%", "70%", "70%"]} m="auto" direction={["column", "column", "row"]} justify="space-between">
        <Box w={["100%", "100%", "45%"]} mt="30px" p="25px" bgColor="white" boxShadow="md">
          <Heading size="lg" mb="30px">Existing Customers</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                h="50px"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                mb="30px"
              />
              <FormLabel>Password</FormLabel>
              <Input
                h="50px"
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                mb="30px"
              />
            </FormControl>
            <Link to="/admin-login">
              <Text as="u" color="red">Admin Login</Text>
            </Link>
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
            <Button
              w="100%"
              color="black"
              mt="20px"
              borderRadius="0px"
              border="1px solid black"
              bgColor="white"
              _hover={{ bgColor: "#28bdb7", color: "black" }}
              leftIcon={<FcGoogle />}
              onClick={handleGoogleLogin}
              isLoading={loading}
              loadingText="Signing In with Google..."
            >
              Sign in with Google
            </Button>
          </form>
        </Box>

        <Box w={["100%", "100%", "45%"]} mt="30px" p="25px" bgColor="white" boxShadow="md">
          <Heading size="lg" mb="30px">New Customers</Heading>
          <Link to="/signup">
            <Button
              w="100%"
              color="black"
              mb="20px"
              borderRadius="0px"
              border="1px solid black"
              bgColor="white"
              _hover={{ bgColor: "#28bdb7", color: "black" }}
            >
              REGISTER
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
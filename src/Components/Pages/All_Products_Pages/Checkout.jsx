import {
  Box, Grid, GridItem, Heading, Text,
  FormControl, FormLabel, Input, Select,
  Button, Alert, AlertIcon, useToast, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../Footer';
import { resetCart } from '../../Redux/cart/cart.actions';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [address, setAddress] = useState({
    fullName: '',
    postcode: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    phone: ''
  });

  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const cartItems = useSelector((state) => state.cartManager.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const subtotal = cartItems.reduce((acc, item) => 
    acc + (item.price * (item.quantity || 1)), 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  const validateForm = () => {
    const newErrors = {};
    
    // Address Validation
    if (!address.fullName) newErrors.fullName = 'Full name is required';
    if (!address.postcode.match(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i)) 
      newErrors.postcode = 'Invalid UK postcode';
    if (!address.addressLine1) newErrors.addressLine1 = 'Address line 1 is required';
    if (!address.city) newErrors.city = 'City is required';
    
    // Payment Validation
    if (!payment.cardNumber.match(/^\d{16}$/)) 
      newErrors.cardNumber = 'Invalid card number';
    if (!payment.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) 
      newErrors.expiry = 'Invalid expiry date';
    if (!payment.cvv.match(/^\d{3}$/)) 
      newErrors.cvv = 'Invalid CVV';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(resetCart());
      navigate('/order-confirmation');
      toast({
        title: "Order Placed Successfully",
        description: "Your order will be delivered within 3-5 working days",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <Heading size="xl" mb={8}>Checkout</Heading>
      
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {/* Left Column */}
        <GridItem colSpan={3}>
          <Box mb={8}>
            <Heading size="lg" mb={4}>Delivery Address</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl isInvalid={!!errors.fullName}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={address.fullName}
                  onChange={(e) => setAddress({...address, fullName: e.target.value})}
                />
                {errors.fullName && <Text color="red.500">{errors.fullName}</Text>}
              </FormControl>

              <FormControl isInvalid={!!errors.postcode}>
                <FormLabel>Postcode</FormLabel>
                <Input
                  value={address.postcode}
                  onChange={(e) => setAddress({...address, postcode: e.target.value})}
                  placeholder="e.g. SW1A 1AA"
                />
                {errors.postcode && <Text color="red.500">{errors.postcode}</Text>}
              </FormControl>

              {/* Other address fields... */}
            </Grid>
          </Box>

          <Box mb={8}>
            <Heading size="lg" mb={4}>Payment Details</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl isInvalid={!!errors.cardNumber}>
                <FormLabel>Card Number</FormLabel>
                <Input
                  value={payment.cardNumber}
                  onChange={(e) => setPayment({...payment, cardNumber: e.target.value})}
                  placeholder="4242 4242 4242 4242"
                />
                {errors.cardNumber && <Text color="red.500">{errors.cardNumber}</Text>}
              </FormControl>

              {/* Other payment fields... */}
            </Grid>
          </Box>
        </GridItem>

        {/* Right Column */}
        <GridItem colSpan={1}>
          <Box border="1px solid #ddd" p={4} borderRadius="md">
            <Heading size="md" mb={4}>Order Summary</Heading>
            
            <Flex justify="space-between" mb={2}>
              <Text>Subtotal ({cartItems.length} items):</Text>
              <Text>£{subtotal.toFixed(2)}</Text>
            </Flex>
            
            <Flex justify="space-between" mb={4}>
              <Text>VAT (20%):</Text>
              <Text>£{vat.toFixed(2)}</Text>
            </Flex>
            
            <Flex justify="space-between" mb={6} borderTop="1px solid #ddd" pt={4}>
              <Text fontWeight="bold">Total:</Text>
              <Text fontWeight="bold">£{total.toFixed(2)}</Text>
            </Flex>

            <Alert status="info" mb={4}>
              <AlertIcon />
              Free delivery on orders over £50
            </Alert>

            <Button
              colorScheme="blue"
              size="lg"
              width="full"
              onClick={handleSubmit}
            >
              Place Your Order
            </Button>
          </Box>
        </GridItem>
      </Grid>
      
      <Footer />
    </Box>
  );
};

export default Checkout;
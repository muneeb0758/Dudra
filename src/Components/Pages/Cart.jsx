import React from "react";
import {
  Box, Button, Flex, Text, Heading, 
  Image, Grid, GridItem, NumberInput,
  NumberInputField, NumberInputStepper,
  NumberIncrementStepper, NumberDecrementStepper
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../Optional/EmptyCart";
import { Link } from "react-router-dom";
import { deleteToCart, updateQuantity } from "../Redux/cart/cart.actions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleQuantityChange = (value) => {
    dispatch(updateQuantity({ id: item.id, quantity: value }));
  };

  return (
    <Flex borderBottom="1px solid #ddd" py={4} px={2}>
      <Box w="120px" flexShrink={0}>
        <Image
          src={item.image_link}
          alt={item.name}
          objectFit="contain"
          boxSize="120px"
        />
      </Box>
      
      <Box flex={1} ml={4}>
        <Heading size="md" mb={2}>{item.name}</Heading>
        <Text fontSize="sm" color="gray.600" mb={2}>
          Sold by: {item.brand || "Dudra UK"}
        </Text>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          £{item.price}
        </Text>
        
        <Flex align="center">
          <NumberInput 
            min={1} 
            max={10} 
            value={item.quantity || 1}
            onChange={handleQuantityChange}
            width="100px"
            mr={4}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          
          <Button
            variant="ghost"
            colorScheme="red"
            leftIcon={<DeleteIcon />}
            onClick={() => dispatch(deleteToCart(item.id))}
          >
            Delete
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

const Cart = () => {
  const cartItems = useSelector((state) => state.cartManager.products);
  const dispatch = useDispatch();
  
  const subtotal = cartItems.reduce((acc, item) => 
    acc + (item.price * (item.quantity || 1)), 0);
  const vat = subtotal * 0.2; // 20% VAT
  const total = subtotal + vat;

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {/* Main Cart Items */}
          <GridItem colSpan={3}>
            <Heading size="xl" mb={6} borderBottom="2px solid #ddd" pb={4}>
              Shopping Basket ({cartItems.length} items)
            </Heading>
            
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </GridItem>

          {/* Order Summary */}
          <GridItem colSpan={1}>
            <Box border="1px solid #ddd" p={4} borderRadius="md">
              <Heading size="md" mb={4}>
                Order Summary
              </Heading>
              
              <Flex justify="space-between" mb={2}>
                <Text>Subtotal ({cartItems.length} items):</Text>
                <Text fontWeight="bold">£{subtotal.toFixed(2)}</Text>
              </Flex>
              
              <Flex justify="space-between" mb={4}>
                <Text>VAT (20%):</Text>
                <Text>£{vat.toFixed(2)}</Text>
              </Flex>
              
              <Flex justify="space-between" mb={6} borderTop="1px solid #ddd" pt={4}>
                <Text fontSize="lg" fontWeight="bold">Order Total:</Text>
                <Text fontSize="lg" fontWeight="bold">£{total.toFixed(2)}</Text>
              </Flex>

              <Link to="/checkout">
                <Button
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  mb={4}
                >
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Text fontSize="sm" color="gray.600" textAlign="center">
                By placing your order, you agree to Dudra UK's 
                <Button variant="link" color="blue.600" ml={1}>
                  Privacy Policy
                </Button>
              </Text>
            </Box>
          </GridItem>
        </Grid>
      )}
      <Footer />
    </Box>
  );
};

export default Cart;
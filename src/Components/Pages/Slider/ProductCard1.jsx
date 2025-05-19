import React from "react";
import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";

const ProductCard1 = (props) => {
  const handleAddToCart = () => {
    // Call the onAddToCart prop if provided
    if (props.onAddToCart) {
      props.onAddToCart({
        id: props.id || Math.random().toString(36).substr(2, 9),
        name: props.productdetail,
        price: parseFloat(props.price.replace('£', '')),
        image: props.imgSrc,
        quantity: 1
      });
    }
  };

  return (
    <Card 
      h="100%" 
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <CardBody>
        <Image
          src={props.imgSrc}
          alt={props.productdetail}
          w="100%"
          h="180px"
          objectFit="cover"
          borderRadius="lg"
        />
        <Stack mt='6' spacing='3'>
          <Text 
            size='md' 
            textAlign="left"
            noOfLines={2}
            minH="50px"
          >
            {props.productdetail}
          </Text>
          <Box 
            border="1px solid red" 
            p={1} 
            w="70%" 
            mt={2} 
            fontSize="sm"
            textAlign="center"
          >
            {props.discountmessage}
          </Box>
          <Text fontSize='xl' textAlign="left">
            {props.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex direction="column" w="100%" gap={2}>
          <Button 
            onClick={handleAddToCart}
            _hover={{ bgColor: "#43a047" }} 
            bg='#4caf50' 
            borderRadius="0px" 
            w="100%" 
            color="white"
            leftIcon={<BiShoppingBag />}
          >
            Add to Cart
          </Button>
          <Button 
            as={Link}
            to="/sale"
            variant="outline"
            borderColor="#4caf50"
            color="#4caf50"
            borderRadius="0px" 
            w="100%"
            _hover={{ bgColor: "#e0f2f1" }}
          >
            See More
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default ProductCard1;
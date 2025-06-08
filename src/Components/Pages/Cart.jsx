// import React from "react";
// import {
//   Box, Button, Flex, Text, Heading, 
//   Image, Grid, GridItem, NumberInput,
//   NumberInputField, NumberInputStepper,
//   NumberIncrementStepper, NumberDecrementStepper,
//   SimpleGrid, Link as ChakraLink
// } from "@chakra-ui/react";
// import { DeleteIcon } from "@chakra-ui/icons";
// import Footer from "./Footer";
// import { useSelector, useDispatch } from "react-redux";
// import EmptyCart from "../Optional/EmptyCart";
// import { Link } from "react-router-dom";
// import { deleteToCart, updateQuantity } from "../Redux/cart/cart.actions";
// import { allProducts } from "../ProductsPage/allprooducts";
// import { addToCart } from "../Redux/cart/cart.actions";


// const CartItem = ({ item }) => {
//   const dispatch = useDispatch();
  
//   const handleQuantityChange = (value) => {
//     dispatch(updateQuantity({ id: item.id, quantity: value }));
//   };

//   // Find the full product details from allProducts
//   const getProductDetails = (id) => {
//     for (const brand in allProducts.Brands) {
//       const product = allProducts.Brands[brand].find(p => p.id === id);
//       if (product) return product;
//     }
//     return null;
//   };

//   const product = getProductDetails(item.id) || item;

//   return (
//     <Flex borderBottom="1px solid #ddd" py={4} px={2}>
//       <Box w="120px" flexShrink={0}>
//         <Link to={`/products/${product.id}`}>
//           <Image
//             src={product.image_link}
//             alt={product.name}
//             objectFit="contain"
//             boxSize="120px"
//             cursor="pointer"
//           />
//         </Link>
//       </Box>
      
//       <Box flex={1} ml={4}>
//         <Link to={`/products/${product.id}`}>
//           <Heading size="md" mb={2} _hover={{ color: "blue.500" }}>
//             {product.name}
//           </Heading>
//         </Link>
//         <Text fontSize="sm" color="gray.600" mb={2}>
//           Sold by: {product.brand || "Dudra UK"}
//         </Text>
//         <Text fontSize="lg" fontWeight="bold" mb={4}>
//           £{(product.price * (item.quantity || 1)).toFixed(2)}
//         </Text>
        
//         <Flex align="center">
//           <NumberInput 
//             min={1} 
//             max={10} 
//             value={item.quantity || 1}
//             onChange={handleQuantityChange}
//             width="100px"
//             mr={4}
//           >
//             <NumberInputField />
//             <NumberInputStepper>
//               <NumberIncrementStepper />
//               <NumberDecrementStepper />
//             </NumberInputStepper>
//           </NumberInput>
          
//           <Button
//             variant="ghost"
//             colorScheme="red"
//             leftIcon={<DeleteIcon />}
//             onClick={() => dispatch(deleteToCart(item.id))}
//           >
//             Delete
//           </Button>
//         </Flex>
//       </Box>
//     </Flex>
//   );
// };

// const Cart = () => {
//   const cartItems = useSelector((state) => state.cartManager.products);
//   const dispatch = useDispatch();
  
//   const subtotal = cartItems.reduce((acc, item) => 
//     acc + (parseFloat(item.price) * (item.quantity || 1)), 0);

//   // Get 4 random products as frequently bought together items
//   const getRandomProducts = () => {
//     const allBrandsProducts = Object.values(allProducts.Brands).flat();
//     const shuffled = [...allBrandsProducts].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, 4);
//   };

//   const frequentlyBoughtTogether = getRandomProducts();

//   return (
//     <Box maxW="1200px" mx="auto" px={4} py={8}>
//       {cartItems.length === 0 ? (
//         <EmptyCart />
//       ) : (
//         <Grid templateColumns="repeat(4, 1fr)" gap={6}>
//           {/* Main Cart Items */}
//           <GridItem colSpan={3}>
//             <Heading size="xl" mb={6} borderBottom="2px solid #ddd" pb={4}>
//               Shopping Basket ({cartItems.length} items)
//             </Heading>
            
//             {cartItems.map((item) => (
//               <CartItem key={item.id} item={item} />
//             ))}
//           </GridItem>

//           {/* Order Summary */}
//           <GridItem colSpan={1}>
//             <Box border="1px solid #ddd" p={4} borderRadius="md">
//               <Heading size="md" mb={4}>
//                 Order Summary
//               </Heading>
              
//               <Flex justify="space-between" mb={6} borderTop="1px solid #ddd" pt={4}>
//                 <Text fontSize="lg" fontWeight="bold">Order Total:</Text>
//                 <Text fontSize="lg" fontWeight="bold">£{subtotal.toFixed(2)}</Text>
//               </Flex>

//               <Link to="/checkout">
//                 <Button
//                   colorScheme="blue"
//                   size="lg"
//                   width="full"
//                   mb={4}
//                 >
//                   Proceed to Checkout
//                 </Button>
//               </Link>
              
//               <Text fontSize="sm" color="gray.600" textAlign="center">
//                 By placing your order, you agree to Dudra UK's 
//                 <Button variant="link" color="blue.600" ml={1}>
//                   Privacy Policy
//                 </Button>
//               </Text>
//             </Box>
//           </GridItem>
//         </Grid>
//       )}

//       {/* Frequently Bought Together Section */}
//       {cartItems.length > 0 && (
//         <Box mt={12}>
//           <Heading size="lg" mb={6}>Frequently Bought Together</Heading>
//           <SimpleGrid columns={[1, 2, 4]} spacing={6}>
//             {frequentlyBoughtTogether.map((product) => (
//               <Box 
//                 key={product.id} 
//                 borderWidth="1px" 
//                 borderRadius="md" 
//                 p={4}
//                 _hover={{ shadow: 'md' }}
//               >
//                 <Link to={`/products/${product.id}`}>
//                   <Image 
//                     src={product.image_link} 
//                     alt={product.name}
//                     objectFit="contain"
//                     h="150px"
//                     w="100%"
//                     mb={4}
//                     cursor="pointer"
//                   />
//                 </Link>
//                 <Link to={`/products/${product.id}`}>
//                   <Text fontWeight="semibold" mb={2} _hover={{ color: "blue.500" }}>
//                     {product.name}
//                   </Text>
//                 </Link>
//                 <Text color="blue.600" fontWeight="bold" mb={4}>
//                   £{product.price}
//                 </Text>
//                 <Button 
//                   colorScheme="blue" 
//                   size="sm" 
//                   w="100%"
//                   onClick={() => dispatch(addToCart({...product, quantity: 1}))}
//                 >
//                   Add to Cart
//                 </Button>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </Box>
//       )}

//       <Footer />
//     </Box>
//   );
// };

// export default Cart;












import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Heading, Image, Grid, GridItem, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, SimpleGrid, Link as ChakraLink } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../Optional/EmptyCart";
import { Link } from "react-router-dom";
import { deleteToCart, updateQuantity, addToCart } from "../Redux/cart/cart.actions";
import { db } from "../Pages/firebase"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleQuantityChange = (value) => {
    dispatch(updateQuantity({ id: item.id, quantity: value }));
  };

  return (
    <Flex borderBottom="1px solid #ddd" py={4} px={2}>
      <Box w="120px" flexShrink={0}>
        <Link to={`/products/${item.id}`}>
          <Image
            src={item.image_link}
            alt={item.name}
            objectFit="contain"
            boxSize="120px"
            cursor="pointer"
            onError={(e) => { e.target.src = "https://via.placeholder.com/120?text=No+Image"; }}
          />
        </Link>
      </Box>
      <Box flex={1} ml={4}>
        <Link to={`/products/${item.id}`}>
          <Heading size="md" mb={2} _hover={{ color: "blue.500" }}>
            {item.name}
          </Heading>
        </Link>
        <Text fontSize="sm" color="gray.600" mb={2}>
          Sold by: {item.brand || "Dudra UK"}
        </Text>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          £{(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
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
  const [frequentlyBought, setFrequentlyBought] = useState([]);

  useEffect(() => {
    const fetchFrequentlyBought = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        setFrequentlyBought(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Error fetching frequently bought products:", error);
      }
    };

    fetchFrequentlyBought();
  }, []);

  const subtotal = cartItems.reduce((acc, item) => 
    acc + (parseFloat(item.price) * (item.quantity || 1)), 0);

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem colSpan={3}>
            <Heading size="xl" mb={6} borderBottom="2px solid #ddd" pb={4}>
              Shopping Basket ({cartItems.length} items)
            </Heading>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </GridItem>
          <GridItem colSpan={1}>
            <Box border="1px solid #ddd" p={4} borderRadius="md">
              <Heading size="md" mb={4}>
                Order Summary
              </Heading>
              <Flex justify="space-between" mb={6} borderTop="1px solid #ddd" pt={4}>
                <Text fontSize="lg" fontWeight="bold">Order Total:</Text>
                <Text fontSize="lg" fontWeight="bold">£{subtotal.toFixed(2)}</Text>
              </Flex>
              <Link to="/checkout">
                <Button colorScheme="blue" size="lg" width="full" mb={4}>
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
      {cartItems.length > 0 && (
        <Box mt={12}>
          <Heading size="lg" mb={6}>Frequently Bought Together</Heading>
          <SimpleGrid columns={[1, 2, 4]} spacing={6}>
            {frequentlyBought.map((product) => (
              <Box 
                key={product.id} 
                borderWidth="1px" 
                borderRadius="md" 
                p={4}
                _hover={{ shadow: 'md' }}
              >
                <Link to={`/products/${product.id}`}>
                  <Image 
                    src={product.image_link} 
                    alt={product.name}
                    objectFit="contain"
                    h="150px"
                    w="100%"
                    mb={4}
                    cursor="pointer"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                  />
                </Link>
                <Link to={`/products/${product.id}`}>
                  <Text fontWeight="semibold" mb={2} _hover={{ color: "blue.500" }}>
                    {product.name}
                  </Text>
                </Link>
                <Text color="blue.600" fontWeight="bold" mb={4}>
                  £{product.price}
                </Text>
                <Button 
                  colorScheme="blue" 
                  size="sm" 
                  w="100%"
                  onClick={() => dispatch(addToCart({...product, quantity: 1}))}
                >
                  Add to Cart
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default Cart;
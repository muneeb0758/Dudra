import React from 'react';
import Shop from '../../ProductsPage/ProductPage';

const FruitsVeg = () => {
  return <Shop categoryFilter="Fruits & Veg" />;
};

export default FruitsVeg;

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { allProducts } from '../../ProductsPage/allprooducts';
// import {
//   Box,
//   Image,
//   SimpleGrid,
//   Flex,
//   Heading,
//   Text,
//   Button,
//   useDisclosure,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useToast,
// } from '@chakra-ui/react';
// import { CheckCircleIcon } from '@chakra-ui/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../Redux/cart/cart.actions';
// import { Link } from 'react-router-dom';

// const FruitsVeg = () => {
//   const [products, setProducts] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [modalProps, setModalProps] = React.useState({});
//   const toast = useToast();
//   const dispatch = useDispatch();
//   const cartProducts = useSelector((state) => state.cartManager.products);

//   // Calculate cart total
//   const cartTotal = cartProducts.reduce((acc, p) => {
//     return acc + Number(p.price || 0);
//   }, 0);

//   // Filter products to only show fruits
//   React.useEffect(() => {
//     setLoading(true);
    
//     // Get all fruit products from different categories
//     const fruitProducts = [
//       // From Fruits & Veg category
//       ...(allProducts['Fruits & Veg'] || []).filter(p => 
//         p.dietary?.includes('Fruit') || p.name.toLowerCase().includes('fruit')
//       ),
      
//       // From individual fruit categories
//       ...(allProducts['Fruits'] || []),
      
//       // From other categories where fruits might be
//       ...(allProducts['Breakfast'] || []).filter(p => 
//         p.dietary?.includes('Fruit') || p.name.toLowerCase().includes('fruit')
//       ),
//       ...(allProducts['Snacks'] || []).filter(p => 
//         p.dietary?.includes('Fruit') || p.name.toLowerCase().includes('fruit')
//       ),
//     ];

//     // Remove duplicates by id
//     const uniqueProducts = fruitProducts.filter((product, index, self) =>
//       index === self.findIndex((p) => p.id === product.id)
//     );

//     setProducts(uniqueProducts);
//     setLoading(false);
//   }, []);

//   const handleModal = (data) => {
//     setModalProps(data);
//     onOpen();
//   };

//   const handleAdd = (data) => {
//     toast({
//       position: "top-left",
//       duration: 1200,
//       render: () => (
//         <Flex
//           color="white"
//           border="4px solid white"
//           p={"10px"}
//           bgColor="green.400"
//         >
//           <CheckCircleIcon w={30} h={30} />
//           <Text
//             size="lg"
//             ml="15px"
//           >{`${modalProps.name} is now in your cart!!!`}</Text>
//         </Flex>
//       ),
//     });
//     dispatch(addToCart(data));
//     onClose();
//   };

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" minH="50vh">
//         <Text>Loading fruits...</Text>
//       </Flex>
//     );
//   }

//   return (
//     <Box w="90%" m="auto" mt={["12", "12", "12", "12", "auto"]}>
//       <Heading mb="30px">Fresh Fruits</Heading>
      
//       {products.length === 0 ? (
//         <Text>No fruits available at the moment.</Text>
//       ) : (
//         <>
//           <SimpleGrid w="100%" columns={[2, 2, 3]} spacing="40px" pt="10">
//             {products.map((product) => (
//               <Box 
//                 key={product.id} 
//                 borderWidth="1px" 
//                 borderRadius="lg" 
//                 overflow="hidden"
//                 p="4"
//               >
//                 <Image 
//                   src={product.image_link} 
//                   alt={product.name}
//                   h="200px"
//                   w="100%"
//                   objectFit="contain"
//                 />
//                 <Box mt="4">
//                   <Text fontWeight="bold">{product.name}</Text>
//                   <Text>{product.brand}</Text>
//                   <Text>${product.price || 'Price not available'}</Text>
//                   <Button 
//                     mt="2" 
//                     colorScheme="blue"
//                     onClick={() => handleModal(product)}
//                   >
//                     View Details
//                   </Button>
//                 </Box>
//               </Box>
//             ))}
//           </SimpleGrid>

//           {/* Product Modal */}
//           <Modal
//             isCentered
//             onClose={onClose}
//             isOpen={isOpen}
//             motionPreset="slideInBottom"
//             size={["sm", "md", "2xl"]}
//           >
//             <ModalOverlay />
//             <ModalContent borderRadius="0px">
//               <ModalHeader
//                 p="10px"
//                 bgColor="gainsboro"
//                 borderBottom="1px solid black"
//                 fontSize="20px"
//               >
//                 {`${modalProps.name}`}
//               </ModalHeader>
//               <ModalCloseButton />
//               <ModalBody pt="35px" pb="35px">
//                 <Flex mt="10px" justify="space-between">
//                   <Box w="30%">
//                     <Image w="100%" src={modalProps.image_link} />
//                   </Box>
//                   <Box width="50%">
//                     <Text mb="15px" fontSize="xl">
//                       {modalProps.name}
//                     </Text>
//                     <Text mb="15px">{`Brand - ${modalProps.brand || 'Generic'}`}</Text>
//                     <Text mb="15px">{modalProps.description}</Text>
//                     <Heading>{`$${modalProps.price || 'Price not available'}`}</Heading>
//                   </Box>
//                 </Flex>
//                 <Text fontSize="20px">{"Subtotal:"}</Text>
//                 <Flex justify="space-between">
//                   <Text fontSize="20px">{`( ${cartProducts.length} items in your cart)`}</Text>
//                   <Text fontSize="20px">{`$${cartTotal.toFixed(2)}`}</Text>
//                 </Flex>
//                 <Flex
//                   p="15px"
//                   mt="25px"
//                   borderTop="1px solid black"
//                   borderBottom="1px solid black"
//                   justify="space-between"
//                   direction={["column", "column", "row"]}
//                 >
//                   <Button
//                     borderRadius="0px"
//                     bgColor="white"
//                     border="1px solid black"
//                     color="black"
//                     w={["100%", "100%", "48%"]}
//                     display="block"
//                     mb="8px"
//                     onClick={() => handleAdd(modalProps)}
//                   >
//                     Add To Cart
//                   </Button>
//                   <Box w={["100%", "100%", "48%"]}>
//                     <Link to="/cart">
//                       <Button
//                         borderRadius="0px"
//                         bgColor="black"
//                         color="white"
//                         w="100%"
//                         display="block"
//                         _hover={{ bgColor: "#28bdb7" }}
//                       >
//                         VIEW CART
//                       </Button>
//                     </Link>
//                   </Box>
//                 </Flex>
//               </ModalBody>
//               <ModalFooter></ModalFooter>
//             </ModalContent>
//           </Modal>
//         </>
//       )}
//     </Box>
//   );
// };

// export default FruitsVeg;
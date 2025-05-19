import React, { useState } from "react";
import { 
  Box, Image, Text, Flex, Button, Heading, Badge, Stack, 
  Divider, useToast, Grid, GridItem, Tabs, TabList, 
  TabPanels, Tab, TabPanel, Table, Thead, Tbody, Tr, Th, Td,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  Tag, Icon, Link, Select, Input, Textarea
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { allProducts } from "../ProductsPage/allprooducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cart/cart.actions";
import { FaStar, FaRegStar, FaShippingFast, FaMoneyBillWave, FaLock } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { BsChatQuote } from "react-icons/bs";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find product
  let product = null;
  for (const brand in allProducts.Brands) {
    product = allProducts.Brands[brand].find(p => p.id === id);
    if (product) break;
  }

  // Image handling
  const images = [
    product?.image_link,
    'https://i.imgur.com/deEcxAn.jpg',
    'https://i.imgur.com/PwSoVLk.jpg',
    'https://i.imgur.com/ULE5L7p.jpg'
  ];

  const handleImageError = (e) => {
    e.target.src = "https://media.istockphoto.com/id/1206575314/vector/image-unavailable-icon.jpg?s=612x612&w=0&k=20&c=7aypXCTzJ42V0xRHJ08Nq1K6fPgY5IB_D4fXbWloX_w=";
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: quantity
    }));
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top"
    });
  };

  if (!product) {
    return <Box>Product not found</Box>;
  }

  // Mock data for demonstration
  const specifications = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "Package Type", value: product.packageType },
    { label: "Dietary Features", value: product.dietary?.join(", ") || "N/A" },
    { label: "Item Weight", value: "850g per can" },
    { label: "Stock", value: "In Stock (250+ units)" },
  ];

  const reviews = [
    { user: "John D.", rating: 4, comment: "Great product, fast delivery!", date: "2023-08-15" },
    { user: "Sarah M.", rating: 5, comment: "Excellent quality, will buy again", date: "2023-08-10" },
  ];

  return (
    <Box maxW="1400px" mx="auto" p={[4, 6, 8]}>
      {/* Breadcrumb */}
      <Text fontSize="sm" color="gray.600" mb={4}>
        Category > {product.category} > {product.name}
      </Text>

      <Grid templateColumns={["1fr", "1fr", "1fr 1fr", "2fr 1fr"]} gap={8}>
        {/* Image Gallery */}
        <Box>
          <Box border="1px solid" borderColor="gray.200" borderRadius="lg" p={4} mb={4}>
            <Image
              src={images[selectedImage]}
              objectFit="contain"
              h={["300px", "400px", "500px"]}
              w="100%"
              onError={handleImageError}
              alt={product.name}
              as={Link}
            />
          </Box>
          
          <Grid templateColumns="repeat(4, 1fr)" gap={2} mb={8}>
            {images.map((img, index) => (
              <Box
                key={index}
                border={selectedImage === index ? "2px solid" : "1px solid"}
                borderColor={selectedImage === index ? "blue.500" : "gray.200"}
                borderRadius="md"
                p={1}
                cursor="pointer"
                onClick={() => setSelectedImage(index)}
              >
                <Image src={img} h="80px" w="100%" objectFit="contain" />
              </Box>
            ))}
          </Grid>

          {/* Product Description */}
          <Box bg="gray.50" p={4} borderRadius="lg" mb={8}>
            <Heading size="md" mb={4}>Product Description</Heading>
            <Text lineHeight="tall">{product.description}</Text>
          </Box>
        </Box>

        {/* Product Details */}
        <Box>
          <Stack spacing={6} position="sticky" top="20px">
            <Heading size="xl" fontWeight="bold">{product.name}</Heading>
            
            <Flex align="center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  as={star <= 4 ? FaStar : FaRegStar}
                  color="yellow.400"
                  w={6}
                  h={6}
                  mr={1}
                />
              ))}
              <Text ml={2} color="gray.600">(128 reviews)</Text>
            </Flex>

            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                £{product.price}
              </Text>
              <Text color="green.600" fontSize="sm">Save £5.00 (20%)</Text>
            </Box>

            <Divider />

            {/* Quantity Selector */}
            <Flex align="center">
              <Text mr={4}>Quantity:</Text>
              <Select 
                w="100px" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Select>
            </Flex>

            <Button
              colorScheme="blue"
              size="lg"
              py={6}
              leftIcon={<BiPackage />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Button
              variant="outline"
              size="lg"
              py={6}
              leftIcon={<FiShare2 />}
            >
              Share This Product
            </Button>

            {/* Delivery Info */}
            <Stack spacing={3}>
              <Flex align="center">
                <Icon as={FaShippingFast} mr={2} color="green.500" />
                <Text>FREE delivery <strong>Tomorrow</strong></Text>
              </Flex>
              
              <Flex align="center">
                <Icon as={FaMoneyBillWave} mr={2} color="green.500" />
                <Text>30-day returns policy</Text>
              </Flex>
              
              <Flex align="center">
                <Icon as={FaLock} mr={2} color="green.500" />
                <Text>Secure checkout</Text>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Grid>

      {/* Specifications Table */}
      <Box my={12}>
        <Heading size="lg" mb={6}>Product Specifications</Heading>
        <Table variant="striped">
          <Tbody>
            {specifications.map((spec, index) => (
              <Tr key={index}>
                <Th w="30%">{spec.label}</Th>
                <Td>{spec.value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Reviews Section */}
      <Box my={12}>
        <Heading size="lg" mb={6}>
          <Icon as={BsChatQuote} mr={2} /> Customer Reviews
        </Heading>
        
        <Flex mb={8} justify="space-between" align="center">
          <Box>
            <Text fontSize="2xl" fontWeight="bold">4.2 out of 5</Text>
            <Flex align="center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  as={star <= 4 ? FaStar : FaRegStar}
                  color="yellow.400"
                  w={5}
                  h={5}
                  mr={1}
                />
              ))}
            </Flex>
            <Text color="gray.600">128 global ratings</Text>
          </Box>
          
          <Button colorScheme="blue">Write a Review</Button>
        </Flex>

        {reviews.map((review, index) => (
          <Box key={index} mb={6} p={4} borderWidth="1px" borderRadius="md">
            <Flex mb={2}>
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  as={i < review.rating ? FaStar : FaRegStar}
                  color="yellow.400"
                  w={5}
                  h={5}
                  mr={1}
                />
              ))}
            </Flex>
            <Text fontWeight="bold" mb={2}>{review.user}</Text>
            <Text mb={2}>{review.comment}</Text>
            <Text color="gray.600" fontSize="sm">{review.date}</Text>
          </Box>
        ))}
      </Box>

      {/* Frequently Bought Together */}
      <Box my={12}>
        <Heading size="lg" mb={6}>Frequently Bought Together</Heading>
        <Flex wrap="wrap" gap={6}>
          {Object.values(allProducts.Brands)
            .flat()
            .slice(0, 4)
            .map((relatedProduct) => (
              <Box key={relatedProduct.id} w="250px" borderWidth="1px" borderRadius="md" p={4}>
                <Image 
                  src={relatedProduct.image_link} 
                  h="150px" 
                  w="100%" 
                  objectFit="contain" 
                  mb={4}
                />
                <Text fontWeight="500" noOfLines={2} mb={2}>
                  {relatedProduct.name}
                </Text>
                <Text color="blue.600" fontWeight="bold" mb={4}>
                  £{relatedProduct.price}
                </Text>
                <Button size="sm" w="100%">Add to Cart</Button>
              </Box>
            ))}
        </Flex>
      </Box>

      {/* Product Q&A */}
      <Box my={12}>
        <Heading size="lg" mb={6}>Customer Questions & Answers</Heading>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Is this product gluten-free?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              Yes, this product is certified gluten-free and suitable for celiac diets.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default ProductDetail;
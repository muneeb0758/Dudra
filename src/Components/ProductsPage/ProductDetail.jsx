import React from "react";
import { Box, Image, Text, Flex, Button, Heading, Badge, Stack, Divider, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { allProducts } from "../ProductsPage/allprooducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cart/cart.actions"; // Adjust path to your cart actions

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find product based on the id
  let product = null;
  for (const brand in allProducts.Brands) {
    product = allProducts.Brands[brand].find(p => p.id === id);
    if (product) break;
  }

  // Image error handler
  const handleImageError = (e) => {
    const rating = Math.ceil(Math.random() * 4);
           e.target.src = rating < 3 ? "https://i.imgur.com/5EzYhOA.jpg" : "https://media.istockphoto.com/id/1206575314/vector/image-unavailable-icon.jpg?s=612x612&w=0&k=20&c=7aypXCTzJ42V0xRHJ08Nq1K6fPgY5IB_D4fXbWloX_w="
  e.target.error = null;
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: 1 // Default quantity
    }));
    
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  };

  if (!product) {
    return <Box>Product not found</Box>;
  }

  return (
    <Box maxW="1200px" mx="auto" p={[4, 6, 8]}>
      <Flex direction={["column", "row"]} gap={[6, 8, 12]}>
        {/* Image Section */}
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <Box
            border="1px solid"
            borderColor="gray.200"
            w="100%"
            h={["300px", "400px", "500px"]}
            p={4}
            borderRadius="lg"
            boxShadow="md"
          >
            <Image
              _hover={{
                transform: "translateY(-9px)"
              }}

              src={product.image_link}
              h="100%"
              w="100%"
              objectFit="contain"
              onError={handleImageError}
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
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

        {/* Product Info */}
        <Box flex={1}>
          <Stack spacing={6}>
            <Box>
              <Heading size="xl" mb={2} fontWeight="bold" color="gray.800">
                {product.name}
              </Heading>
              <Text fontSize="lg" color="gray.500" mb={4}>
                by {product.brand}
              </Text>
              <Divider borderColor="gray.200" />
            </Box>

            {product.price && (
              <Box>
                <Text fontSize="sm" color="gray.500">Price</Text>
                <Heading size="2xl" color="blue.600" mb={2}>
                  ${product.price}
                </Heading>
                <Divider borderColor="gray.200" />
              </Box>
            )}

            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={2}>Description</Text>
              <Text fontSize="md" color="gray.600" lineHeight="tall">
                {product.description}
              </Text>
              <Divider borderColor="gray.200" mt={4} />
            </Box>

            {product.dietary && product.dietary.length > 0 && (
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>Dietary Information</Text>
                <Flex wrap="wrap" gap={2}>
                  {product.dietary.map(item => (
                    <Badge
                      key={item}
                      colorScheme="green"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      {item}
                    </Badge>
                  ))}
                </Flex>
                <Divider borderColor="gray.200" mt={4} />
              </Box>
            )}

            <Button
              flex="1"
              bgColor="black"
              color="white"
              size="lg"
              colorScheme="blue"
              borderRadius="md"
              py={6}
              fontSize="lg"
              fontWeight="bold"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bgColor: "#28bdb7"
              }}
              transition="all 0.2s"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductDetail;

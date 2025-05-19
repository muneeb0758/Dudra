import React from 'react';
import { BiShoppingBag } from "react-icons/bi";
import { Box, Center, Heading, Text, Image, Flex, Button, Card, CardBody, Stack, Divider, CardFooter, Badge } from "@chakra-ui/react";
import SliderImage from './Slider/SliderImage';
import { Link } from "react-router-dom";
import dudracar from './images/dudracar.png';
import banner from './images/banner.png';
import ProductSlider1 from './Slider/ProductSlider1';
import BrandSlider from './Slider/BrandSlider';
import Footer from './Footer';
import { allProducts } from '../ProductsPage/allprooducts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cart/cart.actions';

// Green color scheme constants
const COLORS = {
  primary: "#2e856e",       // Dark teal green
  accent: "#4caf93",        // Medium teal
  lightAccent: "#e0f2f1",   // Very light teal
  price: "#388e3c",         // Green for prices
  button: "#4caf50",        // Material green
  buttonHover: "#43a047",   // Darker green
  badge: "#2e7d32",         // Dark green for badge
  text: "#2d3748",          // Dark gray for text
  lightText: "#718096"      // Light gray for secondary text
};

const getRandomProducts = (count) => {
  // Flatten all products from all brands
  const allProductsArray = Object.values(allProducts.Brands).flat();
  
  // If we have fewer products than requested, return all
  if (allProductsArray.length <= count) return allProductsArray;
  
  // Get random products without duplicates
  const shuffled = [...allProductsArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};




const Home = () => {

    const dispatch = useDispatch();

  return (
    <div>
      {/* **********************************************************Slider************************************** */}
      <Box marginBottom={12}>
        <SliderImage />
      </Box>
    
      {/* **********************************************************shop by Category************************************** */}
      <Text fontSize="3xl" mb={6} mt={6} align="center" fontWeight="bold" color={COLORS.primary}>
        Shop by Category
      </Text>

      <Box mt={8} w="85%" mx="auto">
        <Flex wrap="wrap" justify="space-between" gap={4}>
          <Link to='/fruits'>
            <Box position="relative">
              <Image boxSize="150px" objectFit="cover" borderRadius="full" src="https://i.imgur.com/Mjhd6vT.jpg" alt="Fruits & Veg" />
              <Badge    mt={2}
                bg={COLORS.badge}
                color="white"
                px={4}
                py={1}
                borderRadius="md"
                textAlign="center"
                display="inline-block">
                Fruits
              </Badge>
            </Box>
          </Link>
          <Link to='/snacks'>
            <Box position="relative">
              <Image boxSize="150px" borderRadius="full" objectFit="cover" src="https://i.imgur.com/EgBLfRb.jpg" alt="Snacks" />
              <Badge    mt={2}
                bg={COLORS.badge}
                color="white"
                px={4}
                py={1}
                borderRadius="md"
                textAlign="center"
                display="inline-block">
                Snacks
              </Badge>
            </Box>
          </Link>
          <Link to='/spices'>
            <Box position="relative">
              <Image boxSize="150px" objectFit="cover" borderRadius="full" src="https://i.imgur.com/i5lej1W.jpg" alt="Spices" />
              <Badge    mt={2}
                bg={COLORS.badge}
                color="white"
                px={4}
                py={1}
                borderRadius="md"
                textAlign="center"
                display="inline-block">
                Spices
              </Badge>
            </Box>
          </Link>
          <Link to='/bathbeauty'>
            <Box position="relative">
              <Image boxSize="150px" objectFit="cover" borderRadius="full" src="https://i.imgur.com/OyU6PfV.jpg" alt="Bath & Beauty" />
              <Badge    mt={2}
                bg={COLORS.badge}
                color="white"
                px={4}
                py={1}
                borderRadius="md"
                textAlign="center"
                display="inline-block">
                Beauty
              </Badge>
            </Box>
          </Link>
          <Link to='/packaging'>
            <Box position="relative">
              <Image boxSize="150px" borderRadius="full" objectFit="cover" src="https://i.imgur.com/FXMSePz.jpg" alt="Packaging" />
              <Badge    mt={2}
                bg={COLORS.badge}
                color="white"
                px={4}
                py={1}
                borderRadius="md"
                textAlign="center"
                display="inline-block">
                Packaging
              </Badge>
            </Box>
          </Link>
        </Flex>
      </Box>

      {/* **********************************************************Missed Black Friday************************************** */}
     <Text fontSize="3xl" mt={8} mb={6} align="center" fontWeight="bold" color={COLORS.primary}>
    Missed Black Friday?
</Text>
<Box mt={8}><ProductSlider1 /></Box>

{/* **********************************************************Trending Offers************************************** */}


      {/* **********************************************************Logos************************************** */}
 {/* Brand Logos Section - Full Width, No Padding */}
<Box mt={12} mb={8} width="100%" overflow="hidden">
  <Flex 
    width="100%"
    height="120px" // Fixed height for all logos
  >
    {/* Logo 1 - Dudra Van */}
    <Box flex={1} height="100%" position="relative" borderRight="1px solid #f0f0f0">
      <Image
        src="https://i.imgur.com/eutfBfy.jpg"
        alt="Dudra Van"
        width="100%"
        height="100%"
        objectFit="cover" // Changed to cover for full width stretch
        objectPosition="center"
      />
    </Box>

    {/* Logo 2 */}
    <Box flex={1} height="100%" position="relative" borderRight="1px solid #f0f0f0">
      <Image
        src="https://i.imgur.com/jp47hHY.jpg"
        alt="Brand 2"
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="center"
      />
    </Box>

    {/* Logo 3 */}
    <Box flex={1} height="100%" position="relative">
      <Image
        src="https://i.imgur.com/5YnP6z2.png"
        alt="Brand 3"
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="center"
      />
    </Box>
  </Flex>
</Box>

      {/* **********************************************************What People Are Buying Right Now************************************** */}
    
<Text fontSize="3xl" mt={8} mb={6} align="center" fontWeight="bold" color={COLORS.primary}>
  What People Are Buying Right Now
</Text>

<Box px={[4, 6, 8, 12]} maxW="1800px" mx="auto">
  {/* Create rows with 6 products each */}
  {[...Array(Math.ceil(30 / 6))].map((_, rowIndex) => {
    const rowProducts = getRandomProducts(30).slice(rowIndex * 6, (rowIndex + 1) * 6);
    
    return (
      <Flex 
        key={rowIndex}
        direction="row" 
        wrap="wrap"
        justify={["center", "center", "space-between"]}
        mb={8}
        gap={[4, 4, 4, 4]} // Adjusted gap values
      >
        {rowProducts.map((product) => (
          <Card 
            key={product.id} 
            w={['45%', '45%', '30%', '15.5%']} // Key change here for desktop
            minH="380px" // Slightly reduced height
            borderWidth="1px" 
            borderColor="gray.100"
            display="flex"
            flexDirection="column"
            flexShrink={0}
          >
            <CardBody flex={1} display="flex" flexDirection="column">
              {/* Image Container */}
              <Box 
                flexShrink={0}
                h="160px" // Slightly reduced height
                w="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={3} // Reduced margin
              >
                <Image 
                  src={product.image_link} 
                  alt={product.name} 
                  maxH="100%"
                  maxW="100%"
                  objectFit="contain"
                  fallbackSrc="https://via.placeholder.com/160"
                />
              </Box>
              
              {/* Product Info */}
              <Stack spacing={2} flex={1} px={1}> {/* Reduced spacing and padding */}
                <Text 
                  color={COLORS.lightText} 
                  minH="50px" // Reduced height
                  display="flex" 
                  alignItems="center"
                  textAlign="center"
                  justifyContent="center"
                  fontSize="sm" // Smaller font
                  lineHeight="tight"
                >
                  {product.name}
                </Text>
                
                <Flex 
                  align="center" 
                  justify="center"
                  minH="28px" // Reduced height
                  wrap="wrap"
                  gap={1} // Reduced gap
                >
                  <Heading size="sm" color={COLORS.price} textAlign="center"> {/* Smaller heading */}
                    £{product.price || 'Price not available'}
                  </Heading>
                  {product.price && (
                    <Badge 
                      bg={COLORS.badge} 
                      color="white" 
                      whiteSpace="nowrap"
                      fontSize="xs" // Smaller badge
                    >
                      {Math.random() > 0.5 ? 'SAVE 20%' : 'BESTSELLER'}
                    </Badge>
                  )}
                </Flex>
              </Stack>
            </CardBody>
            
            <Divider />
            
            {/* Footer */}
            <CardFooter p={0}>
              <Button 
                w="100%"
                borderRadius={0}
                bg={COLORS.button} 
                color="white"
                _hover={{ bg: COLORS.buttonHover }}
                leftIcon={<BiShoppingBag size="16px" />} // Smaller icon
                py={4} // Reduced padding
                fontSize="sm" // Smaller font
               onClick={() => dispatch(addToCart({
                      ...product,
                      quantity: 1
                    }))}
                  >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Flex>
    );
  })}
</Box>

      {/* **********************************************************Brand of the Month************************************** */}
      <Text fontSize="3xl" mt={8} mb={6} align="center" fontWeight="bold" color={COLORS.primary}>
        Brand of the Month
      </Text>
      <Box w='90%' margin={'auto'}>
        <Flex gap={12} direction={['column', 'column', 'row']} w={"95%"} m='auto' justifyContent={'space-between'}>
          <Box w={['100%', '100%', '55%']}>
            <Image w={"120%"} h='100%' src='https://i.imgur.com/QyX4txm.jpg' alt='brand-feature' />
          </Box>
          <Box w={['100%', '100%', '65%']}>
            <BrandSlider />
          </Box>
        </Flex>
      </Box>

      {/* **********************************************************before footer Images************************************** */}
      <Center>
        <Box w={'90%'} mt={8}>
          <Link>
            <Image src={dudracar} alt='promo-banner' />
          </Link>
        </Box>
      </Center>
      <Center>
        <Box w={'90%'} mt={8}>
          <Link>
            <Image src={banner} alt='promo-banner-2' />
          </Link>
        </Box>
      </Center>
      
      <Footer />
    </div>
  );
}

export default Home;
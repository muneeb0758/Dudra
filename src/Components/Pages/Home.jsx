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
  // Flatten all products from all top-level keys
  const allProductsArray = Object.values(allProducts).flatMap(category => 
    Array.isArray(category) ? category : Object.values(category).flat()
  );
  // Remove duplicates based on id
  const uniqueProducts = Array.from(
    new Map(allProductsArray.map(product => [product.id, product])).values()
  );
  
  console.log("Total unique products available:", uniqueProducts.length); // Debug log
  
  if (uniqueProducts.length <= count) {
    console.warn(`Requested ${count} products, but only ${uniqueProducts.length} available`);
    return uniqueProducts;
  }
  
  // Shuffle and select count products
  const shuffled = [...uniqueProducts].sort(() => 0.5 - Math.random());
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
          {[
            { name: "Fruits", image: "https://i.imgur.com/Mjhd6vT.jpg", link: "/fruits" },
            { name: "Snacks", image: "https://i.imgur.com/EgBLfRb.jpg", link: "/snacks" },
            { name: "Spices", image: "https://i.imgur.com/i5lej1W.jpg", link: "/spices" },
            { name: "Beauty", image: "https://i.imgur.com/OyU6PfV.jpg", link: "/bathbeauty" },
            { name: "Packaging", image: "https://i.imgur.com/FXMSePz.jpg", link: "/packaging" }
          ].map((category) => (
            <Link to={category.link} key={category.name}>
              <Box 
                position="relative"
                transition="all 0.2s ease"
                _hover={{
                  transform: 'scale(1.05)',
                  shadow: 'md'
                }}
              >
                <Image 
                  boxSize="150px" 
                  objectFit="cover" 
                  borderRadius="full" 
                  src={category.image} 
                  alt={category.name}
                  border={`2px solid ${COLORS.lightAccent}`}
                  _hover={{
                    borderColor: COLORS.accent
                  }}
                />
                <Badge
                  mt={2}
                  bg={COLORS.badge}
                  color="white"
                  px={4}
                  py={1}
                  borderRadius="md"
                  textAlign="center"
                  display="inline-block"
                  position="absolute"
                  bottom="-10px"
                  left="50%"
                  transform="translateX(-50%)"
                >
                  {category.name}
                </Badge>
              </Box>
            </Link>
          ))}
        </Flex>
      </Box>

      {/* **********************************************************Missed Black Friday************************************** */}
      <Text fontSize="3xl" mt={8} mb={6} align="center" fontWeight="bold" color={COLORS.primary}>
        Missed Black Friday?
      </Text>
      <Box mt={8}><ProductSlider1 /></Box>

      {/* **********************************************************Logos************************************** */}
      <Box mt={12} mb={8} width="100%" overflow="hidden">
        <Flex width="100%" height="140px">
          {[
            { src: "https://i.imgur.com/eutfBfy.jpg", alt: "Dudra Van" },
            { src: "https://i.imgur.com/L4APjwZ.jpg?1", alt: "Brand 2" },
            { src: "https://i.imgur.com/5YnP6z2.png", alt: "Brand 3" }
          ].map((brand, index) => (
            <Box 
              key={index} 
              flex={1} 
              height="100%" 
              position="relative" 
              borderRight={index < 2 ? "1px solid #f0f0f0" : "none"}
              _hover={{
                zIndex: 1
              }}
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
          ))}
        </Flex>
      </Box>

      {/* **********************************************************What People Are Buying Right Now************************************** */}
     <Text fontSize="3xl" mt={8} mb={6} align="center" fontWeight="bold" color={COLORS.primary}>
  What People Are Buying Right Now
</Text>

<Box px={[4, 6, 8, 12]} maxW="1800px" mx="auto">
  {(() => {
    const totalProducts = 40; // Set desired number of products
    const productsPerRow = 6; // 6 products per row
    const randomProducts = getRandomProducts(totalProducts); // Call once
    
    return [...Array(Math.ceil(totalProducts / productsPerRow))].map((_, rowIndex) => {
      const rowProducts = randomProducts.slice(rowIndex * productsPerRow, (rowIndex + 1) * productsPerRow);
      
      return (
        <Flex 
          key={rowIndex}
          direction="row" 
          wrap="wrap"
          justify={["center", "center", "space-between"]}
          mb={8}
          gap={[4, 4, 4, 4]}
        >
          {rowProducts.map((product) => (
            <Card 
              key={product.id} 
              w={['45%', '45%', '30%', '15.5%']}
              minH="380px"
              borderWidth="1px" 
              borderColor="gray.100"
              display="flex"
              flexDirection="column"
              flexShrink={0}
              transition="all 0.2s ease"
              _hover={{
                shadow: 'lg',
                transform: 'translateY(-5px)',
                borderColor: COLORS.accent
              }}
            >
              <Link to={`/products/${product.id}`}>
                <CardBody flex={1} display="flex" flexDirection="column">
                  <Box 
                    flexShrink={0}
                    h="160px"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={3}
                    overflow="hidden"
                  >
                    <Image 
                      src={product.image_link} 
                      alt={product.name} 
                      maxH="100%"
                      maxW="100%"
                      objectFit="contain"
                      fallbackSrc="https://via.placeholder.com/160"
                      transition="transform 0.3s ease"
                      _hover={{
                        transform: 'scale(1.1)'
                      }}
                    />
                  </Box>
                  
                  <Stack spacing={2} flex={1} px={1}>
                    <Text 
                      color={COLORS.lightText} 
                      minH="50px" 
                      display="flex" 
                      alignItems="center"
                      textAlign="center"
                      justifyContent="center"
                      fontSize="sm"
                      lineHeight="tight"
                      _hover={{
                        color: COLORS.accent
                      }}
                    >
                      {product.name}
                    </Text>
                    
                    <Flex 
                      align="center" 
                      justify="center"
                      minH="28px"
                      wrap="wrap"
                      gap={1}
                    >
                      <Heading size="sm" color={COLORS.price} textAlign="center">
                        £{product.price || 'Price not available'}
                      </Heading>
                      {product.price && (
                        <Badge 
                          bg={COLORS.badge} 
                          color="white" 
                          whiteSpace="nowrap"
                          fontSize="xs"
                        >
                          {Math.random() > 0.5 ? 'SAVE 20%' : 'BESTSELLER'}
                        </Badge>
                      )}
                    </Flex>
                  </Stack>
                </CardBody>
              </Link>
              
              <Divider />
              
              <CardFooter p={0}>
                <Button 
                  w="100%"
                  borderRadius={0}
                  bg={COLORS.button} 
                  color="white"
                  _hover={{ 
                    bg: COLORS.buttonHover,
                    transform: 'translateY(-2px)'
                  }}
                  _active={{ bg: COLORS.primary }}
                  leftIcon={<BiShoppingBag size="16px" />}
                  py={4}
                  fontSize="sm"
                  transition="all 0.2s ease"
                  onClick={() => dispatch(addToCart({
                    ...product,
                    quantity: 1,
                    image: product.image_link // Ensure image is included
                  }))}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      );
    });
  })()}
</Box>

      {/* **********************************************************Brand of the Month************************************** */}
      <Text fontSize="3xl" mt={8} mb={6} align="center" fontWeight="bold" color={COLORS.primary}>
        Brand of the Month
      </Text>
      <Box w='90%' margin={'auto'}>
        <Flex gap={12} direction={['column', 'column', 'row']} w={"95%"} m='auto' justifyContent={'space-between'}>
          <Box 
            w={['100%', '100%', '55%']}
            transition="all 0.3s ease"
            _hover={{
              transform: 'scale(1.02)'
            }}
          >
            <Image w={"120%"} h='100%' src='https://i.imgur.com/ntye4EU.jpg' alt='brand-feature' />
          </Box>
          <Box w={['100%', '100%', '65%']}>
            <BrandSlider />
          </Box>
        </Flex>
      </Box>

      {/* **********************************************************before footer Images************************************** */}
   <Center>
  <Box w="90%" mt={8}>
    <Link>
      <Image 
        src='https://i.imgur.com/yzrtOhI.jpg' 
        alt="promo-banner"
        h="320px"           // 👈 compressed height
        w="100%"            // keep full width
        
        objectFit="cover"   // crop to fill, or use "contain" to shrink
        transition="all 0.3s ease"
        _hover={{
          shadow: 'lg',
          transform: 'translateY(-3px)',
        }}
      />
    </Link>
  </Box>
</Center>


      <Center>
        <Box w={'90%'} mt={8}>
          <Link>
            <Image 
              src={banner} 
              alt='promo-banner-2' 
              transition="all 0.3s ease"
              _hover={{
                shadow: 'lg',
                transform: 'translateY(-3px)'
              }}
            />
          </Link>
        </Box>
      </Center>
      
      <Footer />
    </div>
  );
}

export default Home;
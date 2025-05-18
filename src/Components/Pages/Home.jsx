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

const Home = () => {
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
<Text fontSize="3xl" mt={8} mb={6} align="center" fontWeight="bold" color={COLORS.primary}>
    Trending Offers
</Text>
<Box>
    <Center>
        <Flex direction={['column', 'column', 'row']} gap={6} justify="center" w="95%">
            {/* Product 1 - Kelloggs Breakfast Cereal */}
            <Box w={['100%', '100%', '30%']} borderWidth="1px" borderRadius="lg" p={4} bg="white" h="100%">
                <Center h="180px">
                    <Image src="https://i.imgur.com/WZDyxzS.jpg" w={'60%'} maxH="180px" objectFit="contain" alt="Kelloggs Fruit N Fiber" />
                </Center>
                <Heading fontSize={20} mt={4} color={COLORS.text} minH="60px" display="flex" alignItems="center">Kelloggs Fruit N Fiber</Heading>
                <Text fontSize={13} mt={2} color={COLORS.lightText} minH="60px">
                    High fiber breakfast cereal with dried fruits - 40x45g portion packs
                </Text>
                <Flex align="baseline" mt={2} minH="32px">
                    <Heading size="md" color={COLORS.price} mr={2}>£18.99</Heading>
                    <Text as="del" color={COLORS.lightText} fontSize="sm">£24.99</Text>
                </Flex>
                <Link to="/breakfast">
                    <Button 
                        bg={COLORS.button} 
                        color="white"
                        _hover={{ bg: COLORS.buttonHover }}
                        _active={{ bg: COLORS.primary }}
                        mt={4}
                        w="100%"
                    >
                        SHOP NOW
                    </Button>
                </Link>
            </Box>

            {/* Product 2 - Nature Valley Snack Bars */}
            <Box w={['100%', '100%', '30%']} borderWidth="1px" borderRadius="lg" p={4} bg="white" h="100%">
                <Center h="180px">
                    <Image src="https://i.imgur.com/RBhPP1e.jpg" w={'60%'} maxH="180px" objectFit="contain" alt="Nature Valley Bars" />
                </Center>
                <Heading fontSize={20} mt={4} color={COLORS.text} minH="60px" display="flex" alignItems="center">Nature Valley Protein Bars</Heading>
                <Text fontSize={13} mt={2} color={COLORS.lightText} minH="60px">
                    Protein and cereal bars, 42g each - case of 40
                </Text>
                <Flex align="baseline" mt={2} minH="32px">
                    <Heading size="md" color={COLORS.price} mr={2}>£26.99</Heading>
                    <Text as="del" color={COLORS.lightText} fontSize="sm">£32.99</Text>
                </Flex>
                <Link to="/snacks">
                    <Button 
                        bg={COLORS.button} 
                        color="white"
                        _hover={{ bg: COLORS.buttonHover }}
                        _active={{ bg: COLORS.primary }}
                        mt={4}
                        w="100%"
                    >
                        SHOP NOW
                    </Button>
                </Link>
            </Box>

            {/* Product 3 - Kesar Mango Pulp */}
            <Box w={['100%', '100%', '30%']} borderWidth="1px" borderRadius="lg" p={4} bg="white" h="100%">
                <Center h="180px">
                    <Image src="https://i.imgur.com/IK9aCX1.jpg" w={'60%'} maxH="180px" objectFit="contain" alt="Kesar Mango Pulp" />
                </Center>
                <Heading fontSize={20} mt={4} color={COLORS.text} minH="60px" display="flex" alignItems="center">Kesar Mango Pulp</Heading>
                <Text fontSize={13} mt={2} color={COLORS.lightText} minH="60px">
                    Premium mango pulp in 850g cans - case of 6
                </Text>
                <Flex align="baseline" mt={2} minH="32px">
                    <Heading size="md" color={COLORS.price} mr={2}>£19.99</Heading>
                    <Text as="del" color={COLORS.lightText} fontSize="sm">£25.99</Text>
                </Flex>
                <Link to="/fruits">
                    <Button 
                        bg={COLORS.button} 
                        color="white"
                        _hover={{ bg: COLORS.buttonHover }}
                        _active={{ bg: COLORS.primary }}
                        mt={4}
                        w="100%"
                    >
                        SHOP NOW
                    </Button>
                </Link>
            </Box>
        </Flex>
    </Center>
</Box>

      {/* **********************************************************Logos************************************** */}
      <Box mt={12}>
        <Center>
          <Box display={['grid', 'grid', 'flex']} gap={8} justifyContent='center' gridTemplateColumns={'1fr 1fr'}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link to="/skin" key={item}>
                <Box p={2} borderWidth="1px" borderRadius="md" _hover={{ borderColor: COLORS.accent }}>
                  <Image w={205} src={`https://i.imgur.com/qAY79TV.jpg`} alt={`brand-${item}`} />
                </Box>
              </Link>
            ))}
          </Box>
        </Center>
      </Box>

      {/* **********************************************************What People Are Buying Right Now************************************** */}
    
        <Text fontSize="3xl" mt={8} mb={6} align="center" fontWeight="bold" color={COLORS.primary}>
        What People Are Buying Right Now
    </Text>

    <Box>
        <Center>
            <Flex direction={['column', 'column', 'row']} w={"95%"} gap={4} m='auto' justifyContent={'space-between'} wrap="wrap">
                {/* Card 1 - Nescafe Original Sticks */}
                <Card w={['70%', '70%', '22%']} h="100%" margin='auto' borderWidth="1px" borderColor="gray.100">
                    <CardBody>
                        <Image src='https://i.imgur.com/deEcxAn.jpg' alt='Nescafe Original Sticks' borderRadius='lg' h="180px" objectFit="contain" />
                        <Stack mt='6' spacing='3'>
                            <Text color={COLORS.lightText} minH="60px" display="flex" alignItems="center">
                                Nescafe Original Sticks 1x200 - Instant coffee sachets
                            </Text>
                            <Flex align="center" minH="32px">
                                <Heading size="md" color={COLORS.price}>£19.99</Heading>
                                <Badge ml={2} bg={COLORS.badge} color="white">SAVE 20%</Badge>
                            </Flex>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button 
                            w="100%" 
                            bg={COLORS.button} 
                            color="white"
                            _hover={{ bg: COLORS.buttonHover }}
                            leftIcon={<BiShoppingBag />}
                        >
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>

                {/* Card 2 - Country Range Honey Portions */}
                <Card w={['70%', '70%', '22%']} h="100%" margin='auto' borderWidth="1px" borderColor="gray.100">
                    <CardBody>
                        <Image src='https://i.imgur.com/PwSoVLk.jpg' alt='Country Range Honey Portions' borderRadius='lg' h="180px" objectFit="contain" />
                        <Stack mt='6' spacing='3'>
                            <Text color={COLORS.lightText} minH="60px" display="flex" alignItems="center">
                                Country Range Honey Portions 100x20g - Pure honey
                            </Text>
                            <Flex align="center" minH="32px">
                                <Heading size="md" color={COLORS.price}>£25.99</Heading>
                                <Badge ml={2} bg={COLORS.badge} color="white">SAVE 15%</Badge>
                            </Flex>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button 
                            w="100%" 
                            bg={COLORS.button} 
                            color="white"
                            _hover={{ bg: COLORS.buttonHover }}
                            leftIcon={<BiShoppingBag />}
                        >
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>

                {/* Card 3 - Fiesta Green Paper Bags */}
                <Card w={['70%', '70%', '22%']} h="100%" margin='auto' borderWidth="1px" borderColor="gray.100">
                    <CardBody>
                        <Image src='https://i.imgur.com/ULE5L7p.jpg' alt='Fiesta Green Paper Bags' borderRadius='lg' h="180px" objectFit="contain" />
                        <Stack mt='6' spacing='3'>
                            <Text color={COLORS.lightText} minH="60px" display="flex" alignItems="center">
                                Large Brown Paper Bags with Handles (250pk)
                            </Text>
                            <Flex align="center" minH="32px">
                                <Heading size="md" color={COLORS.price}>£22.99</Heading>
                                <Badge ml={2} bg={COLORS.accent} color="white">ECO</Badge>
                            </Flex>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button 
                            w="100%" 
                            bg={COLORS.button} 
                            color="white"
                            _hover={{ bg: COLORS.buttonHover }}
                            leftIcon={<BiShoppingBag />}
                        >
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>

                {/* Card 4 - Snickers Chocolate Bars */}
                <Card w={['70%', '70%', '22%']} h="100%" margin='auto' borderWidth="1px" borderColor="gray.100">
                    <CardBody>
                        <Image src='https://i.imgur.com/WVhhTBP.jpg' alt='Snickers Chocolate Bars' borderRadius='lg' h="180px" objectFit="contain" />
                        <Stack mt='6' spacing='3'>
                            <Text color={COLORS.lightText} minH="60px" display="flex" alignItems="center">
                                Snickers Chocolate Bars 48x48g - Milk chocolate
                            </Text>
                            <Flex align="center" minH="32px">
                                <Heading size="md" color={COLORS.price}>£25.99</Heading>
                                <Badge ml={2} bg={COLORS.badge} color="white">BESTSELLER</Badge>
                            </Flex>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button 
                            w="100%" 
                            bg={COLORS.button} 
                            color="white"
                            _hover={{ bg: COLORS.buttonHover }}
                            leftIcon={<BiShoppingBag />}
                        >
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>
            </Flex>
        </Center>
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
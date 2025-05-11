
//   Vikrant is responsible 


import React from 'react';

import { BiShoppingBag } from "react-icons/bi";

import { Box, Center, Heading, Text, Image, Flex, Button, Card, CardBody, Stack, Divider, CardFooter } from "@chakra-ui/react"
  ;
import SliderImage from './Slider/SliderImage';
import { Link } from "react-router-dom"

import dudracar from './images/dudracar.png'

import banner from './images/banner.png'



import ProductSlider1 from './Slider/ProductSlider1';
import BrandSlider from './Slider/BrandSlider';
import Footer from './Footer';
import breakfast from './images/breakfast.png'
import fruits from './images/FRUITS&VEG.png'
import snacks from './images/SNACKS.png'
import spices from './images/spices.png'
import bath from './images/bath.png'
import packaging from './images/packaging.png'

const Home = () => {
  return (
    <div >

      {/* **********************************************************First section************************************** */}


      {/* **********************************************************First section************************************** */}


      {/* **********************************************************Slider ************************************** */}
      <Box marginBottom={12}>
        <SliderImage />
      </Box>
    
    
      {/* **********************************************************shop by Category ************************************** */}
      <Text fontSize={45} mb="14px" mt="14px" align="center">Shop by Category</Text>
      <Box mt={8} alignItems='center' w='85%' margin='auto'>

        <Box display={['grid', 'grid', 'flex']} justifyContent='space-between' gridTemplateColumns={'1fr 1fr'} >
         
          <Link to= '/breakfast'>
            <Image w={395} src= {breakfast} alt="cat-1" />
          </Link>
           <Link to={'/fruits'}>
           <Image w={310} src={fruits} alt="Fruits & Veg" />
          </Link>
          <Link to={'/snacks'}>
            <Image w={205} src={snacks} alt="cat-3" />
          </Link>
          <Link to={'/spices'}>
            <Image w={305} src={spices} alt="cat-4" />
          </Link>
          <Link to={'/bathbeauty'}>
            <Image w={315} src={bath} alt="cat-5" />
          </Link>
          <Link to={'/packaging'}>
            <Image w={295} src={packaging} alt="cat-6" />
          </Link>
        </Box>

      </Box>

      {/* **********************************************************Missed Black Friday  ************************************** */}
      <Text fontSize={45} mt={"14px"} mb={"14px"} align="center">Missed Black Friday?</Text>
      <Box mt={8}><ProductSlider1 /></Box>

      {/* **********************************************************   Trending Offers ************************************** */}

      <Text fontSize={45} mt={"14px"} mb="14px" align="center">Trending Offers</Text>
      <Box>
        <Center>
      
             <Flex direction={['column', 'column', 'row']} gap={6} justify="center">
  {/* Product 1 - Kelloggs Breakfast Cereal */}
  <Box w={['100%', '100%', '30%']}>
    <Center>
      <Image 
        src="https://i.imgur.com/WZDyxzS.jpg" 
        w={'60%'} 
        alt="Kelloggs Fruit N Fiber" 
      />
    </Center>
    <Heading fontSize={20} mt={4}>Kelloggs Fruit N Fiber</Heading>
    <Text fontSize={13} mt={2} color="gray">
      High fiber breakfast cereal with dried fruits - 40x45g portion packs
    </Text>
    <Link to="/breakfast">
      <Button 
        bgColor={"white"} 
        border='1px solid gray' 
        borderRadius={'0'} 
        mt={5}
      >
        SHOP NOW - £18.99
      </Button>
    </Link>
  </Box>

  {/* Product 2 - Nature Valley Snack Bars */}
  <Box w={['100%', '100%', '30%']}>
    <Center>
      <Image 
        src="https://i.imgur.com/RBhPP1e.jpg" 
        w={'60%'} 
        alt="Nature Valley Bars" 
      />
    </Center>
    <Heading fontSize={20} mt={4}>Nature Valley Protein Bars</Heading>
    <Text fontSize={13} mt={2} color="gray">
      Protein and cereal bars, 42g each - case of 40
    </Text>
    <Link to="/snacks">
      <Button 
        bgColor={"white"} 
        border='1px solid gray' 
        borderRadius={'0'} 
        mt={5}
      >
        SHOP NOW - £26.99
      </Button>
    </Link>
  </Box>

  {/* Product 3 - Kesar Mango Pulp */}
  <Box w={['100%', '100%', '30%']}>
    <Center>
      <Image 
        src="https://i.imgur.com/IK9aCX1.jpg" 
        w={'60%'} 
        alt="Kesar Mango Pulp" 
      />
    </Center>
    <Heading fontSize={20} mt={4}>Kesar Mango Pulp</Heading>
    <Text fontSize={13} mt={2} color="gray">
      Premium mango pulp in 850g cans - case of 6
    </Text>
    <Link to="/fruits">
      <Button 
        bgColor={"white"} 
        border='1px solid gray' 
        borderRadius={'0'} 
        mt={5}
      >
        SHOP NOW - £19.99
      </Button>
    </Link>
  </Box>
</Flex>
</Center>
</Box>
      {/* **********************************************************  Logos ************************************** */}


      <Box mt={12}>
        <Center>
          <Box display={['grid', 'grid', 'flex']} gap={8} justifyContent='center' gridTemplateColumns={'1fr 1fr'}>
            <Link to="/skin">
              <Image w={205} src='https://static.thcdn.com/images/small/webp/widgets/121-us/26/180x72_4_233548301_CA_SS_Logo_Amend_BAU_THG0030424-041301-124116-063126.png' alt="cat-1" />
            </Link>
            <Link to="/skin">
              <Image w={205} src="https://static.thcdn.com/images/small/webp/widgets/121-us/18/original-logo-1024x383-035229-063318.png" alt="cat-2" />
            </Link>
            <Link to="/skin">
              <Image w={205} src="https://static.thcdn.com/images/small/webp/widgets/121-us/11/Revision_Skincare_Logo_without_Tag_Line-052511.png" alt="cat-3" />
            </Link>
            <Link to="/skin">
              <Image w={205} src="https://static.thcdn.com/images/small/webp/widgets/121-us/46/original-NF_Skinstore_Banner_Logo_Color_320x140-01-011402-010546.png" alt="cat-4" />
            </Link>
            <Link to="/skin">
              <Image w={190} src="https://static.thcdn.com/images/small/webp/widgets/121-us/27/220322-ELTAMD-LOGO-RGB-01-065127.png" alt="cat-5" />
            </Link>
            <Link to="/skin">
              <Image w={205} src="https://static.thcdn.com/images/small/webp/widgets/121-us/07/original-LOGO-2022_SkinStore_Landing_Page-BLACK-060107.png" alt="cat-6" />
            </Link>
          </Box>
        </Center>
      </Box>

      {/* ********************************************************** What People Are Buying Right Now ************************************** */}
     <Text fontSize={35} mt={"14px"} mb="14px" align="center">What People Are Buying Right Now</Text>

<Box>
  <Center>
    <Flex direction={['column', 'column', 'row']} w={"95%"} gap={4} m='auto' justifyContent={'space-between'} wrap="wrap">

      {/* Card 1 - Nescafe Original Sticks */}
      <Card w={['70%', '70%', '22%']} marginLeft={12} cursor='pointer' margin='auto'>
        <CardBody>
          <Image
            src='https://i.imgur.com/deEcxAn.jpg'
            alt='Nescafe Original Sticks'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Text color={"gray"}>
              Nescafe Original Sticks 1x200 - Instant coffee sachets for perfect single servings
            </Text>
            <Text fontSize={23} textAlign="left">
              £19.99
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Box w="100%">
            <Link to="/coffee">
              <Button borderRadius="0px" bgColor='black' _hover={{ bgColor: "#28bdb7" }} color={'white'} w='100%'>
                <BiShoppingBag color='white' fontSize={25} /> View More
              </Button>
            </Link>
          </Box>
        </CardFooter>
      </Card>

      {/* Card 2 - Country Range Honey Portions */}
      <Card w={['70%', '70%', '22%']} cursor='pointer' margin='auto'>
        <CardBody>
          <Image
            src='https://i.imgur.com/PwSoVLk.jpg'
            alt='Country Range Honey Portions'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Text color={"gray"}>
              Country Range Honey Portions 100x20g - Pure honey in convenient individual servings
            </Text>
            <Text fontSize={23} textAlign="left">
              £25.99
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Box w="100%">
            <Link to="/condiments">
              <Button borderRadius="0px" bgColor='black' _hover={{ bgColor: "#28bdb7" }} color={'white'} w='100%'>
                <BiShoppingBag color='white' fontSize={25} /> View More
              </Button>
            </Link>
          </Box>
        </CardFooter>
      </Card>

      {/* Card 3 - Fiesta Green Paper Bags */}
      <Card w={['70%', '70%', '22%']} cursor='pointer' margin='auto'>
        <CardBody>
          <Image
            src='https://i.imgur.com/ULE5L7p.jpg'
            alt='Fiesta Green Paper Bags'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Text color={"gray"}>
              Large Brown Paper Bags with Handles - Eco-friendly recycled paper carriers (250pk)
            </Text>
            <Text fontSize={23} textAlign="left">
              £22.99
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Box w="100%">
            <Link to="/packaging">
              <Button borderRadius="0px" bgColor='black' _hover={{ bgColor: "#28bdb7" }} color={'white'} w='100%'>
                <BiShoppingBag color='white' fontSize={25} /> View More
              </Button>
            </Link>
          </Box>
        </CardFooter>
      </Card>

      {/* Card 4 - Snickers Chocolate Bars */}
      <Card w={['70%', '70%', '22%']} cursor='pointer' margin='auto'>
        <CardBody>
          <Image
            src='https://i.imgur.com/WVhhTBP.jpg'
            alt='Snickers Chocolate Bars'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Text color={"gray"}>
              Snickers Chocolate Bars 48x48g - Milk chocolate with caramel and peanuts
            </Text>
            <Text fontSize={23} textAlign="left">
              £25.99
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Box w="100%">
            <Link to="/snacks">
              <Button borderRadius="0px" bgColor='black' _hover={{ bgColor: "#28bdb7" }} color={'white'} w='100%'>
                <BiShoppingBag color='white' fontSize={25} /> View More
              </Button>
            </Link>
          </Box>
        </CardFooter>
      </Card>
    </Flex>
  </Center>
</Box>

      {/* ********************************************************** Brand of the Month: Olaplex************************************** */}
      <Text fontSize={35} mt={"14px"} mb="14px" align="center">Brand of the Month</Text>
      <Box w='90%' margin={'auto'}>

        <Flex gap={12} direction={['column', 'column', 'row']} w={"95%"} m='auto' justifyContent={'space-between'} >
          <Box w={['100%', '100%', '55%']}>
  <Image w={"120%"} h='100%' src='https://i.imgur.com/QyX4txm.jpg' alt='1' />          </Box>

          <Box w={['100%', '100%', '65%']}>
            <BrandSlider />
          </Box>

        </Flex>
      </Box>

      {/* **********************************************************before footer Images************************************** */}
      <Center>
        <Box w={'90%'} mt={8}>
          <Link>
            <Image src={dudracar} alt='img1' />

          </Link>
        </Box>
      </Center>
      <Center>
        <Box w={'90%'} mt={8}>
          <Link>
            <Image src={banner} alt='img1' />

          </Link>
        </Box>

      </Center>
      <hr />
      <Footer />
    </div>
  );
}

export default Home;



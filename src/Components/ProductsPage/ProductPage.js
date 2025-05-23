import { CheckCircleIcon } from "@chakra-ui/icons";
import { SkeletonCircle } from "@chakra-ui/react";
import olives from '../Pages/images/dudra.png'
import { allProducts } from "./allprooducts";

import {
  Box,
  Image,
  SimpleGrid,
  Flex,
  Heading,
  Checkbox,
  Select,
  useDisclosure,
  Button,
  Text,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../Pages/Footer";
import { addToCart } from "../Redux/cart/cart.actions";

import SingleProduct from "./SingleProduct";

const filters = {
  brands: [
    "111SKIN (5) ",
    "3LAB (8) ",
    "Aesop (10) ",
    "African Botanics (1) ",
    "AHAVA (7) ",
    "Alchimie Forever (5) ",
    "ALGENIST (1) ",
    "Alo (1) ",
  ],
  skinCare: [
    "Moisturisers (1118) ",
    "Serums (127) ",
    "Cleansers (31) ",
    "Neck & Décolletage (21) ",
    "Toners (21) ",
  ],
  format: [
    "Cream (458) ",
    "Fluid (104) ",
    "Gel (60) ",
    "Serum (58) ",
    "Clay (18) ",
  ],
  skintype: [
    "All (381) ",
    "Combination (405) ",
    "Dry (492) ",
    "Mature (344) ",
    "Normal (563) ",
    "Sensitive (390) ",
    "Oily (349) ",
  ],
  gender: ["Boys (5) ", "Girls (200)", "Men (101) ", "Women (300) "],
  review: ["2-3 (8) ", "3-4 (41) ", "4+ (402) "],
};

const brands = [
  "Quaker",
  "Kelloggs",
  "Nature Valley",
  "Nescafe",
  "Tate & Lyle",
  "Euro Collection London",
  "Country Range",
  "Dettol",
  "Fiesta Green",
  "Everyday",
  "Kesar",
  "Laila",
  "MDH",
  "Rajah",
  "Sapna"
];


const categories = [
 "Brands",         // This is the special key containing all brands
  "Breakfast",
  "Dairy",
  "Snacks",
  "Fruits & Veg",   // Note: This is the key in your data (not "Fruits & Veggies")
  "Bath & Body",
  "Spices",
  "Packaging",
  "Bakery",
  // Additional categories found deeper in your data:
  "Condiments",
  "Cleaning Supplies",
  "Toiletries",
  "Personal Care",
  "Fresh Produce",
  "Fruits",         // From Kesar Mango Pulp
  "Rice",           // From Laila Basmati Rice
  "Cooking Essentials", // From Sapna Ginger & Garlic Paste
  "Beverages" 
];

const Shop = ({categoryFilter}) => {
  const [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [price, setPrice] = useState(20);
  let [brand, setBrand] = useState("");
  let [category, setCategory] = useState(categoryFilter || ""); // Initialize with categoryFilter
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalProps, setModalProps] = useState({});
  const toast = useToast();
  const cartProducts = useSelector((state) => state.cartManager.products);


  let cartTotal = cartProducts.reduce((acc, p) => {
    return acc + Number(p.price);
  }, 0);

  const dispatch = useDispatch();

  const handleSelect = (e) => {
    const { name, value } = e.target;
    if (name == "price") {
      let val = Number(value);
      setPrice(val);
    } else if (name == "brand") {
      setPrice(10);
      setCategory("");
      setBrand(value);
    } else {
      setPrice(10);
      setBrand("");
      setCategory(value);
    }
  };
  const handleModal = (data) => {
    setModalProps(data);
    onOpen();
  };
  const handleAdd = (data) => {
    toast({
      position: "top-left",
      duration: 1200,
      render: () => (
        <Flex
          color="white"
          border="4px solid white"
          p={"10px"}
          bgColor="green.400"
        >
          <CheckCircleIcon w={30} h={30} />
          <Text
            size="lg"
            ml="15px"
          >{`${modalProps.name} is now in your cart!!!`}</Text>
        </Flex>
      ),
    });
    dispatch(addToCart(data));
    onClose();
  };



  const mockProducts = {
    Dudra: [
      { id: 1, name: "Dudra Olives", price: 49, image_link: 'https://i.imgur.com/W0CIqnJ.png' },
      { id: 2, name: "Dudra Moisturizer", price: 39, image_link: "https://i.imgur.com/W0CIqnJ.png" },
    ],
    Kellogs: [
      { id: 3, name: "Kellogs Cereal", price: 29, image_link: "https://i.imgur.com/W0CIqnJ.png" },
    ],
    // Add other brands...
  };



  // ... rest of your state declarations

  // In your Shop component, modify the useEffect hook:
useEffect(() => {
  setLoading(true);
  
  // Get all products from allProducts.jsx
  let filteredProducts = [];
  
  // Special handling for Fruits & Veg category
  if (category === "Fruits & Veg" || categoryFilter === "Fruits & Veg") {
    // Get all fruit and vegetable products from different categories
    filteredProducts = [
      // From Fruits & Veg category
      ...(allProducts['Fruits & Veg'] || []),
      
      // From Fruits category
      ...(allProducts['Fruits'] || []),
      
      // From other categories where fruits/veg might appear
      ...(allProducts['Breakfast'] || []).filter(p => 
        p.dietary?.includes('Fruit') || 
        p.name.toLowerCase().includes('fruit') ||
        p.name.toLowerCase().includes('veg')
      ),
      ...(allProducts['Snacks'] || []).filter(p => 
        p.dietary?.includes('Fruit') || 
        p.name.toLowerCase().includes('fruit') ||
        p.name.toLowerCase().includes('veg')
      ),
    ].filter((product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
    );
  } 
  else if (brand) {
    // Filter by brand
    if (allProducts.Brands[brand]) {
      filteredProducts = allProducts.Brands[brand];
    }
  } 
  else if (category || categoryFilter) {
    // Filter by other categories
    const activeCategory = category || categoryFilter;
    if (activeCategory === "Brands") {
      // Special case: show all brands
      filteredProducts = Object.values(allProducts.Brands).flat();
    } 
    else if (allProducts[activeCategory]) {
      filteredProducts = allProducts[activeCategory];
    }
  } 
  else {
    // Default view: show all products
    filteredProducts = [
      ...Object.values(allProducts.Brands).flat(),
      ...Object.values(allProducts).filter(Array.isArray).flat()
    ].filter((product, index, self) => 
      index === self.findIndex((p) => p.id === product.id)
    );
  }
  
  setProducts(filteredProducts);
  setLoading(false);
}, [brand, category, price, categoryFilter]);



  return (
    <>
      <Flex w="90%" m="auto" justify="space-between" mt={["12","12","12","12","auto"]}>
        <Box
          w="25%"
          display={["none", "none", "block"]}
          style={{ fontFamily: "sans-serif" }}
        >
          <Box borderBottom="1px solid gainsboro" p="20px" mb="50px">
            <Heading size="lg">Refine</Heading>
          </Box>
          <Accordion defaultIndex={[0, 1, 2, 3, 4, 5, 6, 7]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    fontSize="md"
                    fontWeight="bold"
                    flex="1"
                    textAlign="left"
                  >
                    Brands
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {filters.brands.map((b) => (
                  <Box>
                    <Checkbox size="md">{b}</Checkbox>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    fontSize="md"
                    fontWeight="bold"
                    textAlign="left"
                  >
                    SkinCare Product Type
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {filters.skinCare.map((s) => (
                  <Box>
                    <Checkbox size="md">{s}</Checkbox>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    SkinCare Format
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {filters.format.map((s) => (
                  <Box>
                    <Checkbox size="md">{s}</Checkbox>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    SkinType
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {filters.skintype.map((s) => (
                  <Box>
                    <Checkbox size="md">{s}</Checkbox>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    Gender
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {filters.gender.map((s) => (
                  <Box>
                    <Checkbox size="md">{s}</Checkbox>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    fontSize="md"
                    fontWeight="bold"
                    flex="1"
                    textAlign="left"
                  >
                    Review
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {filters.review.map((s) => (
                  <Box>
                    <Checkbox size="md">{s}</Checkbox>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      
      
      {/* This is for the top categories */}


      
        <Box w={["100", "100%", "70%"]} mt="25px">
          <Heading mb="30px">{`Up to 50% off!`}</Heading>
          <Flex justify="space-between">
            {/* <Select
              w="30%"
              borderRadius="0px"
              border="1px solid black"
              onChange={handleSelect}
              name="price"
            >
              <option value="40">By Default</option>
              <option value="10">lesser than 10$</option>
              <option value="20">lesser than 20$</option>
              <option value="30">lesser than 30$</option>
              <option value="40">lesser than 35$</option>
            </Select>
            <Select
              w="30%"
              borderRadius="0px"
              border="1px solid black"
              placeholder="Sort By Brand"
              onChange={handleSelect}
              name="brand"
            >
              {brands.map((b) => (
                <option value={b}>{b}</option>
              ))}
            </Select> */}
            <Select
              w="30%"
              borderRadius="0px"
              border="1px solid black"
              onChange={handleSelect}
              placeholder="Sort By Category"
              name="category"
            >
              {categories.map((c) => (
                <option value={c}>{c}</option>
              ))}
            </Select>
          </Flex>
          {loading ? (
            <SimpleGrid w="100%" columns={[2, 2, 3]} spacing="40px" pt="10">
              {Array(10)
                .fill("")
                .map((e) => (
                  <Box padding="6" h="470px " boxShadow="md" bg="white">
                    <Skeleton
                      h="200px"
                      startColor="pink.100"
                      mb="25px"
                      endColor="orange.100"
                      size="10"
                    />
                    <Skeleton
                      h="16px"
                      w="100%"
                      startColor="orange.300"
                      endColor="pink.200"
                      mb="15px"
                    />
                    <Skeleton h="16px" w="85%" mb="15px" />
                    <Skeleton h="30px" mb="15px" w="55%" />
                    <Flex mb="15px">
                      {Array(5)
                        .fill("")
                        .map(() => (
                          <SkeletonCircle
                            endColor="yellow.100"
                            startColor="gold"
                            mr="5px"
                            size="15px"
                          />
                        ))}
                    </Flex>
                    <Skeleton h="20px" mb="15px" w="30%" />
                    <Skeleton h="30px" mb="15px" w="100%" endColor="gray.600" />
                  </Box>
                ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid w="100%" columns={[2, 2, 3]} spacing="40px" pt="10">
              {products.map((p, i) => {
                if (i < 25) {
                  return (
                    <SingleProduct
                      {...p}
                      handleModal={handleModal}
                      key={p.id}
                    />
                  );
                }
              })}
            </SimpleGrid>
          )}
        </Box>
        )
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          size={["sm", "md", "2xl"]}
        >
          <ModalOverlay />
          <ModalContent borderRadius="0px">
            <ModalHeader
            p="10px"
            bgColor="gainsboro"
            borderBottom="1px solid black"
            fontSize="20px"
          >
            {`Get Your ${modalProps.category} Fast Order Is Limited!!!`}
          </ModalHeader>
            <ModalCloseButton />
            <ModalBody pt="35px" pb="35px">
              <Flex mt="10px" justify="space-between">
                <Box w="30%">
                  <Image w="100%" src={modalProps.image_link} />
                </Box>
                <Box width="50%">
  <Text mb="15px" fontSize="xl">
    {modalProps.name}
  </Text>
  <Text mb="15px">{`Brand - ${modalProps.brand || 'Generic'}`}</Text>
  <Text mb="15px">Quantity 1</Text>
  <Heading>{`$${modalProps.price || 'Price not available'}`}</Heading>
</Box>
              </Flex>
              <Text fontSize="20px">{"Subtotal:"}</Text>
              <Flex justify="space-between">
                <Text fontSize="20px">{`( ${cartProducts.length} items in your cart)`}</Text>
                <Text fontSize="20px">{`$${cartTotal}`}</Text>
              </Flex>
              <Flex
                p="15px"
                mt="25px"
                borderTop="1px solid black"
                borderBottom="1px solid black"
                justify="space-between"
                direction={["column", "column", "row"]}
              >
                <Button
                  borderRadius="0px"
                  bgColor="white"
                  border="1px solid black"
                  color="black"
                  w={["100%", "100%", "48%"]}
                  display="block"
                  mb="8px"
                  onClick={() => handleAdd(modalProps)}
                >
                  Add To Cart
                </Button>
                <Box w={["100%", "100%", "48%"]}>
                  <Link to="/cart">
                    <Button
                      borderRadius="0px"
                      bgColor="black"
                      color="white"
                      w="100%"
                      display="block"
                      _hover={{ bgColor: "#28bdb7" }}
                    >
                      VIEW CART
                    </Button>
                  </Link>
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>

      <Footer />
    </>
  );
};

export default Shop;

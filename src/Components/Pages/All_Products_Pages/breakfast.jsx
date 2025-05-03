import { CheckCircleIcon } from "@chakra-ui/icons";
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
import Footer from "../Footer";

import { addToCart } from "../../Redux/cart/cart.actions";

import SingleProduct from "../../ProductsPage/SingleProduct";

const filters = {
  brands: [
    "Kellogg's (12)",
    "Quaker (8)",
    "General Mills (10)",
    "Nature's Path (5)",
    "Post (7)",
    "Bob's Red Mill (5)",
    "Cheerios (8)",
    "Special K (6)",
  ],
  categories: [
    "Cereal (45)",
    "Oatmeal (22)",
    "Pancake Mix (15)",
    "Breakfast Bars (18)",
    "Syrups (10)",
  ],
  dietary: [
    "Organic (58)",
    "Gluten-Free (45)",
    "Vegan (60)",
    "Keto (18)",
    "Low Sugar (58)",
  ],
  packageType: [
    "Box (458)",
    "Bag (104)",
    "Jar (60)",
    "Bottle (58)",
    "Can (18)",
  ],
};

const brands = [
  "Kellogg's",
  "Quaker",
  "General Mills",
  "Nature's Path",
  "Post",
  "Bob's Red Mill",
  "Cheerios",
  "Special K",
];

const categories = [
  "Cereal",
  "Oatmeal",
  "Pancake Mix",
  "Breakfast Bars",
  "Syrups",
];

// Hardcoded breakfast products
const breakfastProducts = [
  {
    id: 1,
    name: "Kellogg's Frosted Flakes Cereal",
    brand: "Kellogg's",
    category: "Cereal",
    price: "3.98",
    image_link: "https://i.imgur.com/QyX4txm.jpg",
    description: "Sweetened corn flakes cereal",
    dietary: ["Gluten-Free"],
  },
  {
    id: 2,
    name: "Quaker Instant Oatmeal Variety Pack",
    brand: "Quaker",
    category: "Oatmeal",
    price: "5.48",
    image_link: "https://i.imgur.com/QyX4txm.jpg",
    description: "10 packets of assorted flavored instant oatmeal",
    dietary: ["Low Sugar"],
  },
  {
    id: 3,
    name: "Nature's Path Organic Honey Almond Granola",
    brand: "Nature's Path",
    category: "Cereal",
    price: "4.98",
    image_link: "https://i.imgur.com/QyX4txm.jpg",
    description: "Organic granola with honey and almonds",
    dietary: ["Organic", "Vegan"],
  },
  {
    id: 4,
    name: "Kodiak Cakes Power Cakes Flapjack Mix",
    brand: "Kodiak",
    category: "Pancake Mix",
    price: "5.98",
    image_link: "https://i.imgur.com/QyX4txm.jpg",
    description: "Whole grain protein packed pancake mix",
    dietary: ["High Protein"],
  },
  {
    id: 5,
    name: "Special K Protein Cereal",
    brand: "Special K",
    category: "Cereal",
    price: "3.78",
    image_link: "https://i.imgur.com/QyX4txm.jpg",
    description: "High protein cereal with grains",
    dietary: ["High Protein", "Low Sugar"],
  },
  {
    id: 6,
    name: "Bob's Red Mill 7 Grain Pancake Mix",
    brand: "Bob's Red Mill",
    category: "Pancake Mix",
    price: "5.28",
    image_link: "https://i.imgur.com/QyX4txm.jpg",
    description: "Whole grain pancake and waffle mix",
    dietary: ["Organic", "Whole Grain"],
  },
  {
    id: 7,
    name: "Maple Grove Farms Pure Maple Syrup",
    brand: "Maple Grove",
    category: "Syrups",
    price: "8.98",
    image_link: "https://i.imgur.com/QyX4txm.jpg",
    description: "100% pure Vermont maple syrup",
    dietary: ["Organic"],
  },
  {
    id: 8,
    name: "Kind Breakfast Bars Variety Pack",
    brand: "Kind",
    category: "Breakfast Bars",
    price: "12.98",
    image_link: "https://i.imgur.com/QyX4txm.jpg",
    description: "Gluten-free breakfast bars with whole grains",
    dietary: ["Gluten-Free"],
  },
];

const Blog = () => {
  const [products, setProducts] = useState(breakfastProducts);
  let [loading, setLoading] = useState(false);
  let [price, setPrice] = useState(20);
  let [brand, setBrand] = useState("");
  let [category, setCategory] = useState("Cereal");
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
      filterProducts(val, brand, category);
    } else if (name == "brand") {
      setPrice(10);
      setCategory("");
      setBrand(value);
      filterProducts(price, value, category);
    } else {
      setPrice(10);
      setBrand("");
      setCategory(value);
      filterProducts(price, brand, value);
    }
  };

  const filterProducts = (price, brand, category) => {
    setLoading(true);
    let filtered = breakfastProducts;
    
    if (price) {
      filtered = filtered.filter(p => parseFloat(p.price) <= price);
    }
    
    if (brand) {
      filtered = filtered.filter(p => p.brand === brand);
    }
    
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    setProducts(filtered);
    setLoading(false);
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
          <Accordion defaultIndex={[0, 1, 2, 3, 4]} allowMultiple>
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
                {filters.brands.map((b, i) => (
                  <Box key={i}>
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
                    Categories
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {filters.categories.map((s, i) => (
                  <Box key={i}>
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
                    Dietary Needs
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {filters.dietary.map((s, i) => (
                  <Box key={i}>
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
                    Package Type
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {filters.packageType.map((s, i) => (
                  <Box key={i}>
                    <Checkbox size="md">{s}</Checkbox>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Box w={["100", "100%", "70%"]} mt="25px">
          <Heading mb="30px">{`Breakfast Essentials`}</Heading>
          <Flex justify="space-between">
            <Select
              w="30%"
              borderRadius="0px"
              border="1px solid black"
              onChange={handleSelect}
              name="price"
            >
              <option value="40">By Default</option>
              <option value="5">Under £5</option>
              <option value="10">Under £10</option>
              <option value="15">Under £15</option>
              <option value="20">Under £20</option>
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
                <option key={b} value={b}>{b}</option>
              ))}
            </Select>
            <Select
              w="30%"
              borderRadius="0px"
              border="1px solid black"
              onChange={handleSelect}
              placeholder="Sort By Category"
              name="category"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </Flex>
          {loading ? (
            <Image
              w="100px"
              display="block"
              m="auto"
              mt="100px"
              src="https://www.aguacaliente.org/imgs/loading.gif"
            />
          ) : (
            <SimpleGrid w="100%" columns={[2, 2, 3]} spacing="40px" pt="10">
              {products.map((p) => {
                return (
                  <SingleProduct
                    {...p}
                    handleModal={handleModal}
                    key={p.id}
                  />
                );
              })}
            </SimpleGrid>
          )}
        </Box>
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
                  <Text mb="15px">{`Brand - ${modalProps.brand}`}</Text>
                  <Text mb="15px">{modalProps.description}</Text>
                  <Text mb="15px">Quantity 1</Text>
                  <Heading>{`£${modalProps.price}`}</Heading>
                </Box>
              </Flex>
              <Text fontSize="20px">{"Subtotal:"}</Text>
              <Flex justify="space-between">
                <Text fontSize="20px">{`( ${cartProducts.length} items in your cart)`}</Text>
                <Text fontSize="20px">{`£${cartTotal.toFixed(2)}`}</Text>
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

export default Blog;
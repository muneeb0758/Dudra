import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Spacer,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Input,
} from "@chakra-ui/react";
import { AiFillLock } from "react-icons/ai";
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons";
import { BsGiftFill } from "react-icons/bs";
import { FaCcAmazonPay, FaCcApplePay, FaCcPaypal, FaGooglePay } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import EmptyCart from "../Optional/EmptyCart";
import { Link } from "react-router-dom";

// CartItem component with proper image handling
const CartItem = ({ image_link, name, price, quantity }) => {
  const handleImageError = (e) => {
    const rating = Math.ceil(Math.random() * 4);
    e.target.src = rating < 3
      ? "https://www.dior.com/beauty/version-5.1432748111912/resize-image/ep/0/390/100/0/packshots%252FPDG_Y0715100.jpg"
      : "https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwa8106b14/ProductImages/Face/BB_Cream/800897822927_bbcream_natural_main.jpg?sw=390&sh=390&sm=fit";
    e.target.error = null;
  };

  return (
    <Flex 
      borderBottom="1px solid gainsboro" 
      p={4} 
      align="center"
      gap={4}
    >
      <Box 
        w="100px" 
        h="100px" 
        flexShrink={0}
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        overflow="hidden"
      >
        <Image
          src={image_link}
          alt={name}
          w="100%"
          h="100%"
          objectFit="contain"
          onError={handleImageError}
        />
      </Box>
      <Box flex={1}>
        <Text fontWeight="medium">{name}</Text>
        <Text>${price}</Text>
        <Text>Qty: {quantity || 1}</Text>
      </Box>
    </Flex>
  );
};

const Cart = () => {
  const cartItems = useSelector((state) => state.cartManager.products);
  let cartTotal = cartItems.reduce((acc, p) => {
    return acc + Number(p.price) * (p.quantity || 1);
  }, 0);

  return (
    <>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Box w={["col", "col", "row"]} mb={8}>
          <Box w={["95%", "95%", "80%"]} m="auto">
            <Flex direction={["column", "column", "row"]} mt={["20", "20", "8"]}>
              <Heading
                as="h4"
                fontFamily={"sans-serif"}
                fontWeight="normal"
                textAlign={["center", "center", "auto"]}
              >
                Your Cart
              </Heading>
              <Spacer />
              <Link to="/checkout">
                <Button
                  mt={["8", "8", "0"]}
                  bgColor="blackAlpha.800"
                  color="white"
                  colorScheme="none"
                  borderRadius="none"
                  height="12"
                  fontFamily={"sans-serif"}
                  fontWeight="normal"
                  w={["100%", "100%", "auto"]}
                >
                  <AiFillLock style={{ marginRight: "10px" }} /> CHECKOUT SECURILY NOW
                </Button>
              </Link>
            </Flex>

            <Box border="1px solid #c8dec8" mt={8} color="green" bgColor="#E6F2E6">
              <Text alignItems="center" display="flex" gap="10px" py={2} ml={4}>
                <CheckCircleIcon />
                You have qualified for: {""}Select a gift for you or someone you
                love when you spend $12 or{""} more Don't forget to make your
                selection below
              </Text>
            </Box>

            <Flex
              justify="space-between"
              direction={["column", "column", "column", "column", "row"]}
            >
              <Box w={["100%", "100%", "55%"]}>
                <Flex
                  justify="space-between"
                  border="1px solid gainsboro"
                  mt="30px"
                  p="15px"
                >
                  <Text fontSize="15px">{`${cartItems.length} items in your cart `}</Text>
                  <Text fontSize="15px">{`Cart Total: $${cartTotal.toFixed(2)}`}</Text>
                </Flex>
                <Box>
                  {cartItems.map((c) => (
                    <CartItem
                      key={c.id}
                      image_link={c.image_link}
                      name={c.name}
                      price={c.price}
                      quantity={c.quantity}
                    />
                  ))}
                </Box>

                <Box mt="8">
                  <Input
                    mt={4}
                    w={["100%", "50%", "40%"]}
                    borderRadius="none"
                    m={"auto"}
                    placeholder="Got a Coupon Code? Enter it here: "
                    focusBorderColor="#f1f1f1"
                  />
                  <Button
                    mt={["2", "-1", "-1"]}
                    w={["100%", "auto", "auto"]}
                    borderRadius={"none"}
                    fontFamily={"sans-serif"}
                    fontWeight="normal"
                  >
                    ADD
                  </Button>
                </Box>

                <Box mt={8}>
                  <Flex direction={["column", "column", "row"]}>
                    <Link to="/skin">
                      <Button
                        mt={["8", "8", "0"]}
                        bgColor="#f1f1f1"
                        color="black"
                        borderRadius="none"
                        height="12"
                        fontFamily={"sans-serif"}
                        fontWeight="normal"
                        colorScheme="blue"
                        w={["100%", "100%", "auto"]}
                      >
                        CONTINUE SHOPPING
                      </Button>
                    </Link>
                    <Spacer />
                    <Flex direction={["column", "column", "column"]} gap="20px">
                      <Link to="/checkout">
                        <Button
                          mt={["8", "8", "0"]}
                          bgColor="blackAlpha.800"
                          color="white"
                          borderRadius="none"
                          w={["100%", "100%", "auto"]}
                          height="12"
                          fontFamily={"sans-serif"}
                          fontWeight="normal"
                          colorScheme="blue"
                        >
                          <AiFillLock style={{ marginRight: "10px" }} /> CHECKOUT
                          SECURILY NOW
                        </Button>
                      </Link>
                      <Flex
                        gap={"20px"}
                        alignItems="center"
                        w={["70%", "50%", "100%"]}
                        margin="auto"
                      >
                        <FaCcPaypal size={"2.5em"} />
                        <FaGooglePay size={"2.5em"} />
                        <SiPaytm size={"2.5em"} />
                        <FaCcAmazonPay size={"2.5em"} />
                        <FaCcApplePay size={"2.5em"} />
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Box>

              <Spacer />

              <Accordion
                allowToggle
                w={["100%", "100%", "100%", "100%", "40%"]}
                mt={8}
                defaultIndex={[0]}
              >
                <AccordionItem bgColor={"#f1f1f1"}>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Gift Selections
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <Flex py={6}>
                      <Text fontSize={"16px"} textAlign="left" pl="20px">
                        Select a Gift for You or Someone you love.{" "}
                      </Text>
                      <Spacer />
                      <BsGiftFill style={{ marginRight: "20px" }} />
                    </Flex>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Box bgColor={"white"}>
                      <Flex py={4} alignItems="center" pr={4} pl={2} gap="2">
                        <Image
                          height="70px"
                          width={"70px"}
                          src="https://s1.thcdn.com//productimg/70/70/13227262-1734932752281617.jpg"
                          alt="product"
                        />
                        <Text textAlign={"left"}>
                          SkinMedica LYTERA 2.0 Pigment Correcting Serum
                        </Text>
                        <InfoIcon />
                      </Flex>
                    </Box>

                    <Box bgColor={"white"} mt="4">
                      <Flex py={4} alignItems="center" pr={4} pl={2} gap="2">
                        <Image
                          height="70px"
                          width={"70px"}
                          src="https://static.thcdn.com/images/large/webp//productimg/1600/1600/11975850-1514742470154982.jpg"
                          alt="product"
                        />
                        <Text textAlign={"left"}>
                          NUDESTIX Nudies All Over Face Color Matte{" "}
                        </Text>
                        <InfoIcon />
                      </Flex>
                    </Box>

                    <Box bgColor={"white"} mt="4">
                      <Flex py={4} alignItems="center" pr={4} pl={2} gap="2">
                        <Image
                          height="70px"
                          width={"70px"}
                          src="https://static.thcdn.com/images/large/webp//productimg/1600/1600/13971588-5624998481683801.jpg"
                          alt="product"
                        />
                        <Text textAlign={"left"}>
                          Deck Of Scarlet Metal Leaf Shadow Pot
                        </Text>
                        <InfoIcon />
                      </Flex>
                    </Box>

                    <Box bgColor={"white"} mt="4">
                      <Flex py={4} alignItems="center" pr={4} pl={2} gap="2">
                        <Image
                          height="70px"
                          width={"70px"}
                          src="https://static.thcdn.com/images/large/webp//productimg/1600/1600/12590182-1754866388387935.jpg"
                          alt="product"
                        />
                        <Text textAlign={"left"}>
                          Osmosis Beauty Wellness Skin Perfection Elixir{" "}
                        </Text>
                        <InfoIcon />
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </Box>
          <Footer />
        </Box>
      )}
    </>
  );
};

export default Cart;
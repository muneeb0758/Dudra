import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Pages/Footer";

const EmptyCart = () => {
  // Color scheme matching Home.jsx
  const COLORS = {
    primary: "#2e856e",       // Dark teal green
    accent: "#4caf93",        // Medium teal
    lightAccent: "#e0f2f1",   // Very light teal
    button: "#4caf50",        // Material green
    buttonHover: "#43a047",   // Darker green
    text: "#2d3748",          // Dark gray for text
    lightText: "#718096",     // Light gray for secondary text
    border: useColorModeValue("gray.200", "gray.600"), // Responsive to light/dark mode
  };

  return (
    <Box py={[8, 12]} bg={COLORS.lightAccent} minH="100vh">
      <Box maxW="1200px" w={["95%", "90%", "85%"]} mx="auto">
        <VStack spacing={8} align="stretch">
          {/* Cart Header */}
          <Heading
            as="h2"
            size={["lg", "xl"]}
            fontFamily="'Inter', sans-serif"
            fontWeight="semibold"
            color={COLORS.text}
            textAlign="center"
            borderBottom={`2px solid ${COLORS.primary}`}
            pb={4}
            mb={6}
          >
            Your Cart
          </Heading>

          {/* Empty Cart Message */}
          <VStack spacing={6} textAlign="center">
            <Heading
              as="h3"
              size={["md", "lg"]}
              fontFamily="'Inter', sans-serif"
              fontWeight="medium"
              color={COLORS.lightText}
            >
              Your cart is currently empty.
            </Heading>
            <Text
              fontSize={["md", "lg"]}
              color={COLORS.lightText}
              maxW="600px"
            >
              Explore our wide range of products and start adding items to your cart!
            </Text>
            <Link to="/skin">
              <Button
                size={["md", "lg"]}
                bg={COLORS.button}
                color="white"
                fontFamily="'Inter', sans-serif"
                fontWeight="medium"
                borderRadius="md"
                px={8}
                py={6}
                _hover={{
                  bg: COLORS.buttonHover,
                  transform: "translateY(-2px)",
                  boxShadow: "md",
                }}
                _active={{ bg: COLORS.primary }}
                transition="all 0.2s ease"
              >
                Continue Shopping
              </Button>
            </Link>
          </VStack>

          {/* Category Grid */}
          <Box mt={12}>
            <Heading
              as="h4"
              size="md"
              fontFamily="'Inter', sans-serif"
              fontWeight="semibold"
              color={COLORS.text}
              mb={6}
              textAlign="center"
            >
              Explore Categories
            </Heading>
            <SimpleGrid
              columns={[1, 2, 3, 3]}
              spacing={[4, 6, 8]}
              justifyItems="center"
            >
              {[
                {
                  src: "https://i.imgur.com/qAY79TV.jpg",
                  alt: "Packaging",
                  label: "Packaging",
                  link: "/packaging",
                },
                {
                  src: "https://i.imgur.com/PB0T1XF.jpg",
                  alt: "Breakfast",
                  label: "Breakfast",
                  link: "/breakfast",
                },
                {
                  src: "https://i.imgur.com/6hF9VjW.jpg",
                  alt: "Essentials",
                  label: "Essentials",
                  link: "/essentials",
                },
                {
                  src: "https://i.imgur.com/vYhNSgh.png",
                  alt: "Spices",
                  label: "Spices",
                  link: "/spices",
                },
                {
                  src: "https://i.imgur.com/4W0s1oT.png",
                  alt: "Fruit",
                  label: "Fruit",
                  link: "/fruits",
                },
                {
                  src: "https://i.imgur.com/sQ00I0p.jpg",
                  alt: "Dry Stock",
                  label: "Dry Stock",
                  link: "/dry-stock",
                },
              ].map((item) => (
                <Link to={item.link} key={item.label}>
                  <Box
                    bg="white"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="sm"
                    transition="all 0.3s ease"
                    _hover={{
                      boxShadow: "lg",
                      transform: "translateY(-4px)",
                    }}
                    maxW={["100%", "300px"]}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      h={["200px", "220px"]}
                      w="100%"
                      objectFit="cover"
                      loading="lazy"
                      fallbackSrc="https://via.placeholder.com/300x220"
                    />
                    <Box p={4}>
                      <Text
                        fontFamily="'Inter', sans-serif"
                        fontSize={["md", "lg"]}
                        fontWeight="medium"
                        color={COLORS.text}
                        textAlign="center"
                        _hover={{ color: COLORS.accent }}
                      >
                        {item.label}
                      </Text>
                    </Box>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default EmptyCart;
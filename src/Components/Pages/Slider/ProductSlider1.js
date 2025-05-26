import React, { Component } from "react";
import Slider from "react-slick";
import { Flex,Box, Button, Card, CardBody, CardFooter, Divider, Image, Stack, Text, Heading, Badge } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from "../../Redux/cart/cart.actions";
import { allProducts } from "../../ProductsPage/allprooducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductSlider.css";
import { BiShoppingBag } from "react-icons/bi";


// Green color scheme constants (aligned with Home.jsx)
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

// Function to get random products from allProducts
const getRandomProducts = (count) => {
  const allProductsArray = Object.values(allProducts.Brands).flat();
  if (allProductsArray.length <= count) return allProductsArray;
  const shuffled = [...allProductsArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

class ProductSlider1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: getRandomProducts(9), // Fetch 9 random products from allProducts
    };
  }

  handleAddToCart = (product) => {
    this.props.dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price || 0),
      image_link: product.image_link,
      quantity: 1,
    }));
  };

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 4,
      initialSlide: 0,
      swipeToSlide: true,
      draggable: true,
      mouseWheel: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <Slider {...settings}>
        {this.state.slides.map((product, index) => (
          <Box key={product.id} px={2}>
            <Card
              w="100%"
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
                borderColor: COLORS.accent,
              }}
            >
              <a href={`/products/${product.id}`}>
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
                        transform: 'scale(1.1)',
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
                        color: COLORS.accent,
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
              </a>
              <Divider />
              <CardFooter p={0}>
                <Button
                  w="100%"
                  borderRadius={0}
                  bg={COLORS.button}
                  color="white"
                  _hover={{
                    bg: COLORS.buttonHover,
                    transform: 'translateY(-2px)',
                  }}
                  _active={{ bg: COLORS.primary }}
                  leftIcon={<BiShoppingBag size="16px" />}
                  py={4}
                  fontSize="sm"
                  transition="all 0.2s ease"
                  onClick={() => this.handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </Box>
        ))}
      </Slider>
    );
  }
}

export default connect()(ProductSlider1); 
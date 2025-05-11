// ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Image, Text, Flex, Button, Heading, Divider, useToast,
  FormControl, FormLabel, Textarea, HStack, IconButton, VStack, Stack, Badge
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from '../ProductsPage/allprooducts';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/cart/cart.actions';
import { addReview } from '../Redux/review.actions';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  // Find product based on the id
  let product = null;
  for (const brand in allProducts.Brands) {
    product = allProducts.Brands[brand].find(p => p.id === id);
    if (product) break;
  }

  const { reviews } = useSelector(state => state.reviews);
  const { isAuthenticated, user } = useSelector(state => state.authManager);
  const isAuth = useSelector((state) => state.authManager.isAuth);


  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Debugging: Check values of isAuthenticated and user
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
  }, [isAuthenticated, user]);

  const handleImageError = (e) => {
<<<<<<< HEAD
    const fallbackImages = [
      'https://www.dior.com/beauty/version-5.1432748111912/resize-image/ep/0/390/100/0/packshots%252FPDG_Y0715100.jpg',
      'https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwa8106b14/ProductImages/Face/BB_Cream/800897822927_bbcream_natural_main.jpg?sw=390&sh=390&sm=fit'
    ];
    e.target.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
=======
    const rating = Math.ceil(Math.random() * 4);
           e.target.src = rating < 3 ? "https://i.imgur.com/5EzYhOA.jpg" : "https://media.istockphoto.com/id/1206575314/vector/image-unavailable-icon.jpg?s=612x612&w=0&k=20&c=7aypXCTzJ42V0xRHJ08Nq1K6fPgY5IB_D4fXbWloX_w="
  e.target.error = null;
>>>>>>> 46edf141902c09586c2217b8db7768e5a1d52770
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated || !comment.trim() || rating === 0) {
      toast({
        title: !isAuthenticated
          ? 'You must be logged in to submit a review.'
          : rating === 0
            ? 'Please select a star rating.'
            : 'Please enter a comment.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    const newReview = {
      id: Date.now(),
      content: comment,
      rating,
      user: user?.name || 'Anonymous',
    };

    dispatch(addReview(newReview));
    setComment('');
    setRating(0);
  };

  if (!product) return <Box textAlign="center" py={10}>Product not found</Box>;

  return (
    <Box maxW="6xl" mx="auto" py={8} px={4}>
      <Flex direction={['column', 'row']} gap={10}>
        {/* Product Image */}
        <Box flex={1}>
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
          >
            <Image
              src={product.image_link}
              alt={product.name}
              objectFit="contain"
              w="100%"
              h={['300px', '450px']}
              onError={handleImageError}
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box>
        </Box>

        {/* Product Info */}
        <Box flex={1}>
          <VStack spacing={5} align="start">
            <Heading size="xl" color="gray.800">{product.name}</Heading>
            <Text fontSize="lg" color="gray.500">by {product.brand}</Text>

            {product.price && (
              <Box>
                <Text fontSize="sm" color="gray.500">Price</Text>
                <Heading size="lg" color="teal.500">${product.price}</Heading>
              </Box>
            )}

            <Box>
              <Text fontWeight="semibold" fontSize="md" mb={1}>Description</Text>
              <Text color="gray.600" lineHeight="tall">{product.description}</Text>
            </Box>

            <Button
              onClick={handleAddToCart}
              bgGradient="linear(to-r, teal.500, green.400)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, teal.600, green.500)", transform: 'scale(1.05)' }}
              size="lg"
              px={8}
              borderRadius="xl"
              shadow="md"
            >
              Add to Cart
            </Button>
          </VStack>
        </Box>
      </Flex>

      {/* Reviews */}
      <Box mt={16}>
        <Heading size="lg" mb={6}>Customer Reviews</Heading>

        <Stack spacing={4}>
          {reviews.length === 0 ? (
            <Text color="gray.500">No reviews yet. Be the first to review!</Text>
          ) : (
            reviews.map((review) => (
              <Box key={review.id} borderWidth={1} borderRadius="lg" p={4} boxShadow="sm">
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="bold" color="gray.800">{review.user}</Text>
                  <HStack spacing={0.5}>
                    {[...Array(5)].map((_, i) => (
                      <IconButton
                        key={i}
                        icon={i < review.rating ? <FaStar /> : <FaRegStar />}
                        aria-label="rating"
                        size="xs"
                        color={i < review.rating ? 'yellow.400' : 'gray.300'}
                        variant="ghost"
                        isDisabled
                      />
                    ))}
                  </HStack>
                </Flex>
                <Text color="gray.600">{review.content}</Text>
              </Box>
            ))
          )}
        </Stack>

        {/* Review Form */}
        <Box as="form" mt={10} onSubmit={handleSubmit}>
          <Heading size="md" mb={4}>Leave a Review</Heading>

          <FormControl isRequired mb={4}>
            <FormLabel>Your Comment</FormLabel>
            <Textarea
              placeholder="Write your honest feedback here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Your Rating</FormLabel>
            <HStack>
              {[...Array(5)].map((_, i) => (
                <IconButton
                  key={i}
                  icon={i < rating ? <FaStar /> : <FaRegStar />}
                  onClick={() => setRating(i + 1)}
                  color={i < rating ? 'yellow.400' : 'gray.300'}
                  variant="ghost"
                  aria-label={`rate-${i + 1}`}
                  size="lg"
                />
              ))}
            </HStack>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            isDisabled={!isAuth}  // Ensure user is also present
            px={10}
            borderRadius="xl"
            shadow="md"
          >
            Submit Review
          </Button>

          {!isAuthenticated && (
            <Text mt={2} fontSize="sm" color="red.500">
              You must be signed in to submit a review. <Link to="/login" style={{ textDecoration: 'underline' }}>Login here</Link>
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;

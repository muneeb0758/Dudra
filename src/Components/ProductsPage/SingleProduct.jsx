import { Box, Button, Heading, Icon, Image, Text, Flex, Badge } from '@chakra-ui/react'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const SingleProduct = (props) => {
    const { image_link, name, price, handleModal, id } = props;

    const rating = Math.ceil(Math.random() * 4);
    const originalPrice = (price * 1.5).toFixed(2);
    const reviewsCount = Math.floor(Math.random() * 1000);
    const saveAmount = (originalPrice - price).toFixed(2);

    const addDefault = (e) => {
        e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
        e.target.error = null;
    }

    // Green color scheme
    const primaryColor = "#2e856e"; // Dark teal green
    const accentColor = "#4caf93"; // Medium teal
    const lightAccent = "#e0f2f1"; // Very light teal
    const priceColor = "#388e3c"; // Green for prices
    const buttonColor = "#4caf50"; // Material green
    const buttonHover = "#43a047"; // Darker green
    const badgeColor = "#2e7d32"; // Dark green for badge

    return (
        <Box 
            borderWidth="1px" 
            borderRadius="lg" 
            p={4} 
            _hover={{ shadow: 'md' }}
            position="relative"
            bg="white"
        >
            {/* Premium Badge */}
            <Badge 
                position="absolute" 
                top={2} 
                left={2} 
                bg={badgeColor} 
                color="white" 
                px={2} 
                py={1}
                fontSize="xs"
            >
                Premium
            </Badge>

            {/* Product Image */}
            <Box 
                w="100%" 
                h={["200px", "250px"]} 
                mb="15px"
                display="flex" 
                alignItems="center" 
                justifyContent="center"
            >
                <Image 
                    src={image_link} 
                    maxH="100%" 
                    maxW="100%" 
                    objectFit="contain"
                    onError={addDefault}
                />
            </Box>

            {/* Product Title */}
            <Text 
                as={Link} 
                to={`/products/${id}`} 
                fontWeight="semibold" 
                noOfLines={2} 
                mb={2}
                _hover={{ color: accentColor, textDecoration: 'none' }}
            >
                {name}
            </Text>

            {/* Rating Section */}
            <Flex align="center" mb={2}>
                {Array(5)
                    .fill("")
                    .map((_, i) => (
                        <Icon
                            as={AiFillStar}
                            key={i}
                            color={i <= rating ? "#FFC107" : "gray.300"}
                            w={4}
                            h={4}
                        />
                    ))}
                <Text fontSize="sm" color="gray.600" ml={1}>({reviewsCount})</Text>
            </Flex>

            {/* Price Section */}
            <Flex align="baseline" mb={2}>
                <Heading size="lg" color={priceColor} mr={2}>
                    £{price}
                </Heading>
                <Text as="del" color="gray.600" fontSize="sm">
                    £{originalPrice}
                </Text>
            </Flex>

            {/* Savings */}
            <Text color={priceColor} fontSize="sm" mb={2}>
                Save £{saveAmount} (30%)
            </Text>

            {/* Delivery Info */}
            <Flex align="center" fontSize="sm" color={primaryColor} mb={4}>
                <Icon viewBox="0 0 24 24" w={4} h={4} mr={1}>
                    <path fill="currentColor" d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9-1a2 2 0 0 1 4 0v1h-4V6zm9 12H5V9h3v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h3v8z"/>
                </Icon>
                <Text>FREE delivery <Text as="span" fontWeight="bold">Tomorrow</Text></Text>
            </Flex>

            {/* Buttons */}
            <Flex gap={2}>
                <Button 
                    flex="1" 
                    borderRadius="md" 
                    bg={buttonColor} 
                    color="white"
                    _hover={{ bg: buttonHover }}
                    _active={{ bg: primaryColor }}
                    onClick={() => handleModal(props)}
                >
                    Add to Cart
                </Button>
                <Button 
                    as={Link} 
                    to={`/products/${id}`} 
                    flex="1" 
                    borderRadius="md" 
                    bg={lightAccent} 
                    color={primaryColor}
                    border={`1px solid ${primaryColor}`}
                    _hover={{ bg: "white", color: accentColor }}
                >
                    Buy Now
                </Button>
            </Flex>

            {/* Additional Info */}
            <Text fontSize="sm" color={primaryColor} mt={2}>
                <Icon viewBox="0 0 24 24" w={4} h={4} mr={1} verticalAlign="middle">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </Icon>
                Eco-friendly packaging
            </Text>
        </Box>
    )
}

export default SingleProduct
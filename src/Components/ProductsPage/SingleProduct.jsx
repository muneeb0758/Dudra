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
    const primaryColor = "#2e856e";
    const accentColor = "#4caf93";
    const lightAccent = "#e0f2f1";
    const priceColor = "#388e3c";
    const buttonColor = "#4caf50";
    const buttonHover = "#43a047";
    const badgeColor = "#2e7d32";

    return (
        <Box 
            borderWidth="1px" 
            borderColor="gray.200"
            borderRadius="lg" 
            p={[3, 4]}
            position="relative"
            bg="white"
            w="100%"
            maxW={["160px", "200px", "240px", "280px"]}
            minW={["160px", "180px"]}
            mx="auto"
            transition="all 0.2s ease"
            _hover={{ 
                shadow: 'lg',
                transform: 'translateY(-5px)',
                borderColor: accentColor
            }}
        >
            <Link to={`/products/${id}`} style={{ textDecoration: "none" }}>
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
                    borderRadius="md"
                    zIndex="1"
                >
                    Premium
                </Badge>

                {/* Product Image */}
                <Box 
                    w="100%" 
                    h={["120px", "150px", "180px", "200px"]}
                    mb={[2, 3]}
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    overflow="hidden"
                    borderRadius="md"
                >
                    <Image 
                        src={image_link} 
                        maxH="100%" 
                        maxW="100%" 
                        objectFit="contain"
                        onError={addDefault}
                        transition="transform 0.3s ease"
                        _hover={{
                            transform: 'scale(1.05)'
                        }}
                    />
                </Box>


                {/* Product Title */}
                <Text 
                    fontWeight="semibold" 
                    noOfLines={2} 
                    mb={2}
                    minH={["40px", "48px"]}
                    fontSize={["xs", "sm", "md"]}
                    color="gray.800"
                    _hover={{ 
                        color: accentColor,
                        textDecoration: 'none' 
                    }}
                >
                    {name}
                </Text>
            </Link>

            {/* Rating Section */}
            <Flex align="center" mb={2}>
                {Array(5)
                    .fill("")
                    .map((_, i) => (
                        <Icon
                            as={AiFillStar}
                            key={i}
                            color={i <= rating ? "#FFC107" : "gray.300"}
                            w={3}
                            h={3}
                            mr={0.5}
                        />
                    ))}
                <Text fontSize={["xs", "sm"]} color="gray.600" ml={1}>
                    ({reviewsCount})
                </Text>
            </Flex>

            {/* Price Section */}
            <Flex 
                direction={["column", "row"]}
                align={["flex-start", "baseline"]}
                mb={2}
                gap={[0, 2]}
            >
                <Heading size={["sm", "md", "lg"]} color={priceColor}>
                    £{price}
                </Heading>
                <Text as="del" color="gray.600" fontSize={["xs", "sm"]}>
                    £{originalPrice}
                </Text>
            </Flex>

            {/* Savings */}
            <Text color={priceColor} fontSize={["xs", "sm"]} mb={[1, 2, 3]}>
                Save £{saveAmount} (30%)
            </Text>

            {/* Delivery Info */}
            <Flex 
                align="center" 
                fontSize={["xs", "sm"]} 
                color={primaryColor} 
                mb={[1, 2, 3]}
            >
                <Icon viewBox="0 0 24 24" w={3} h={3} mr={1}>
                    <path fill="currentColor" d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9-1a2 2 0 0 1 4 0v1h-4V6zm9 12H5V9h3v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h3v8z"/>
                </Icon>
                <Text>
                    FREE <Text as="span" display={["none", "inline"]}>delivery </Text>
                    <Text as="span" fontWeight="bold">Tomorrow</Text>
                </Text>
            </Flex>

            {/* Buttons */}
            <Flex 
                direction={["column", "row"]}
                gap={2} 
                mb={2}
            >
                <Button 
                    flex="1" 
                    borderRadius="md" 
                    bg={buttonColor} 
                    color="white"
                    _hover={{ 
                        bg: buttonHover,
                        transform: 'translateY(-2px)'
                    }}
                    _active={{ bg: primaryColor }}
                    onClick={(e) => {
                        e.preventDefault();
                        handleModal(props);
                    }}
                    fontSize={["xs", "sm"]}
                    px={2}
                    whiteSpace="nowrap"
                    minW={["100%", "100px"]}
                    h={["30px", "40px"]}
                    transition="all 0.2s ease"
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
                    _hover={{ 
                        bg: "white", 
                        color: accentColor,
                        borderColor: accentColor,
                        transform: 'translateY(-2px)'
                    }}
                    fontSize={["xs", "sm"]}
                    px={2}
                    whiteSpace="nowrap"
                    minW={["100%", "80px"]}
                    h={["30px", "40px"]}
                    transition="all 0.2s ease"
                >
                    Buy Now
                </Button>
            </Flex>

            {/* Additional Info */}
            <Text fontSize={["10px", "xs"]} color={primaryColor}>
                <Icon viewBox="0 0 24 24" w={3} h={3} mr={1} verticalAlign="middle">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </Icon>
                Eco-packaging
            </Text>
        </Box>
    )
}

export default SingleProduct
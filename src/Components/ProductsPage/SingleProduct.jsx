import { Box, Button, Heading, Icon, Image, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const SingleProduct = (props) => {
    const { image_link, name, price, handleModal, id } = props;

    let rating = Math.ceil(Math.random() * 4);
    const addDefault = (e) => {
        e.target.src = rating < 3 ? "https://www.dior.com/beauty/version-5.1432748111912/resize-image/ep/0/390/100/0/packshots%252FPDG_Y0715100.jpg" : "https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwa8106b14/ProductImages/Face/BB_Cream/800897822927_bbcream_natural_main.jpg?sw=390&sh=390&sm=fit"
        e.target.error = null;
    }

    return (
        <Box h={["450px", "520px", "570px"]} position="relative">
            <Box border="0px" w="100%" h={["200px", "250px", "300px"]} mb="25px">
                <Image src={image_link} h={["200px", "250px", "300px"]} w="100%" onError={(e) => addDefault(e)} />
            </Box>

            <Text mb="15px">{name}</Text>

            <Button color="gray.500" mb="15px" _hover={{ bgColor: "white" }} borderRadius="0px" padding="4px" border="1px solid #ba3d49" bgColor="white">
                MSRP: $<Text as="del">{price * Math.ceil(Math.random() * 10)}</Text>
            </Button>

            <Box mb="15px">
                {Array(5)
                    .fill("")
                    .map((_, i) => (
                        <Icon
                            as={AiFillStar}
                            key={i}
                            color={i <= rating ? "gold" : "gray.300"}
                        />
                    ))}
            </Box>
            <Heading mb="15px" size="md" fontWeight="bold">{`$${price}`}</Heading>
            
            <Flex position="absolute" bottom="0px" w="100%" gap="2">
                <Button 
                    flex="1" 
                    borderRadius="0px" 
                    bgColor="black" 
                    color="white" 
                    _hover={{ bgColor: "#28bdb7", color: "black" }}
                    onClick={() => handleModal(props)}
                >
                    QUICK BUY
                </Button>
                <Button 
                    as={Link} 
                    to={`/products/${id}`} 
                    flex="1" 
                    borderRadius="0px" 
                    bgColor="#28bdb7" 
                    color="black" 
                    _hover={{ bgColor: "black", color: "white" }}
                >
                    VIEW PRODUCT
                </Button>
            </Flex>
        </Box>
    )
}

export default SingleProduct
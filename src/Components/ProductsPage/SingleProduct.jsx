import { Box, Button, Heading, Icon, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const SingleProduct = (props) => {
    const { image_link, name, price, handleModal } = props;



    let rating = Math.ceil(Math.random() * 4);
    const addDefault = (e) => {
        e.target.src = rating < 3 ? "https://i.imgur.com/s9lourz.png" : "https://i.imgur.com/W0CIqnJ.png"
        e.target.error = null;

    }
    return (
        <Box h={["450px", "520px", "570px"]} position="relative">
            <Box border="0px" w="100%" h={["200px", "250px", "300px"]} mb="25px">
                <Image src={image_link} h={["200px", "250px", "300px"]} w="100%" onError={(e) => addDefault(e)} />

            </Box>

            <Text mb="15px" >{name}</Text>

            <Button color="gray.500" mb="15px" _hover={{ bgColor: "white" }} borderRadius="0px" padding="4px" border="1px solid #ba3d49" bgColor="white">MSRP: £<Text as="del">{price * Math.ceil(Math.random() * 10)}</Text></Button>

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
            <Button borderRadius="0px" bottom="0px" position="absolute" bgColor="black" color="white" w="100%" _hover={{ bgColor: "#28bdb7", color: "black" }} onClick={() => handleModal(props)}>QUICK BUY</Button>



        </Box>
    )
}

export default SingleProduct
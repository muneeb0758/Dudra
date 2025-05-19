import { Box } from '@chakra-ui/react';
import React from 'react';
import ImageSlider from './ImageSlider';
import banner from '../images/banner.png'
import dudracar from '../images/dudracar.png'


const SliderImage = () => {
    const slides = [
      { url: "https://i.imgur.com/n7UPT01.png", title: "city" },
        { url: "https://i.imgur.com/tB4DOPs.jpg" , title: "dudrabanner" },
        { url: "https://i.imgur.com/fLovcfe.jpg", title: "boat" },
        { url: "https://i.imgur.com/5YnP6z2.png", title: "forest" },
      
      ];
      const containerStyles = {
        width: "93%",
        height: "400px",
        margin: "0 auto",
        
      };
  return (
    <Box>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </Box>
  );
}

export default SliderImage;

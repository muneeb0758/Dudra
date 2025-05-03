import { Box } from '@chakra-ui/react';
import React from 'react';
import ImageSlider from './ImageSlider';
import banner from '../images/banner.png'
import dudracar from '../images/dudracar.png'


const SliderImage = () => {
    const slides = [
        { url: banner , title: "dudrabanner" },
        { url: dudracar, title: "boat" },
        { url: "https://static.thcdn.com/images/xlarge/webp/widgets/121-us/55/Shot6-1180x450-095455.jpeg", title: "forest" },
        { url: "https://static.thcdn.com/images/xlarge/webp/widgets/121-us/03/1207-STDCRE-44662-SS-MH-Beauty-Bag-Amend-1180x450-V1-050203.jpg", title: "city" },
      
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

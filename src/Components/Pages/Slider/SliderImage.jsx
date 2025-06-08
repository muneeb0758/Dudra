import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const SliderImage = () => {
  const slides = [
    { url: "https://i.imgur.com/fLovcfe.jpg", title: "boat" },
    { url: "https://i.imgur.com/tB4DOPs.jpg", title: "dudrabanner" },
    { url: "https://i.imgur.com/n7UPT01.png", title: "city" },
    { url: "https://i.imgur.com/VyswD2n.jpg", title: "forest" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 12000); // Slide every 12 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const containerStyles = {
    width: "93%",
    height: "400px",
    margin: "0 auto",
  };

  const slideStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  const sliderStyles = {
    height: '100%',
    position: 'relative',
  };

  const arrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '45px',
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
    userSelect: 'none',
  };

  const leftArrowStyles = {
    ...arrowStyles,
    left: '32px',
  };

  const rightArrowStyles = {
    ...arrowStyles,
    right: '32px',
  };

  const dotsContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  };

  const dotStyles = {
    margin: '0 3px',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#888',
  };

  const activeDotStyles = {
    ...dotStyles,
    color: '#000',
  };

  // Safety check for slides
  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }

  return (
    <Box>
      <div style={containerStyles}>
        <div style={sliderStyles}>
          <div style={leftArrowStyles} onClick={goToPrevious}>
            ❮
          </div>
          <div style={rightArrowStyles} onClick={goToNext}>
            ❯
          </div>
          <div style={slideStyles}></div>
          <div style={dotsContainerStyles}>
            {slides.map((slide, index) => (
              <div
                key={index}
                style={index === currentIndex ? activeDotStyles : dotStyles}
                onClick={() => goToSlide(index)}
              >
                •
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SliderImage;
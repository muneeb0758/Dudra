import React, { Component } from "react";
import Slider from "react-slick";
import ProductCard1 from "./ProductCard1";
import { Box, Button, Card, CardBody, CardFooter, Divider, Image, Stack, Text } from '@chakra-ui/react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductSlider.css";
import breakfast from "../images/breakfast.jpeg";
import { connect } from 'react-redux';
import { addToCart } from "C:/Users/alpha/OneDrive/Desktop/Dudra Draft Website/ProjectSkinStore-main/src/Components/Redux/cart/cart.actions.js"

class ProductSlider1 extends Component {
  constructor() {
    super();
    this.state = {
        slides: [
        {
          img: "https://i.imgur.com/WZDyxzS.jpg",
          productdetail: "Kelloggs Fruit N Fiber 40x45g",
          discountmessage: "Breakfast cereal",
          price: "£18.99"

        },
        {
          img: "https://i.imgur.com/Qb9EbVk.jpg",
          productdetail: "Quaker Oat So Simple",
          discountmessage: "Quick and instant oats",
          price: "£14.99"
        },
        {
          img: "https://i.imgur.com/li0BNj8.jpg",
          productdetail: "Nature Valley P&C 40 count",
          discountmessage: "Protein and cereal bars",
          price: "£26.99"
        },
        {
          img: "https://i.imgur.com/deEcxAn.jpg",
          productdetail: "Nescafe Original Sticks 1x200",
          discountmessage: "Instant coffee sticks",
          price: "£19.99"
        },
        {
          img: "https://i.imgur.com/sQ00I0p.jpg",
          productdetail: "Tate & Lyle Sugar 15x1kg",
          discountmessage: "White sugar multi-pack",
          price: "£19.99"
        },
        {
          img: "https://i.imgur.com/IK9aCX1.jpg",
          productdetail: "Kesar Mango Pulp 6x850g",
          discountmessage: "Premium mango pulp",
          price: "£19.99"
        },
        {
          img: "https://i.imgur.com/gnPKlAU.jpg",
          productdetail: "Laila Basmati Rice 1x20kg",
          discountmessage: "Premium basmati rice",
          price: "£34.99"
        },
        {
          img: "https://i.imgur.com/9BlTjNO.png",
          productdetail: "Rajah Black Ground Pepper 10x100g",
          discountmessage: "Ground black pepper",
          price: "£25.99"
        },
        
      
        {
          img: "https://i.imgur.com/VFPMSfi.jpg",
          productdetail: "Country Range Honey Portions 100x20g",
          discountmessage: "Convenient honey portions",
          price: "£25.99"
        }
      ]
    };
  };

  handleAddToCart = (product) => {
    this.props.dispatch(addToCart({
      id: product.id || Math.random().toString(36).substr(2, 9), // Generate ID if missing
      name: product.productdetail,
      price: parseFloat(product.price.replace('£', '')),
      image: product.img,
      quantity: 1
    }));
  };

  
  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 4,
      initialSlide: 0,
      swipeToSlide: true,
      draggable: true,
      mouseWheel: true, // Enable mouse wheel
      touchThreshold: 10,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
      return (
      <Slider {...settings}>
        {this.state.slides.map((slide, index) => (
          <div key={index}>
            <ProductCard1 
              imgSrc={slide.img}
              productdetail={slide.productdetail}
              discountmessage={slide.discountmessage}
              price={slide.price}
              onAddToCart={() => this.handleAddToCart(slide)}
            />
          </div>
        ))}
      </Slider>
    );
  }
}

export default connect()(ProductSlider1);
  


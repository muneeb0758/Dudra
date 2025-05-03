import React, { Component } from "react";
import Slider from "react-slick";
import ProductCard1 from "./ProductCard1";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductSlider.css";
import breakfast from "../images/breakfast.jpeg";

class ProductSlider1 extends Component {
  constructor() {
    super();
    this.state = {
      slides: [
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"Chantecaille The Ultimate Lifting Duo (Worth $625.00)",
             discountmessage:"25% off with code REPLAY",
             price:"$550"
        
        },
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"Eve Lom Decadent Double  Holiday Set 2022 (Worth $235.00)",
             discountmessage:"25% off with code REPLAY",
             price:"$350"
        },
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"Elemis Cleanse and Pro-Collagen Tale Set (Worth $165.00)",
             discountmessage:"25% off with code REPLAY",
             price:"$250"
        },
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"Molton Brown Festive Bauble Gift Set",
             discountmessage:"25% off with code REPLAY",
             price:"$350"
        },
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"Medik8 A Winter's Night Kit",
             discountmessage:"25% off with code REPLAY",
             price:"$450"
        },
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"U Beauty The Resurfacing Holiday Set (Worth $316.00)",
             discountmessage:"25% off with code REPLAY",
             price:"$150"
        },
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"T3 Volume 2.5 Round Brush",
             discountmessage:"25% off with code REPLAY",
             price:"$50"
        },
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"Obagi Clinical Kinetin+ Hydrating Cream 1.7 fl. oz",
             discountmessage:"25% off with code REPLAY",
             price:"$250"
        },
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"NEST New York Bamboo Reed Diffuser 175ml",
             discountmessage:"25% off with code REPLAY",
             price:"$850"
        },
        {
          img: "https://i.imgur.com/W0CIqnJ.png",
          productdetail:"Medik8 A Winter's Day Kit",
             discountmessage:"25% off with code REPLAY",
             price:"$550"
        }
      ]
    };
  }
  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
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
      <div>
        <Slider {...settings}>
          {this.state.slides.map((slide, index) => {
            return (
              <div key={index}>
                <ProductCard1 imgSrc={slide.img} productdetail={slide.productdetail} discountmessage={slide.discountmessage} price={slide.price}/>
                {/* <img src={slide.img} alt={`slide${index}`} /> */}
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default ProductSlider1;

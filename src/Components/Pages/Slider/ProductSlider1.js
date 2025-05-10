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
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Kelloggs Fruit N Fiber 40x45g",
          discountmessage: "High fiber breakfast cereal",
          price: "£18.99"

        },
        {
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Quaker Oat So Simple",
          discountmessage: "Quick and instant oats",
          price: "Check Price"
        },
        {
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Nature Valley P&C 40 count",
          discountmessage: "Protein and cereal bars",
          price: "£26.99"
        },
        {
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Nescafe Original Sticks 1x200",
          discountmessage: "Instant coffee sticks",
          price: "£19.99"
        },
        {
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Tate & Lyle Sugar 15x1kg",
          discountmessage: "White sugar multi-pack",
          price: "£19.99"
        },
        {
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Kesar Mango Pulp 6x850g",
          discountmessage: "Premium mango pulp",
          price: "£19.99"
        },
        {
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Laila Basmati Rice 1x20kg",
          discountmessage: "Premium basmati rice",
          price: "£34.99"
        },
        {
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Rajah Black Ground Pepper 10x100g",
          discountmessage: "Ground black pepper",
          price: "£25.99"
        },
        {
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Sapna Ginger & Garlic Paste 6x1kg",
          discountmessage: "Ready-to-use paste",
          price: "£18.99"
        },
        {
          img: "https://i.imgur.com/UdfQqVJ.jpg",
          productdetail: "Country Range Honey Portions 100x20g",
          discountmessage: "Convenient honey portions",
          price: "£25.99"
        }
      ]
    };
  };
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

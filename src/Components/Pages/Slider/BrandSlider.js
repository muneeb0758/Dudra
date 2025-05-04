import React, { Component } from "react";
import Slider from "react-slick";
// import ProductCard1 from "./ProductCard1";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Brandslider.css";
import BrandCard from "./BrandCard";

class BrandSlider extends Component {
  constructor() {
    super();
    this.state = {
      branddata: [
        
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Kelloggs Fruit N Fiber 40x45g",
            discountmessage: "High fiber breakfast cereal with dried fruits",
            price: "£18.99"
          },
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Nature Valley Protein & Cereal Bars",
            discountmessage: "Case of 40 protein bars, 42g each",
            price: "£26.99"
          },
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Kesar Mango Pulp 6x850g",
            discountmessage: "Premium mango pulp in cans",
            price: "£19.99"
          },
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Dettol Antibacterial Wipes",
            discountmessage: "10 packs of 30 wipes - kills 99.9% bacteria",
            price: "£12.99"
          },
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Euro Collection Shampoo Sachets",
            discountmessage: "500 pack of 10ml sachets",
            price: "£81.99"
          },
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Tate & Lyle Sugar 15x1kg",
            discountmessage: "Premium white sugar multi-pack",
            price: "£19.99"
          },
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Rajah Black Ground Pepper",
            discountmessage: "10x100g packs of premium pepper",
            price: "£25.99"
          },
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Laila Basmati Rice 20kg",
            discountmessage: "Premium quality basmati rice",
            price: "£34.99"
          },
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Country Range Honey Portions",
            discountmessage: "100x20g convenient honey portions",
            price: "£25.99"
          },
          {
            img: "https://i.imgur.com/5EzYhOA.jpg",
            productdetail: "Fiesta Green Paper Bags",
            discountmessage: "250 pack of large brown bags with handles",
            price: "£22.99"
          },
        
      ]
    };
  }
  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
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
          {this.state.branddata.map((slide, index) => {
            return (
              <div key={index}>
                <BrandCard imgSrc={slide.img} productdetail={slide.productdetail} discountmessage={slide.discountmessage} price={slide.price}/>
                {/* <img src={slide.img} alt={`slide${index}`} /> */}
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default BrandSlider;

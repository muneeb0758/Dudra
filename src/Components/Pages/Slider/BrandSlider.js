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
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    return (
      <div className="brand-slider-container">
        <Slider {...settings}>
          {this.state.branddata.map((item, index) => (
            <div key={index} className="brand-card">
              <div className="image-container">
                <img 
                  src={item.img} 
                  alt={item.productdetail}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Product+Image";
                  }}
                />
              </div>
              <h3>{item.productdetail}</h3>
              <p className="description">{item.discountmessage}</p>
              <p className="price">{item.price}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default BrandSlider;
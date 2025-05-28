import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom"; // Correct Link for routing
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Brandslider.css";

import { allProducts } from "../../ProductsPage/allprooducts";

const BrandSlider = () => {
  // Fetch products from Packaging category
  const packagingProducts = allProducts.Packaging || [];

  // Remove duplicates by ID
  const uniqueProducts = [
    ...new Map(packagingProducts.map((item) => [item.id, item])).values(),
  ];

  // Slice and format product data
  const brandData = uniqueProducts.slice(0, 10).map((product) => ({
    id: product.id,
    img:
      product.image_link ||
      "https://via.placeholder.com/300x200?text=Product+Image",
    productdetail: product.name,
    discountmessage: product.description,
    price: `£${product.price || "N/A"}`,
  }));

  const settings = {
    dots: true,
    infinite: packagingProducts.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, packagingProducts.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, packagingProducts.length),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Slider {...settings}>
        {brandData.map((item) => (
          <div key={item.id} style={{ padding: "10px", maxWidth: "260px", margin: "auto" }}>
            <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  padding: "12px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    overflow: "hidden",
                    borderRadius: "6px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.productdetail}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Product+Image";
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    margin: "8px 0",
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  {item.productdetail}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginBottom: "6px",
                    lineHeight: "1.4",
                  }}
                >
                  {item.discountmessage}
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#2e7d32",
                  }}
                >
                  {item.price}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandSlider;

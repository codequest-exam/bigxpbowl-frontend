import React from "react";
import "../styling/productcardview.css";

const ProductCardView: React.FC = () => {
  const products = [
    { name: "Coca Cola", price: 35 },
    { name: "Sprite", price: 50 },
    { name: "Fanta", price: 45 },
  ];

  return (
    <div>
      <h3 style={{ color: "black", textAlign: "center" }}>Hardcoded products</h3>
      {products.map((product, index) => (
        <div key={index} className="product-card">
          {/* <img src={product.image} alt={product.name} className="product-image" /> */}
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">Price: {product.price},- dkk</p>
          <button className="add-button">Add</button>
        </div>
      ))}
    </div>
  );
};

export default ProductCardView;

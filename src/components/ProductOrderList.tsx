import React from "react";
import "../styling/productorderlist.css";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductOrderListProps {
  products: Product[];
}

const ProductOrderList: React.FC<ProductOrderListProps> = ({ products }) => {
  // Hardcoded example products
  const hardcodedProducts: Product[] = [
    { id: 1, name: "Cola", price: 10 },
    { id: 2, name: "Sprite", price: 20 },
    { id: 3, name: "Fanta", price: 30 },
  ];

  return (
    <div className="order-list">
      <h2>Hardcoded Product Order List</h2>
      <ul>
        {hardcodedProducts.map((product) => (
          <li key={product.id} className="order-item">
            <span className="order-item-name">{product.name}</span>
            <span className="order-item-quantity">1</span>
            <span className="order-item-price">{product.price},-</span>
          </li>
        ))}
        <li className="order-total">
          <span>Total</span>
          <span>{hardcodedProducts.reduce((total, product) => total + product.price, 0)},- dkk</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductOrderList;

import React, { useState, useEffect } from 'react';
import '../styling/productcardview.css';
import { Product } from '../interfaces/productInterface';
import { getProducts } from '../services/apiFacade';

const ProductCardView: React.FC = () => {
        const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const productList = await getProducts();
        console.log(productList);

        setProducts(productList);
      };

      fetchProducts();
    }, []);

    return (
        <div className="product-list">
            <h3 style={{ color: 'black' }}>Products</h3>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.imgURL} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">Price: {product.price},- dkk</p>
                        <button className="add-button">Add</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCardView;
import React from 'react';

const ProductCardView: React.FC = () => {
    const products = [
        { name: 'Coca Cola', price: 2.99 },
        { name: 'Sprite', price: 2.49 },
        { name: 'Fanta', price: 2.49 }
    ];
    console.log(products);
    

    return (
        <div>
            {products.map((product, index) => (
                <div key={index} className="card">
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductCardView;

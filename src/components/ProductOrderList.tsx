import React from 'react';

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
        { id: 1, name: 'Cola', price: 10 },
        { id: 2, name: 'Sprite', price: 20 },
        { id: 3, name: 'Fanta', price: 30 },
    ];

    return (
        <div>
            <h2>Product Order List</h2>
            <ul>
                {hardcodedProducts.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductOrderList;

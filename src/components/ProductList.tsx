import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/apiFacade.ts';

interface Product {
    id: number;
    name: string;
    price: number;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const productsList = await getProducts();
        console.log(productsList);

        setProducts(productsList);
      };

      fetchProducts();
    }, []);

    // const handleEdit = (productId: number) => {
    //     // Handle edit logic here
    //     console.log(`Editing product with ID: ${productId}`);
    // };

    // const handleDelete = (productId: number) => {
    //     // Handle delete logic here
    //     console.log(`Deleting product with ID: ${productId}`);
    // };

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                <li>Coca Cola
                    <button>Edit</button>
                    <button>Delete</button>
                </li>
                {/* {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${(product.price)}
                        <button onClick={() => handleEdit(product.id)}>Edit</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))} */}
            </ul>
        </div>
    );
};

export default ProductList;

import React, { useState } from 'react';

interface ProductFormProps {
    onSubmit: (product: Product) => void;
}

interface Product {
    name: string;
    price: number;
    description: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct: Product = {
            name,
            price,
            description,
        };

        onSubmit(newProduct);
    };

    return (
        <form onSubmit={handleSubmit} style={{color: 'black'}}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </label>
            <br />
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <button type="submit">Create Product</button>
        </form>
    );
};

export default ProductForm;

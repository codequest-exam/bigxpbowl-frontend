import '../styling/productcardview.css';
import { Product } from '../interfaces/productInterface';


interface ProductCardViewProps {
    products: Product[];
    onAddToOrder: (product: Product) => void;
}


const ProductCardView: React.FC<ProductCardViewProps> = ({ products, onAddToOrder }) => {
console.log(products);


    return (
        <div className="product-list">
            <h1 style={{ color: 'black' }}>Beverages</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.imgURL} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">Price: {product.price},- dkk</p>
                        <button className="add-button" onClick={() => onAddToOrder(product)}>Add</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCardView;

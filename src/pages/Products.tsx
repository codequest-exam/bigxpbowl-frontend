import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

export default function Products() {
    return (
        <div style={{color: "orange"}}>
            <h2>Manage products</h2>
            <ProductForm />
            <ProductList />
        </div>
    );
    }
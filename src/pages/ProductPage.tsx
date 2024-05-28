import { useState } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { Product } from "../interfaces/productInterface";

const defaultFormObj: Product = {
  id: 0,
  name: "",
  price: 0,
};

export default function ProductPage() {
  const [formData, setFormData] = useState<Product>(defaultFormObj);
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div
      style={{ display: "flex", margin: "1rem", padding: "1vw", gap: "2vw" }}
    >
      <ProductForm
        setProducts={setProducts}
        formData={formData}
        setFormData={setFormData}
        defaultFormObj={defaultFormObj}
      />
      <ProductList
        products={products}
        setProducts={setProducts}
        setFormData={setFormData}
      />
    </div>
  );
}

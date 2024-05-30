import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../services/apiFacade";
import { Product } from "../interfaces/productInterface";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  product: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, product }) => {
  const defaultFormObj: Product = {
    id: undefined,
    name: "",
    price: 0,
    imgURL: "",
  };

  const [formData, setFormData] = useState<Product>(product || defaultFormObj);

  useEffect(() => {
    setFormData(product || defaultFormObj);
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let savedProduct;
      if (formData.id) {
        savedProduct = await updateProduct(formData.id, formData);
      } else {
        savedProduct = await createProduct(formData);
      }
      onSubmit(savedProduct);
      setFormData(defaultFormObj);
      toast.success("Product saved successfully");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price" && Number(value) < 0) {
      toast.error("Price cannot be negative");
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="reservation-form-page">
      <h2 className="reservation-header">Add New Product</h2>
      <div className="reservation-form-container">
        <form className="reservation-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="imgURL"
              value={formData.imgURL}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

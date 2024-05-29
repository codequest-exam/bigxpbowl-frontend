
import { useEffect, useState } from "react";
import ProductCardView from "../components/ProductCardView";
import ProductOrderList from "../components/ProductOrderList";
import { Product } from "../interfaces/productInterface";
import { getProducts } from "../services/apiFacade";


export default function OrderProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderList, setOrderList] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const productsList = await getProducts();
    setProducts(productsList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductOrderSubmit = () => {
    setOrderList([]);
  };

  const handleAddToOrder = (product: Product) => {
    setOrderList(prevOrderList => [...prevOrderList, product]);
  };

  const removeFromOrder = (productId: number) => {
    setOrderList((prevOrderList) => {
      const productInstances = prevOrderList.filter(
        (product) => product.id === productId
      ).length;
      if (productInstances > 1) {
        const productIndex = prevOrderList.findIndex(
          (product) => product.id === productId
        );
        return [
          ...prevOrderList.slice(0, productIndex),
          ...prevOrderList.slice(productIndex + 1),
        ];
      } else {
        return prevOrderList.filter((product) => product.id !== productId);
      }
    });
  };

  return (
    <>
      <div
        style={{ display: "flex", margin: "3rem", padding: "2vw", gap: "28vw" }}
      >
        <div>
          <ProductCardView
            products={products}
            onAddToOrder={handleAddToOrder}
          />
        </div>
        <div>
          <ProductOrderList
            orderList={orderList}
            onSubmit={handleProductOrderSubmit}
            removeFromOrder={removeFromOrder}
          />
        </div>
      </div>
    </>
  );
}
import { useState, useEffect } from "react";
import "../styling/productorderlist.css";
import { Product } from "../interfaces/productInterface";

interface ProductOrderListProps {
  orderList: Product[];
  onSubmit: () => void;
  removeFromOrder: (productId: number) => void;
}

const ProductOrderList: React.FC<ProductOrderListProps> = ({ orderList, onSubmit, removeFromOrder }) => {
    const [uniqueOrderList, setUniqueOrderList] = useState<Product[]>([]);

    useEffect(() => {
      setUniqueOrderList(
        Array.from(new Set(orderList.map((product) => product.id)))
          .map((id) => orderList.find((product) => product.id === id))
          .filter((product): product is Product => product !== undefined)
      );
    }, [orderList]);

    return (
        <div className="order-list" style={{ position: "sticky", top: 80 }}>
            <h2>Beverages Order</h2>
            <ul>
                {uniqueOrderList.map((product) => {
                    const quantity = orderList.filter((p) => p.id === product.id).length;
                    
                    return (
                        <li key={product.id} className="order-item">
                            <span className="order-item-name">{product.name}</span>
                            <span className="order-item-quantity">{quantity}</span>
                            <span className="order-item-price">{product.price * quantity},-</span>
                            <button onClick={() => removeFromOrder(product.id)}>
                                Remove
                            </button>
                        </li>
                    );
                })}
                <li className="order-total">
                    <span>Total</span>
                    <span>
                        {orderList.reduce((total, product) => total + product.price, 0)},-
                        dkk
                    </span>
                </li>
            </ul>
            <button onClick={onSubmit}>Submit Order</button>
        </div>
    );
};

export default ProductOrderList;

import ProductCardView from "../components/ProductCardView";
import ProductOrderList from "../components/ProductOrderList";

export default function OrderProducts() {
  return (
    <>
      <div
        style={{ display: "flex", margin: "3rem", padding: "2vw", gap: "28vw" }}
      >
        <div>
          <ProductCardView />
        </div>
        <div>
          <ProductOrderList />
        </div>
      </div>
    </>
  );
}

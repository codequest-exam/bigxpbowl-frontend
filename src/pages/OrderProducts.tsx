import ProductCardView from "../components/ProductCardView";
import ProductOrderList from "../components/ProductOrderList";

export default function OrderProducts() {


  return (
    <>
      <div
        style={{ display: "flex", margin: "1rem", padding: "1vw", gap: "2vw" }}
      >
        <div>
          <ProductCardView />
        </div>
        <div>
          <ProductOrderList
        />
        </div>
      </div>
    </>
  );
}

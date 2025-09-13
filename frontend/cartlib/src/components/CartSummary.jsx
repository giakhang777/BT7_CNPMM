import React from "react";
import "../styles.css";

export default function CartSummary({ total, count, onCheckout }) {
  return (
    <div className="cartsummary">
      <div className="cartsummary__line">
        <span>Tạm tính</span>
        <strong>${total.toFixed(2)}</strong>
      </div>
      <div className="cartsummary__line">
        <span>Số lượng</span>
        <strong>{count}</strong>
      </div>
      <button className="cbtn cbtn--primary w-full" onClick={onCheckout}>
        Thanh toán
      </button>
    </div>
  );
}

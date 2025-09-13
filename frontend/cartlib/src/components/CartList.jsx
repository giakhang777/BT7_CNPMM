import React from "react";
import CartItem from "./CartItem.jsx";
import "../styles.css";

export default function CartList({ items, onQty, onRemove, emptyText = "Giỏ hàng trống" }) {
  if (!items?.length) return <div className="muted">{emptyText}</div>;
  return (
    <div className="cartlist">
      {items.map((it) => (
        <CartItem key={it.id} item={it} onQty={onQty} onRemove={onRemove} />
      ))}
    </div>
  );
}

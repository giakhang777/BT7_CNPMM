import React from "react";
import QuantityStepper from "./QuantityStepper.jsx";
import Button from "./Button.jsx";
import "../styles.css";

export default function CartItem({ item, onQty, onRemove }) {
  const { id, name, price, quantity, image } = item;
  return (
    <div className="cartitem">
      {image && <img className="cartitem__img" src={image} alt={name} />}
      <div className="cartitem__meta">
        <div className="cartitem__name">{name}</div>
        <div className="cartitem__price">${Number(price).toFixed(2)}</div>
        <QuantityStepper value={quantity} onChange={(q) => onQty(id, q)} />
      </div>
      <div className="cartitem__actions">
        <Button variant="danger" onClick={() => onRemove(id)}>Xóa</Button>
      </div>
    </div>
  );
}

import React from "react";
import Button from "./Button.jsx";
import { useCart } from "../hooks/useCart.js";

export default function AddToCartButton({ product, quantity = 1, children = "Thêm vào giỏ" }) {
  const { addItem } = useCart();
  return (
    <Button onClick={() => addItem({ ...product, quantity })}>
      {children}
    </Button>
  );
}

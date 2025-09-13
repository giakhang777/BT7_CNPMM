import React from "react";
import Button from "./Button.jsx";
import "../styles.css";

export default function QuantityStepper({ value, onChange, min = 1 }) {
  const dec = () => onChange(Math.max(min, (value || min) - 1));
  const inc = () => onChange((value || min) + 1);
  return (
    <div className="qty">
      <Button variant="ghost" onClick={dec}>−</Button>
      <span className="qty__value">{value || min}</span>
      <Button variant="ghost" onClick={inc}>+</Button>
    </div>
  );
}

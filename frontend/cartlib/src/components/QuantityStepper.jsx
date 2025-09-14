import React from "react";
import { InputNumber } from "antd";

export default function QuantityStepper({ value, onChange, min = 1, max }) {
  const handle = (v) => {
    const n = Number.isFinite(v) ? Math.max(min, v) : min;
    onChange?.(n);
  };

  return (
    <InputNumber
      min={min}
      max={max}
      value={value ?? min}
      onChange={handle}
      controls
      size="small"
      style={{ width: 96 }}
    />
  );
}

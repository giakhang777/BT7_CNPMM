import React from "react";
import { Checkbox, Typography, Image } from "antd";
import Button from "./Button.jsx";
import QuantityStepper from "./QuantityStepper.jsx";

const VND = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    Number(n || 0)
  );

/**
 * Props:
 * - item: { id, name, price, quantity, image }
 * - checked: boolean
 * - onCheck: (id, checked) => void
 * - onQty: (id, q) => void
 * - onRemove: (id) => void
 */
export default function CartItem({ item, checked, onCheck, onQty, onRemove }) {
  const { id, name, price, quantity, image } = item;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "24px 56px 1fr 120px 64px", // checkbox | ảnh | info | qty | xóa
        alignItems: "center",
        gap: 12,
        width: "100%",
      }}
    >
      {/* Checkbox */}
      <Checkbox
        checked={checked}
        onChange={(e) => onCheck?.(id, e.target.checked)}
      />

      {/* Ảnh */}
      {image ? (
        <Image
          src={image}
          width={56}
          height={56}
          style={{ objectFit: "cover", borderRadius: 8 }}
          preview={false}
        />
      ) : (
        <div
          style={{ width: 56, height: 56, background: "#f3f4f6", borderRadius: 8 }}
        />
      )}

      {/* Thông tin: cho phép xuống dòng, không ellipsis */}
      <div style={{ minWidth: 0 }}>
        <Typography.Paragraph
          style={{
            marginBottom: 0,
            fontWeight: 600,
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
          ellipsis={false}
        >
          {name}
        </Typography.Paragraph>
        <div style={{ marginTop: 4, color: "rgba(0,0,0,.65)" }}>{VND(price)}</div>
      </div>

      {/* Số lượng: cột cố định, canh phải để thẳng hàng */}
      <div style={{ justifySelf: "end" }}>
        <QuantityStepper value={quantity} onChange={(q) => onQty?.(id, q)} />
      </div>

      {/* Xóa */}
      <div style={{ justifySelf: "end" }}>
        <Button variant="ghost" onClick={() => onRemove?.(id)}>
          Xóa
        </Button>
      </div>
    </div>
  );
}

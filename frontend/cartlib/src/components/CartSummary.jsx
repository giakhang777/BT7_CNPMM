import React from "react";
import { Card, Typography, Divider } from "antd";
import Button from "./Button.jsx";

const VND = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(n || 0));

export default function CartSummary({ total, count, onCheckout }) {
  return (
    <Card size="small" bordered style={{ background: "#fff" }} bodyStyle={{ padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Text>Số sản phẩm</Typography.Text>
        <Typography.Text strong>{count}</Typography.Text>
      </div>
      <Divider style={{ margin: "8px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Text>Tổng (tất cả sản phẩm)</Typography.Text>
        <Typography.Text strong>{VND(total)}</Typography.Text>
      </div>
      <Button variant="primary" style={{ width: "100%", marginTop: 10 }} onClick={onCheckout}>
        Thanh toán
      </Button>
    </Card>
  );
}

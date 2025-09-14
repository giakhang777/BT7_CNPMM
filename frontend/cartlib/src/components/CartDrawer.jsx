import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Space, Divider, Typography, Checkbox } from "antd";
import { useCart } from "../hooks/useCart.js";
import CartList from "./CartList.jsx";
import CartSummary from "./CartSummary.jsx";
import Button from "./Button.jsx";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { state, setQuantity, removeItem, clearCart } = useCart();

  // --- Checkbox: chỉ để chọn khi checkout, KHÔNG ảnh hưởng đếm/tổng ---
  const [selectedIds, setSelectedIds] = useState(new Set());
  useEffect(() => {
    setSelectedIds(new Set(state.items.map((it) => it.id))); // mặc định chọn hết
  }, [state.items]);

  // ✅ Đếm theo số MẶT HÀNG (distinct items), không phụ thuộc checkbox/quantity
  const itemCount = state.items.length;

  // Checkbox header
  const checkedCount = selectedIds.size;
  const allChecked = itemCount > 0 && checkedCount === itemCount;
  const indeterminate = checkedCount > 0 && checkedCount < itemCount;

  const toggleOne = (id, checked) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (checked) next.add(id); else next.delete(id);
      return next;
    });
  };
  const toggleAll = (checked) => {
    setSelectedIds(checked ? new Set(state.items.map(it => it.id)) : new Set());
  };

  // ✅ Tổng tiền của TẤT CẢ mặt hàng (không phụ thuộc checkbox)
  const totalAll = useMemo(() => {
    return state.items.reduce(
      (s, it) => s + Number(it.price || 0) * Number(it.quantity || 0),
      0
    );
  }, [state.items]);

  return (
    <>
      {/* ✅ Hiển thị số MẶT HÀNG, không dùng getCount/selectedCount */}
      <Button variant="default" onClick={() => setOpen(true)}>
        Giỏ hàng ({itemCount})
      </Button>

      <Drawer
        title="Giỏ hàng"
        placement="right"
        width={520}
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Space size={16}>
            <Checkbox
              checked={allChecked}
              indeterminate={indeterminate}
              onChange={(e) => toggleAll(e.target.checked)}
            >
              Chọn tất cả
            </Checkbox>
            <Button variant="ghost" onClick={clearCart}>Xóa hết</Button>
          </Space>
        }
        styles={{
          content: { background: "#fff" },
          header: { background: "#fff" },
          body: { background: "#fff" },
          footer: { background: "#fff" },
        }}
      >
        <CartList
          items={state.items}
          selectedIds={selectedIds}
          onToggle={toggleOne}
          onQty={setQuantity}
          onRemove={removeItem}
        />

        <Divider />

        <Typography.Title level={5} style={{ marginTop: 0 }}>
          Tóm tắt
        </Typography.Title>

        {/* ✅ count = distinct items; total = tổng toàn giỏ */}
        <CartSummary
          count={itemCount}
          total={totalAll}
          onCheckout={() => {
            const selectedItems = state.items.filter(it => selectedIds.has(it.id));
            // TODO: navigate("/checkout", { state: { items: selectedItems } })
            setOpen(false);
          }}
        />
      </Drawer>
    </>
  );
}

import React from "react";
import { List, Empty } from "antd";
import CartItem from "./CartItem.jsx";

/**
 * Props:
 * - items: []
 * - selectedIds: Set<number|string>
 * - onToggle: (id, checked) => void
 * - onQty: (id, q) => void
 * - onRemove: (id) => void
 * - emptyText?: string
 */
export default function CartList({
  items,
  selectedIds,
  onToggle,
  onQty,
  onRemove,
  emptyText = "Giỏ hàng trống",
}) {
  if (!items?.length) {
    return <Empty description={emptyText} />;
  }
  return (
    <List
      dataSource={items}
      renderItem={(it) => (
        <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
          <CartItem
            item={it}
            checked={!!selectedIds?.has(it.id)}
            onCheck={onToggle}
            onQty={onQty}
            onRemove={onRemove}
          />
        </List.Item>
      )}
      style={{ paddingRight: 6 }}
    />
  );
}

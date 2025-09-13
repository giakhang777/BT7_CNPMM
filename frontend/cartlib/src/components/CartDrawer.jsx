import React, { useState } from "react";
import { useCart } from "../hooks/useCart.js";
import CartList from "./CartList.jsx";
import CartSummary from "./CartSummary.jsx";
import Button from "./Button.jsx";
import "../styles.css";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { state, setQuantity, removeItem, clearCart, getTotal, getCount } = useCart();

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Giỏ hàng ({getCount()})
      </Button>

      {open && (
        <div className="drawer__backdrop" onClick={() => setOpen(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer__header">
              <strong>Giỏ hàng</strong>
              <button className="iconbtn" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="drawer__body">
              <CartList
                items={state.items}
                onQty={setQuantity}
                onRemove={removeItem}
              />
            </div>
            <div className="drawer__footer">
              <CartSummary
                total={getTotal()}
                count={getCount()}
                onCheckout={() => alert("Đi tới trang thanh toán")}
              />
              <button className="cbtn cbtn--ghost mt-2" onClick={clearCart}>Xóa hết</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles.css";

const modalRootId = "cart-ui-modal-root";

export default function Modal({ open, onClose, title, children, actions }) {
  useEffect(() => {
    let root = document.getElementById(modalRootId);
    if (!root) {
      root = document.createElement("div");
      root.id = modalRootId;
      document.body.appendChild(root);
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  const node = (
    <div className="cmodal__backdrop" onClick={onClose}>
      <div className="cmodal" onClick={(e) => e.stopPropagation()}>
        {title && <div className="cmodal__header">{title}</div>}
        <div className="cmodal__body">{children}</div>
        {actions && <div className="cmodal__footer">{actions}</div>}
      </div>
    </div>
  );

  const root = document.getElementById(modalRootId);
  return ReactDOM.createPortal(node, root);
}

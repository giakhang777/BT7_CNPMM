import React from "react";
import "../styles.css";

export default function Card({ children, header, footer, ...rest }) {
  return (
    <div className="ccard" {...rest}>
      {header && <div className="ccard__header">{header}</div>}
      <div className="ccard__body">{children}</div>
      {footer && <div className="ccard__footer">{footer}</div>}
    </div>
  );
}

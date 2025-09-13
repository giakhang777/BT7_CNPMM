import React from "react";
import "../styles.css";

export default function Button({ children, variant = "primary", ...rest }) {
  return (
    <button className={`cbtn cbtn--${variant}`} {...rest}>
      {children}
    </button>
  );
}

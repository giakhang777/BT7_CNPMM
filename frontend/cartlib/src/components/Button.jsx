import React from "react";
import { Button as AntButton } from "antd";

/** Map variant -> ant design props */
function mapProps(variant) {
  if (variant === "primary") return { type: "primary" };
  if (variant === "danger") return { danger: true, type: "primary" };
  if (variant === "ghost") return { type: "text" };
  // secondary/default
  return { type: "default" };
}

export default function Button({ children, variant = "primary", ...rest }) {
  const antdProps = mapProps(variant);
  return (
    <AntButton {...antdProps} {...rest}>
      {children}
    </AntButton>
  );
}

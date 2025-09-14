import React from "react";
import { Input, Typography } from "antd";

export default function InputText({ label, error, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <Typography.Text type="secondary">{label}</Typography.Text>}
      <Input status={error ? "error" : ""} {...rest} />
      {error && (
        <Typography.Text type="danger" style={{ fontSize: 12 }}>
          {error}
        </Typography.Text>
      )}
    </div>
  );
}

import React from "react";
import "../styles.css";

export default function InputText({ label, error, ...rest }) {
  return (
    <label className="cinput">
      {label && <span className="cinput__label">{label}</span>}
      <input className={`cinput__field ${error ? "has-error" : ""}`} {...rest} />
      {error && <span className="cinput__error">{error}</span>}
    </label>
  );
}

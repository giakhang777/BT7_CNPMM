// styles cho consumer có thể import
import "./styles.css";

// base components
export { default as Button } from "./components/Button.jsx";
export { default as InputText } from "./components/InputText.jsx";
export { default as Modal } from "./components/Modal.jsx";
export { default as Card } from "./components/Card.jsx";

// cart components
export { default as QuantityStepper } from "./components/QuantityStepper.jsx";
export { default as CartItem } from "./components/CartItem.jsx";
export { default as CartList } from "./components/CartList.jsx";
export { default as CartSummary } from "./components/CartSummary.jsx";
export { default as AddToCartButton } from "./components/AddToCartButton.jsx";
export { default as CartDrawer } from "./components/CartDrawer.jsx";

// context + hook
export { CartProvider } from "./context/CartContext.jsx";
export { useCart } from "./hooks/useCart.js";
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const CartContext = createContext(null);

const initialState = {
  items: [], // {id, name, price, quantity, image, attrs?}
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.payload || state;
    }
    case "ADD_ITEM": {
      const { item, mergeBy = "id" } = action.payload;
      const idx = state.items.findIndex((it) => it[mergeBy] === item[mergeBy]);
      let next = [];
      if (idx >= 0) {
        next = [...state.items];
        const exist = next[idx];
        next[idx] = {
          ...exist,
          quantity: (exist.quantity || 0) + (item.quantity || 1),
        };
      } else {
        next = [...state.items, { ...item, quantity: item.quantity || 1 }];
      }
      return { ...state, items: next };
    }
    case "UPDATE_ITEM": {
      const { id, patch } = action.payload;
      const next = state.items.map((it) =>
        it.id === id ? { ...it, ...patch } : it
      );
      return { ...state, items: next };
    }
    case "SET_QTY": {
      const { id, quantity } = action.payload;
      const next = state.items
        .map((it) => (it.id === id ? { ...it, quantity } : it))
        .filter((it) => (it.quantity || 0) > 0);
      return { ...state, items: next };
    }
    case "REMOVE_ITEM": {
      const next = state.items.filter((it) => it.id !== action.payload.id);
      return { ...state, items: next };
    }
    case "CLEAR": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

export function CartProvider({
  children,
  storageKey = "cart-ui:v1",
  persist = true,
}) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // khởi tạo từ localStorage
  useEffect(() => {
    if (!persist) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) dispatch({ type: "INIT", payload: JSON.parse(raw) });
    } catch (err) {
      // Tránh crash, chỉ cảnh báo khi chạy browser
      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV !== "production"
      ) {
        console.warn("[cart-ui] Failed to read cart from storage:", err);
      }
    }
  }, [persist, storageKey]);

  // lưu lại localStorage
  useEffect(() => {
    if (!persist) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (err) {
      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV !== "production"
      ) {
        console.warn("[cart-ui] Failed to save cart to storage:", err);
      }
    }
  }, [state, persist, storageKey]);

  const api = useMemo(() => {
    const getCount = () =>
      state.items.reduce((s, it) => s + (it.quantity || 0), 0);
    const getTotal = () =>
      state.items.reduce(
        (s, it) => s + Number(it.price || 0) * Number(it.quantity || 0),
        0
      );

    return {
      state,
      addItem: (item, mergeBy) =>
        dispatch({ type: "ADD_ITEM", payload: { item, mergeBy } }),
      updateItem: (id, patch) =>
        dispatch({ type: "UPDATE_ITEM", payload: { id, patch } }),
      setQuantity: (id, quantity) =>
        dispatch({ type: "SET_QTY", payload: { id, quantity } }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      getCount,
      getTotal,
    };
  }, [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}

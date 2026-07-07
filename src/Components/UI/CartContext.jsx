import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const exist = cartItems.find((x) => x.id === item.id);

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === item.id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...item, quantity: 1 }
      ]);
    }
  };

  const removeFromCart = (id) => {
  setCartItems((prev) =>
    prev.filter((item) => item.id !== id)
  );
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
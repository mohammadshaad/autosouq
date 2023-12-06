import React, { createContext, useReducer, useEffect } from "react";
import { CartReducer } from "./CartReducer";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const initialState = {
    shoppingCart: [],
    totalPrice: 0,
    totalQty: 0,
  };

  const [cart, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch({ type: 'SET_CART_FROM_LOCAL_STORAGE', cartData: storedCart });
  }, []);

  return (
    <CartContext.Provider value={{ ...cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

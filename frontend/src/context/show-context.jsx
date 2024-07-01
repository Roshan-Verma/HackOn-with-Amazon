import { createContext, useState } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart);
  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId] : prev[itemId] + 1}))
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId] : prev[itemId] - 1}))
  };
  const clear = () =>{
    setCartItems(getDefaultCart);
  }

  const contextValue = {cartItems, addToCart, removeFromCart, setCartItems }
//   console.log(cartItems);

  return (<ShopContext.Provider value = {contextValue}>{props.children}</ShopContext.Provider>);
};
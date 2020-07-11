import React, { useState, useEffect, createContext } from 'react';
import { addItemToCart, removeItemFromCart, getCartTotal, getCartItemsCount, clearItemFromCart } from './cart.utils';

export const CartContext = createContext({
  hidden: true,
  toggleCartHidden: () => {},
  cartItems: [],
  addItem: () =>  {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0,
});

const CartProvider = ({ children }) => {
  //Definindo estados
    const [hidden, setHidden] = useState(true);  
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    //Definindo funções
    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const clearItem = item => setCartItems(clearItemFromCart(cartItems, item));
    const toggleHidden = () => setHidden(!hidden);

    //Definindo Component DidMount
  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setCartTotal(getCartTotal(cartItems));
  },[cartItems]);


  return <CartContext.Provider value={{hidden, cartItems, cartTotal, cartItemsCount, addItem, removeItem, clearItem, toggleHidden}}>{children}</CartContext.Provider>;
}
export default CartProvider;
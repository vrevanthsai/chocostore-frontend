//modified code
import { useState, useContext, createContext, useEffect } from "react";
//cookies and encryption
import Cookies from "js-cookie";
// import CryptoJS from "crypto-js";
import { decryptToken } from "../components/filters/encryption";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // storing in LS with cart-user.name
  const cartFunction = () => {
    // user/admin- is loginned then we get auth from LS
    // let data = localStorage.getItem("auth");

    const encryptedUser = Cookies.get("userData");
    const userData = encryptedUser ? decryptToken(encryptedUser) : null;
    // console.log(userData)

    if (userData) {
      const parseData = JSON.parse(userData);
      let existingCartItem = localStorage.getItem(
        // `cart-${parseData?.user?.name}`
        `cart-${parseData?.name}`
      );
      // console.log(existingCartItem)
      // cart-user.name is there then show it
      if (existingCartItem) {
        setCart(JSON.parse(existingCartItem));
      } else {
        // show guest-cart in new cart-user.name
        let guestCart = localStorage.getItem("cart-undefined");
        if (guestCart) {
          setCart(JSON.parse(guestCart));
          localStorage.setItem(
            `cart-${parseData?.user?.name}`,
            JSON.stringify(JSON.parse(guestCart))
          );
        }
      }
    } else {
      //guest- not loggined then cart(for guest) in LS is cart-undefined
      let guestCart = localStorage.getItem("cart-undefined");
      if (guestCart) setCart(JSON.parse(guestCart));
    }
  };

  useEffect(() => {
    cartFunction();
    // eslint-disable-next-line
  }, []);


  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

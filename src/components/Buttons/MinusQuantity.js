//new code
import React, { useEffect } from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";

const MinusQuantity = ({ product, children = "-(reduce)" }) => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  const handleProductReduce = () => {
    //existing then decrease the quantity by 1
    const updatedCart = cart.map((p) => {
      if (p._id === product._id) {
        return {
          ...p,
          cartQuantity: p.cartQuantity - 1,
        };
      }
      //not equal returns p(cart-product) without any change
      return p;
    });
    // update cart
    setCart(updatedCart);
    localStorage.setItem(
      `cart-${auth?.user?.name}`,
      JSON.stringify(updatedCart)
    );
  };

  const zeroQuantity = () => {
    try {
      let myCart = [...cart];
      // Remove item by Array.filter() method
      myCart = myCart.filter((p) => p._id !== product._id);
      // remove product/item from cart when its cartQuanttiy reaches 0
      setCart(myCart);
      localStorage.setItem(`cart-${auth?.user?.name}`, JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (product.cartQuantity === 0) {
      zeroQuantity();
    } else {
      return; //terminate
    }
    // eslint-disable-next-line
  }, [product?.cartQuantity]);

  return (
    <button
      className="btn btn-secondary ms-1"
      onClick={handleProductReduce}
      disabled={product?.cartQuantity === 0 ? true : false}
    >
      {children}
    </button>
  );
};

export default MinusQuantity;

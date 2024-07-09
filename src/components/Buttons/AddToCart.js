//new code
import React from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
import { toast} from "react-toastify";

const AddToCart = ({ product, children = "ADD TO CART",value=1 }) => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  // console.log(value)

  // // Get product cart quantity from cart context state
  const existingProduct = cart.find((p) => p._id === product._id);
  const productCartQuantity = existingProduct
    ? existingProduct.cartQuantity
    : 0;

  //handleProductAdd(increase cart-quantity by 1)
  const handleProductAdd = () => {
    // e.stopPropagation()
    // shows toast-msg when it reaches maximum product quantity
    if(productCartQuantity + value >= product.quantity){
      toast.error(`${product.name} has reached the maximum quantity.`,{
        position:"top-center",
        theme:"dark"
      });
      value = product.quantity - productCartQuantity
    }

    //check if item/product exist in cart
    if (existingProduct) {
      //existing then increase the quantity
      const updatedCart = cart.map((p) => {
        if (p._id === product._id) {
          //returns object with increased cart-quantity by 1
          return {
            ...p,
            cartQuantity: parseInt(p.cartQuantity,10) + (value>0 ? parseInt(value,10): 1),
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
      // cart-quantity reaches maximum product-quantity
    } else {
      // product is new to the cart
      // add new field with cartquantity in new product-data(object)
      // quantity->product-quantity(in DB) & cartQuantity->count of a product added in cart
      setCart([
        ...cart,
        {
          ...product,
          cartQuantity: value>0 ? parseInt(value,10): 1,
        },
      ]);
      localStorage.setItem(
        `cart-${auth?.user?.name}`,
        JSON.stringify([
          ...cart,
          {
            ...product,
            cartQuantity: value>0 ? parseInt(value,10): 1,
          },
        ])
      );
    }
    children !== "+(add)" &&
      toast.success(`${product.name} Item Added to Cart`,{
        position:"top-center",
        theme:"dark"
      });
  };

  return (
    <button
      className="btn btn-secondary ms-1"
      onClick={handleProductAdd}
      disabled={productCartQuantity >= product.quantity || product?.shipping === "No"}
    >
      {children}
    </button>
  );
};

export default AddToCart;

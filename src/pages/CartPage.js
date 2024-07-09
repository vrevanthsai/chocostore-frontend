// modified code in remove cart & cart in payment funtion
import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import AddToCart from "../components/Buttons/AddToCart";
import MinusQuantity from "../components/Buttons/MinusQuantity";

const CartPage = () => {
  // auth-context is used for checking user loginned or not for user-info and checkout(payment)
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // remove cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      // Remove item by Array.splice() method
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      // store cart-data in localstorage after removing a item
      localStorage.setItem(`cart-${auth?.user?.name}`, JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // cart-products total count
  const cartCount = () => {
    return cart.reduce((total, p) => total + p.cartQuantity, 0);
  };

  // Grand Total Price(with cartQuantity)
  const totalPrice = () => {
    try {
      const total = cart.reduce(
        (total, p) => total + p.price * p.cartQuantity,
        0
      );
      const formattedCurrency = total.toLocaleString("en-IN", {
        // currency as india(rupees,ex-200.00)
        style: "currency",
        currency: "INR",
      });
      // to remove last 2 zeros , example 200.00
      // Remove trailing zeros
      const trimmedCurrency = formattedCurrency.replace(/\.00$/, "");
      return trimmedCurrency;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token ? auth?.user?.name : "Guest"}`}
            </h1>
            <h4 className="text-center">
              {cart.length > 0
                ? `You have ${cartCount()} ${
                    cart.length === 1 ? "item" : "items"
                  } in your cart ${
                    auth?.token ? "" : ",Please Login to Checkout"
                  } `
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((p) => {
              return (
                <div className="row mb-2 p-2 card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} //direct API call
                      className="card-img-top"
                      alt={p.name}
                      width="100px"
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p?.description.substring(0, 30)}...</p>
                    <p>Price : {p.price}</p>
                    {/* Minus(-) button */}
                    <MinusQuantity product={p}>-(reduce)</MinusQuantity>
                    {/* Cart-Product-Quantity */}
                    <button type="button" className="btn btn-primary">
                      Quantity{" "}
                      <span className="badge text-bg-secondary">
                        {p.cartQuantity}
                      </span>
                    </button>
                    {/* Plus(+) button */}
                    <AddToCart product={p}>+(add)</AddToCart>
                    {/* Clear/Remove(x) button */}
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                    <h4 className="mt-2">
                      Total: {p.price * p.cartQuantity} Rs
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-5 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Grand Total : {totalPrice()} Rs</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4 className="text-decoration-underline">Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login TO Checkout
                  </button>
                )}
              </div>
            )}
            {!auth?.token ? (
              ""
            ) : (
              <button className="btn btn-primary mb-2" onClick={() => navigate('/checkout')}>Go to Checkout</button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
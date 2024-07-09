import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DropIn from "braintree-web-drop-in-react";
import { useCart } from "../context/cart";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  // payment(braintree) states
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get Payment-gateway-Token
  const getToken = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // initial token call
  useEffect(() => {
    if (auth?.token) {
      getToken();
    } else {
      return;
    }
    // eslint-disable-next-line
  }, [auth?.token]);

  // payment function
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      // see payment-API-data{ok:true}
      console.log(data);

      // after payment successfull,remove cart-porducts of cart-user.name & guest-cart in LS & cart context
      // localStorage.removeItem("cart");
      localStorage.removeItem(`cart-${auth?.user?.name}`);
      localStorage.removeItem("cart-undefined");
      setCart([]);

      // after payment, navigate to Orders-page in User-dashboard
      navigate("/dashboard/user/orders");
      // setTimeout used to make toast msg visible after navigation

      toast.success("Payment Completed Successfully", {
        position: "top-center",
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      if (error.message === "No payment method is available.") {
        toast.error(
          "Choose a Payment Method to make Payment And Fill the Details"
        );
        console.log(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mt-2 mb-2">
        <h1 className="text-center mt-2 mb-2">Checkout Page</h1>
        {auth?.token ? (
            <>
            {cart?.length > 0 ? (
            <div>
            {!clientToken || !cart?.length || !auth?.token ? (
              <h1 className="text-center">loading...Please wait</h1>
            ) : (
              <div className="container mt-2" style={{ width: "600px" }}>
                <h3 className="text-center mt-3 text-decoration-underline">
                  Choose a Payment Method.
                </h3>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <div className="text-center mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing" : "Make Payment"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (<h3 className="text-center mt-2">Cart is empty,Add Products to Cart and Try Again..</h3>)}
            </>
        ) : (
            <div className="text-center mt-3">
                <button className="btn btn-danger" onClick={() => navigate('/login')}>Login to Checkout and Come back</button>
            </div>
        )}     
      </div>
    </Layout>
  );
};

export default Checkout;

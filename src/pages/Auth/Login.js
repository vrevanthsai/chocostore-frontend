import React, { useState } from "react";

import Layout from "../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
// global state
import { useAuth } from "../../context/auth";
// css
import "../../styles/AuthStyles.css";
//cookies and encryption
import Cookies from "js-cookie";
// import CryptoJS from "crypto-js";

// Eye icon setup
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../context/cart";
import { encryptToken } from "../../components/filters/encryption";
// const eye = <FontAwesomeIcon icon={faEye} />;

const emailRules = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|email)\.com$/;

// Schema-Validation(yup)
const validationSchema = yup
  .object({
    email: yup
      .string()
      .required("Email required")
      .email("Invalid email format")
      .matches(emailRules, { message: " Not valid :{" })
      .required("Email Required !"),
    password: yup.string().required("Password Required"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // toggling variable(state)
  const [passwordShown1, setPasswordShown1] = useState(false);
  const eye = <FontAwesomeIcon icon={passwordShown1 ? faEyeSlash : faEye} />;
  // context(auth) variables
  const [auth, setAuth] = useAuth();
  // cart-context
  // eslint-disable-next-line
  const [cart, setCart] = useCart();

  // navigation
  const navigate = useNavigate();
  // location-to redirect to /dashboard after login
  const location = useLocation();

  // Login form function
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`, //axios using env
        data
      );
      if (res && res.data.success) {
        // update data to auth-state
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        // storing in localStorage
        // localStorage.setItem("auth", JSON.stringify(res.data));

        //storing in cookies with encryption
        const encryptedToken = encryptToken(res.data.token);
        Cookies.set("authToken", encryptedToken, {
          expires: 7,
          sameSite: "Lax",
        }); // secure:true,httpOnly:true
        const encryptedUser = encryptToken(JSON.stringify(res.data.user));
        Cookies.set("userData", encryptedUser, { expires: 7, sameSite: "Lax" });

        // store data in cart-context state when loginned
        let data = localStorage.getItem(`cart-${res?.data?.user?.name}`);
        if (data) {
          const parseData = JSON.parse(data);
          setCart(parseData);
          // console.log(cart)
        } else {
          let guestCart = localStorage.getItem("cart-undefined");
          if (guestCart) {
            setCart(JSON.parse(guestCart));
            localStorage.setItem(
              `cart-${res?.data?.user?.name}`,
              JSON.stringify(JSON.parse(guestCart))
            );
          }
        }

        // navigation
        navigate(location.state || "/");

        toast.success(res.data.message, {
          position: "top-center",
          theme: "dark",
        });

        reset();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Login");
    }
  };

  return (
    <Layout title={"Login - ChocoStore"}>
      <div className="register login">
        <div className="container">
          <div className="register-form">
            <h1>Login page</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
              <div className="mb-2">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="form-control"
                  id="email"
                  placeholder="Enter Your Email"
                  // required
                  autoFocus
                />
                {errors.email && (
                  <span className="errors">{errors.email.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="pass-wrapper">
                  <input
                    type={passwordShown1 ? "text" : "password"}
                    {...register("password")}
                    className="form-control"
                    id="password"
                    placeholder="Enter Your Password"
                    // required
                  />
                  <i onClick={() => setPasswordShown1(!passwordShown1)}>
                    {eye}
                  </i>
                </div>
                {errors.password && (
                  <span className="errors">{errors.password.message}</span>
                )}
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-forgot"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password
                </button>
              </div>
              <div className="mb-1">
                <button type="submit" className="btn btn-register">
                  Login
                </button>
              </div>
            </form>
            <h5 className="text-center">
              Not Registered,Then{" "}
              <Link
                to="/register"
                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Register Now
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

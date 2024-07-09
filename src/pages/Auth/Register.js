import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import RegisterRules from "./RegisterRules";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
// react hook forms
import { useForm } from "react-hook-form";
// yup -schema validation
import * as yup from "yup";
// yup - resolver
import { yupResolver } from "@hookform/resolvers/yup";
// yup-password setup
import YupPassword from "yup-password";
// css
import "../../styles/AuthStyles.css";
// Eye icon setup
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// const eye = <FontAwesomeIcon icon={faEye} />;
// yup-password setup
// eslint-disable-next-line
YupPassword(yup); // extend yup

// RegEx for validations -email ,phone number
const phoneNumberRules = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
const emailRules = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|email)\.com$/;

// Schema-Validation(yup)
const validationSchema = yup
  .object({
    name: yup
      .string()
      .required("Name required")
      .trim("white-spaces not required")
      .max(20, "less than 20")
      .min(3, "more than 2 letters"),
    email: yup
      .string()
      .required("Email required")
      .email("Invalid email format")
      .matches(emailRules, { message: " Not valid :{" })
      .required("Email Required !"),
    password: yup
      .string()
      .required("Password Required")
      .minUppercase(1, "atleast 1 upper-case letter")
      .minNumbers(1, "atleast 1 digit")
      .minSymbols(1, "atleast 1 special character")
      .min(6, "more than 5"),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phone: yup
      .string()
      .required("Phone Number Required !")
      .matches(phoneNumberRules, {
        message: "Invalid Phone Number!- See the Rules below",
      }),
    address: yup.string().required("Address is required").max(200, "too long"),
    answer: yup.string().required("Answer must be given").max(20, "too long"),
  })
  .required();

const Register = () => {
  // useForm hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      answer: "",
    },
  });

  // toggling variable(state)
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const eye1 = <FontAwesomeIcon icon={passwordShown1 ? faEyeSlash : faEye} />;
  const eye2 = <FontAwesomeIcon icon={passwordShown2 ? faEyeSlash : faEye} />;

  // navigation
  const navigate = useNavigate();

  // Register form function
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        data
      );
      if (res && res.data.success) {
        navigate("/login");
        // setTimeout used to make toast msg visible after navigation
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
      toast.error("Something went wrong in register");
    }
  };

  return (
    <Layout title={"Register - ChocoStore"}>
      <div className="register">
        <div className="container">
          <div className="register-form">
            <h1>Register page</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
              <div className="mb-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                  // required
                  autoFocus
                />
                {errors.name && (
                  <span className="errors">{errors.name.message}</span>
                )}
              </div>
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
                />
                {errors.email && (
                  <span className="errors">{errors.email.message}</span>
                )}
              </div>
              <div className="mb-2">
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
                    {eye1}
                  </i>
                </div>
                {errors.password && (
                  <span className="errors">{errors.password.message}</span>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm Password
                </label>
                <div className="pass-wrapper">
                  <input
                    type={passwordShown2 ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="form-control"
                    id="confirm-password"
                    placeholder="Confirm your password"
                    // required
                  />
                  <i onClick={() => setPasswordShown2(!passwordShown2)}>
                    {eye2}
                  </i>
                </div>
                {errors.confirmPassword && (
                  <span className="errors">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  className="form-control"
                  id="phone"
                  placeholder="Enter Your Phone number"
                  // required
                />
                {errors.phone && (
                  <span className="errors">{errors.phone.message}</span>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  {...register("address")}
                  className="form-control"
                  id="address"
                  rows="2"
                  placeholder="Enter Your Address"
                  // required
                />
                {errors.address && (
                  <span className="errors">{errors.address.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="answer" className="form-label">
                  What is Your favorite food name
                </label>
                <input
                  type="text"
                  {...register("answer")}
                  className="form-control"
                  id="answer"
                  placeholder="Enter Your Answer"
                  // required
                />
                {errors.answer && (
                  <span className="errors">{errors.answer.message}</span>
                )}
              </div>
              <div className="mb-1">
                <button type="submit" className="btn btn-register">
                  Register
                </button>
              </div>
            </form>
            <h5 className="text-center">
              Already Registered,Then{" "}
              <Link
                to="/login"
                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Login
              </Link>
            </h5>
          </div>
        </div>
        <RegisterRules />
      </div>
    </Layout>
  );
};

export default Register;

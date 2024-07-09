import React, { useState } from "react";

import Layout from "../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
// yup-password setup
import YupPassword from "yup-password";
// css
import "../../styles/AuthStyles.css";

// Eye icon setup
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// const eye = <FontAwesomeIcon icon={faEye} />;

const emailRules = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|email)\.com$/;
// yup-password setup
YupPassword(yup); // extend yup

// Schema-Validation(yup)
const validationSchema = yup
  .object({
    email: yup
      .string()
      .required("Email required")
      .email("Invalid email format")
      .matches(emailRules, { message: " Not valid :{" })
      .required("Email Required !"),
    newPassword: yup
      .string()
      .required("Password Required")
      .minUppercase(1, "atleast 1 upper-case letter")
      .minNumbers(1, "atleast 1 digit")
      .minSymbols(1, "atleast 1 special character")
      .min(6, "more than 5"),
    answer: yup.string().required("Answer must be given").max(20, "too long"),
  })
  .required();
// dsfadsf
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      answer: "",
    },
  });

  // toggling variable(state)
  const [passwordShown1, setPasswordShown1] = useState(false);
  const eye = <FontAwesomeIcon icon={passwordShown1 ? faEyeSlash : faEye} />;

  // navigation
  const navigate = useNavigate();

  // Forgot-password form function
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        data
      );
      if (res && res.data.success) {
        // navigation
        navigate("/login");

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
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password "}>
      <div className="register login">
        <div className="container">
          <div className="register-form">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  New Password
                </label>
                <div className="pass-wrapper">
                  <input
                    type={passwordShown1 ? "text" : "password"}
                    {...register("newPassword")}
                    className="form-control"
                    id="password"
                    placeholder="Enter Your New Password"
                    // required
                  />
                  <i onClick={() => setPasswordShown1(!passwordShown1)}>
                    {eye}
                  </i>
                </div>
                {errors.newPassword && (
                  <span className="errors">{errors.newPassword.message}</span>
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
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;

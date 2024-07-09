import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
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
import axios from "axios";
// import toast from "react-hot-toast";
import { toast} from "react-toastify";
// const eye = <FontAwesomeIcon icon={faEye} />;
// yup-password setup
// eslint-disable-next-line
YupPassword(yup); // extend yup

// Schema-Validation(yup)
const validationSchema = yup
  .object({
    password: yup
      .string()
      .required("Password Required")
      .minUppercase(1, "atleast 1 upper-case letter")
      .minNumbers(1, "atleast 1 digit")
      .minSymbols(1, "atleast 1 special character")
      .min(6, "more than 5"),
    confirmPassword: yup
      .string()
      .required("Confirm Password Required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const ChangePassword = () => {
  // useForm hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // toggling variable(state)
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const eye1 = <FontAwesomeIcon icon={passwordShown1 ? faEyeSlash : faEye} />;
  const eye2 = <FontAwesomeIcon icon={passwordShown2 ? faEyeSlash : faEye} />;

  // Register form function
  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/change-password`,
        data
      );
      if (res && res.data.success) {
        toast.success(res.data.message,{
          position:"top-center",
          theme:"dark"
        });
        reset();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in change password");
    }
  };

  return (
    <Layout title={"Change Password"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register">
              <div className="container">
                <div className="register-form">
                  <h1>ChangePassword</h1>
                  {/* Change password form */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                      <label htmlFor="password" className="form-label">
                        Enter New Password
                      </label>
                      <div className="pass-wrapper">
                        <input
                          type={passwordShown1 ? "text" : "password"}
                          {...register("password")}
                          className="form-control"
                          id="password"
                          placeholder="New Password"
                          // required
                        />
                        <i onClick={() => setPasswordShown1(!passwordShown1)}>
                          {eye1}
                        </i>
                      </div>
                      {errors.password && (
                        <span className="errors">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirm-password" className="form-label">
                        Confirm Password
                      </label>
                      <div className="pass-wrapper">
                        <input
                          type={passwordShown2 ? "text" : "password"}
                          {...register("confirmPassword")}
                          className="form-control"
                          id="confirm-password"
                          placeholder="Confirm New password"
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
                    <div className="mb-1">
                      <button type="submit" className="btn btn-register">
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;

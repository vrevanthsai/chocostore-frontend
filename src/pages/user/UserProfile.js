// modified code
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";

// import toast from "react-hot-toast";
import { toast} from "react-toastify";
// react hook forms
import { useForm } from "react-hook-form";
// yup -schema validation
import * as yup from "yup";
// yup - resolver
import { yupResolver } from "@hookform/resolvers/yup";
// css
import "../../styles/AuthStyles.css";
// Auth context
import { useAuth } from "../../context/auth";
//cookies and encryption
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

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
    phone: yup
      .string()
      .required("Phone Number Required !")
      .matches(phoneNumberRules, {
        message: "Invalid Phone Number!",
      }),
    address: yup.string().required("Address is required").max(200, "too long"),
  })
  .required();

const UserProfile = () => {
  // auth context for user-info
  const [auth, setAuth] = useAuth();
  // store all initial values from auth in state-Object
  const [initialFormValues, setInitialFormValues] = useState({});

  // useForm hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialFormValues,
  });

  // initial call values to update states
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    // directly store initial values as key/value in state -object
    // {name:name} if key/value as same-names
    setInitialFormValues({ name ,email, phone, address}); 

    // Reset form with default values
    reset({
      name,
      email,
      phone,
      address,
    });

    //eslint-disable-next-line
  }, [auth?.user, reset]);

  // encrypting updateduser data for secure storage in cookies
  const encryptToken = (data) => {
    try {
      return CryptoJS.AES.encrypt(data, process.env.REACT_APP_SECRET_KEY).toString();
    } catch (error) {
      console.error("Encryption error:", error);
      return null;
    }
  };

  // Update form function
  const onSubmit = async (data) => {
    // check if input-values are changed or not for update-form-submission
    if(JSON.stringify(initialFormValues) === JSON.stringify(data)){
      toast.error("No changes made. Profile not updated.");
      return;
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-register`,
        data
      );
      if (res && res.data?.success) {
        // update data to auth-state
        setAuth({
          ...auth,
          user: res.data?.updatedUser,
        });
        // storing updated data in localStorage
        // let ls = localStorage.getItem("auth");
        // ls = JSON.parse(ls);
        // ls.user = res.data.updatedUser;
        // localStorage.setItem("auth", JSON.stringify(ls));

        //storing updated userData in cookies
        const encryptedUser = encryptToken(JSON.stringify(res.data.updatedUser));
        Cookies.set("userData",encryptedUser , { expires: 7,sameSite: 'Lax' });

        toast.success("Profile Updated Successfully",{
          position:"top-center",
          theme:"dark"
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in update register");
    }
  };

  return (
    <Layout title={"Your Profile - ChocoStore"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {/* <h1>Profile</h1> */}
            {/* form */}
            <div className="register">
              <div className="container">
                <div className="register-form">
                  <h1>Profile</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                        // autoFocus
                      />
                      {errors.name && (
                        <span className="errors">{errors.name.message}</span>
                      )}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="form-control"
                        id="email"
                        placeholder="Enter Your Email"
                        disabled
                        // required
                      />
                      {errors.email && (
                        <span className="errors">{errors.email.message}</span>
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
                    <div className="mb-3">
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

                    <div className="mb-1">
                      <button type="submit" className="btn btn-register">
                        Update Profile
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

export default UserProfile;

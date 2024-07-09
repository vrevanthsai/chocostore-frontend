import React from "react";
import "../../styles/AuthStyles.css";

const RegisterRules = () => {
  return (
    <div className="registerRules">
      <div className="container">
        <h2>Registration Rules</h2>
        <div className="row">
          <div className="col-md-6">
            <h4>Name:</h4>
            <p>
              - Name is required. <br />
              - Should contain at least 3 characters. <br />- Should not exceed
              20 characters.
            </p>
          </div>
          <div className="col-md-6">
            <h4>Email:</h4>
            <p>
              - Email is required. <br />
              - Should be a valid email address. <br />- Only Gmail, Yahoo, and
              Email domains are allowed.
            </p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <h4>Password:</h4>
            <p>
              - Password is required. <br />
              - Should contain at least 6 characters. <br />- Should contain at
              least 1 uppercase letter, 1 digit, and 1 special character.
            </p>
          </div>
          <div className="col-md-6">
            <h4>Confirm Password:</h4>
            <p>- Should match the password field.</p>
            <h4>Favorite food:</h4>
            <p>- Should not exceed 20 characters.</p>
          </div>
          {/* <div className="col-md-3">
            <h4>Favorite food</h4>
            <p>- Should not exceed 20 characters.</p>
          </div> */}
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <h4>Phone Number:</h4>
            <p>
              - Phone number is required. <br />- Should be a valid Indian(+91)
              mobile number starting with 9, 8, 7, or 6 and can also add +91.
            </p>
          </div>
          <div className="col-md-6">
            <h4>Address:</h4>
            <p>
              - Address is required. <br />- Should not exceed 200 characters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRules;

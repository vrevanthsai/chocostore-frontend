import React from "react";
import Layout from "../components/Layout/Layout";
import { IoHome } from "react-icons/io5";
import { MdAddIcCall,MdAttachEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <Layout title={'Contact us'}>
      <div className="contact">
        <div className="jumbotron text-center">
          <div className="container">
            <h1 className="display-3">Contact Us</h1>
            <p className="lead">We'd love to hear from you!</p>
            <p className="lead">Any query or info about product, feel free to contact anytime, we are 24X7 available.</p>
          </div>
        </div>
        <div className="container">
          <div className="row contact-info">
            <div className="col-lg-4">
              <div className="info-item text-center">
                <p className="info-text address"><IoHome />Store address: 123 Main Street, City, Country</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="info-item text-center">
                <p className="info-text"><MdAddIcCall />: +1234567890</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="info-item text-center">
                <p className="info-text">
                  <Link to="mailto:info@example.com"><MdAttachEmail />: info@example.com</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

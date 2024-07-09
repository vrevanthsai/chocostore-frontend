import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PagenotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout title={'page not found'}>
      <div className="container1">
        <h1 className="pnf2">404 - Page Not Found</h1>
        <p className="pnf1">
          Oops! The page you are looking for might have been removed or is
          temporarily unavailable.
        </p>
        <p className="pnf1">
          You can {" "}
          <Link to="/" className="link1">
            go back to the homepage
          </Link>{" "}
          or{" "}
          <Link onClick={() => navigate(-1)} className="link1">
            go back to the previous page
          </Link>
          .
        </p>
      </div>
    </Layout>
  );
};

export default PagenotFound;

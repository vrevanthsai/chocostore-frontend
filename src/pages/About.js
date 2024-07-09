import React from "react";
import Layout from "../components/Layout/Layout";
import {Link} from "react-router-dom";
// import { useAuth } from "../context/auth";

const About = () => {
  // const [auth] = useAuth()
  // console.log(auth)

  return (
    <Layout title={'About us '}>
      {/* <h1>About page</h1> */}
      <>
        <div className="about">
          <div className="jumbotron text-center">
            <div className="container">
              <h1 className="display-3">About Us</h1>
              <p className="lead">
                We're dedicated to making your life better and sweet.
              </p>
            </div>
          </div>
          <div className="container">
            <div className="row about-section">
              <div className="col-lg-6 col-md-6 col-sm-12 about-img">
                <div className="image-section">
                  <img src="/images/about-page.jpg" alt="Aboutpage-img" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="about-content">
                  <h2>About Our Store</h2>
                  <p>
                    Generations of experience, well-preserved recipes and
                    techniques, and quality ingredients were skilfully blended
                    into Fantasie’s celebrated selection of craft chocolates.
                    ChocoShop has added a variety of indulgent and delectable
                    treats to create a unique flavour profile.
                  </p>
                  <p>
                    Our team of experts is committed to delivering award-winning
                    service and ensuring that our customers' needs are met with
                    the highest level of professionalism and efficiency.
                  </p>
                  <div className="explore">
                    <Link to="/" className="btn btn-primary ">Explore</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default About;

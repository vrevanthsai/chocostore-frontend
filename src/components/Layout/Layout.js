import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
// notifications - react-hot-toast
import { Toaster } from "react-hot-toast";
// import { useSearch } from "../../context/search";

// React encourages the use of JavaScript default parameters for function components.
const Layout = ({
  children,
  title = "ChocoStore - Shop now",
  description = "chocolate website or mern stack project",
  keywords = "chocolate,chocolates,product,mern,react,node,mongodb",
  author = "Revanth Sai Velicheti",
}) => {

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "72vh" }}>
        <Toaster />

        {children}
      </main>
      <Footer />
    </div>
  );
};

// Layout.defaultProps = {
//   title: "ChocoStore - Shop now",
//   description: "chocolate website or mern stack project",
//   keywords: "chocolate,chocolates,product,mern,react,node,mongodb",
//   author: "Revanth Sai Velicheti"
// }

export default Layout;

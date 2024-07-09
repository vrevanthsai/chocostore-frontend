import React from "react";
import MoreDetails from "./MoreDetails";
import AddToCart from "./AddToCart";
import "../../App.css";
import { Link } from "react-router-dom";

const CardProduct = ({ product }) => {
  // product -> single-product-data from (array)products.map()
  return (
    <div className="card m-2" style={{ width: "18rem" }} key={product._id}>
      <Link to={`/product/${product.slug}`} className="product-link">
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} //direct API call
          className="card-img-top card-img"
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description.substring(0, 30)}...</p>
          <p className="card-text">
            <strong>Price:</strong> {product.price} Rs
          </p>
          {/* <MoreDetails slug={product.slug} />
          <AddToCart product={product} /> */}
        </div>
      </Link>
      <div className="card-buttons">
        <MoreDetails slug={product.slug} />
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default CardProduct;

//modified code in add to cart button, more details , Card-product
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CardProduct from "../components/Buttons/CardProduct";
import AddToCart from "../components/Buttons/AddToCart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({}); // single product data
  const [loading, setLoading] = useState(true);
  // similar products states
  const [relatedProducts, setRelatedProducts] = useState([]); // 3(multiple) products data
  const [simLoading, setSimLoading] = useState(false); // changesd true to false
  const navigate = useNavigate();
  const [addCart, setAddCart] = useState(1);

  // initial single product details
  useEffect(() => {
    if (params?.slug){
      getProduct();
      setAddCart(1);
    } 
    // eslint-disable-next-line
  }, [params?.slug]);

  // get Product full details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      if (data?.success) {
        setLoading(false);
        setProduct(data?.product); // single object(product) data
        getSimilarProducts(data?.product._id, data?.product.category._id); //function call & passing pid,cid
      } else {
        setLoading(false);
        navigate("/page-not-found");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get similar/related products
  const getSimilarProducts = async (pid, cid) => {
    try {
      setSimLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setSimLoading(false);
      if (data?.success) {
        // setSimLoading(false);
        setRelatedProducts(data?.products);
      }
    } catch (error) {
      setSimLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    // let value = e.target.value?parseInt(e.target.value, 10):1;
    let value = parseInt(e.target.value, 10)

    if (value > product?.quantity) {
      value = product?.quantity;
      toast.error(`Quantity can't be greater then ${product?.quantity} per Order`,{
        autoClose:3000
      })
    } else if (value < 1) {
      value = 1;
      toast.error(`Quantity can't be less then 1`)
    }

    setAddCart(value);
  };

  const handleAddButton = () =>{
    // console.log(addCart)
    setAddCart((i) => i + 1)
  }
  const handleMinusButton = () => {
    setAddCart((i) => i - 1)
  }

  return (
    <Layout>
      {loading ? (
        <h3 className="loading text-center">loading...</h3>
      ) : (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`} //direct API call
                className="card-img-top"
                alt={product?.name}
                height="300"
                width={"250px"}
              />
            </div>
            <div className="col-md-6">
              <h1 className="text-center">Product Details</h1>
              <h6>Name: {product?.name}</h6>
              <h6>Description: {product?.description}</h6>
              <h6>Price: {product?.price} Rs</h6>
              <h6>Category: {product?.category?.name}</h6>
              {/* <h6>Shipping: {product?.shipping}</h6> */}
              {product?.shipping==="No" && <h6>Product: <button className="btn btn-warning" disabled={true}>Out Of Stock</button></h6>}
              {/* {product?.shipping==="No" && <h6>Max-Quantity: {product?.quantity}</h6>} */}
              Quantity:{" "}
              <button className="btn btn-secondary" onClick={handleMinusButton} disabled={addCart === 1}>-</button>
              <input
                // type="text" inputMode="numeric"
                type="number"
                value={addCart || ""}
                // onChange={(e) => setAddCart(e.target.value)}
                onChange={handleChange}
                placeholder=""
                min="1" max={product?.quantity}
              />
              <button className="btn btn-secondary" onClick={handleAddButton} disabled={addCart>=product?.quantity}>+</button>
              <AddToCart product={product} value={addCart} />
            </div>
          </div>
          <hr />
          <div className="row">
            <h2>Similar Products</h2>
            {simLoading ? (
              <h4 className="loading text-center">loading...</h4>
            ) : (
              <div className="similar-products mt-2">
                {relatedProducts.length < 1 ? (
                  <h4 className="text-center">No Similar Products</h4>
                ) : (
                  <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => {
                      return <CardProduct product={p} key={p._id} />;
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;

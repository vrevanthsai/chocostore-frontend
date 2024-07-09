//modified code in add to cart button, more details , Card-product
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import CardProduct from "../components/Buttons/CardProduct";
import Pagination from "../components/Buttons/Pagination";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import CategoryFilter from "../components/filters/CategoryFilter";
import PriceFilter from "../components/filters/PriceFilter";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // filter states
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  // allproducts pagination states
  const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(parseInt(params.page) || 1);
  // filter-products pagination states
  const [ftotal, setFtotal] = useState(0);
  const [fpage, setFpage] = useState(1);
  const [floading, setFloading] = useState(false);
  // const [cart, setCart] = useCart();
  // to avoid Warning: findDOMNode is deprecated
  // const checkboxRef = useRef()

  // Pagination perPage limit both to FE and BE
  const perPage = 3;

  //get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products/${perPage}/${page}`
      );
      if (data?.success) {
        setLoading(false);
        setProducts(data?.products);
        setTotal(data?.totalProducts);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.message === "Network Error") {
        toast.error("Network Error, Please check you Network");
      }
    }
  };

  // lifecycle method
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length, page]);

  // get filter-API(filtered products) with pagination
  const initialFilerProducts = async () => {
    try {
      // console.log("ifp-fpage:", fpage);
      setFloading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters/${fpage}`,
        { checked, radio }
      );
      if (data?.success) {
        setProducts(data?.products);
        setFloading(false);
        //set filter total
        setFtotal(data?.filterTotal);
      }
    } catch (error) {
      setFloading(false);
      console.log(error);
      console.log("something went wrong in initial filter product");
      if (error.message === "Network Error") {
        toast.error("Network Error, Please check you Network");
      }
    }
  };
  //rerendering for FilterProducts
  useEffect(() => {
    if (checked.length || radio.length) initialFilerProducts();
    // eslint-disable-next-line
  }, [checked, radio]);

  // loadmore filter products
  const loadmoreFilerProducts = async () => {
    try {
      // console.log("lfp-fpage:", fpage);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters/${fpage}`,
        { checked, radio }
      );
      if (data?.success) {
        setLoading(false);
        setProducts([...products, ...data?.products]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log("something went wrong in loadmore filter product");
      if (error.message === "Network Error") {
        toast.error("Network Error, Please check you Network");
      }
    }
  };
  //rerendering for FilterProducts
  useEffect(() => {
    if (fpage === 1) return;
    loadmoreFilerProducts();
    // eslint-disable-next-line
  }, [fpage]);

  // Reset filters
  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    // reseting page(pagination)
    // setPage(1);
    //reseting fpage
    setFpage(1);
    setFtotal(0);
  };

  // reload/persist pagination logic
  const handlePageChange = (selectedPage) => {
    // console.log(selectedPage)
    if (selectedPage !== page) {
      setPage(selectedPage);
      if (selectedPage === 1) {
        navigate(`/`);
      } else {
        navigate(`/home/page/${selectedPage}`);
      }
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-3 homepage">
        <div className="row">
          <div className="col-md-3">
            {/* Category filter */}
            <h4 className="text-center">Filter by Category</h4>
            <CategoryFilter
              setFpage={setFpage}
              setFtotal={setFtotal}
              setPage={setPage}
              checked={checked}
              setChecked={setChecked}
              navigate={navigate}
            />

            {/* Price filter */}
            <h4 className="text-center mt-4">Filter by Prices</h4>
            <PriceFilter
              radio={radio}
              setRadio={setRadio}
              setFpage={setFpage}
              setFtotal={setFtotal}
              setPage={setPage}
              navigate={navigate}
            />

            {/* Reset filter */}
            <div className="d-flex flex-column mt-4">
              <button className="btn btn-danger" onClick={resetFilters}>
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {/* {JSON.stringify(checked, null, 4)}
            {JSON.stringify(radio, null, 4)} */}
            <h1 className="text-center">All Products</h1>
            {floading ? (
              <h3 className="loading text-center">loading...</h3>
            ) : (
              <div className="allproducts">
                {loading ? (
                  <h3 className="loading text-center">loading...</h3>
                ) : products.length > 0 ? (
                  <div>
                    {/* product-card mapping */}
                    <div
                      className="d-flex flex-wrap"
                      style={{ justifyContent: "space-around" }}
                    >
                      {products?.map((p) => {
                        return <CardProduct product={p} key={p._id} />;
                      })}
                    </div>
                    {/* Pagination buttons(prev-1-2-3-next) for ALL-PRODUCTS */}
                    {products && ftotal === 0 && products.length < total && (
                      <Pagination
                        page={page}
                        setPage={handlePageChange}
                        total={total}
                        perPage={perPage}
                      />
                    )}

                    {/* LoadMore button(Pagination) for FILTER-PRODUCTS */}
                    {products && products.length < ftotal && (
                      <div className="m-2 p-3 text-center">
                        <button
                          className="btn btn-warning"
                          onClick={(e) => {
                            e.preventDefault();
                            setFpage(fpage + 1);
                          }}
                        >
                          {loading ? "Loading..." : "Loadmore"}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <h4 className="text-center m-10">No Products </h4>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

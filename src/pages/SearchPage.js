//modified code in add to cart button, more details , Card-product,added pagination
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import CardProduct from "../components/Buttons/CardProduct";
import Pagination from "../components/Buttons/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

const SearchPage = () => {
  const { values, setValues, setTotal, total, page, setPage } = useSearch();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  // pagination state
  //  const [page, setPage] = useState(parseInt(params.page) || 1);
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.keyword) {
      setPage(parseInt(params.page) || 1);
      searchProducts(parseInt(params?.page) || 1);
      // searchProducts(page)
    } else {
      return;
    }
    // eslint-disable-next-line
  }, [params.page, params.keyword]);

  const searchProducts = async (pageNumber) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${params.keyword}/${pageNumber}`
      );
      setValues({ ...values, results: data?.results });
      setLoading(false);
      setTotal(data?.totalProducts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.message === "Network Error") {
        toast.error("Network Error, Please check you Network");
      }
    }
  };

  // reload pagination logic
  const handlePageChange = (selectedPage) => {
    if (selectedPage !== page) {
      setPage(selectedPage);
      if (selectedPage === 1) {
        navigate(`/search/${params.keyword}`);
      } else {
        navigate(`/search/${params.keyword}/page/${selectedPage}`);
      }
    }
  };
  // if(loading){
  //   return(<h1 className="text-center">Loading...</h1>)
  // }

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          {/* <h6>{total < 1 ? "No Results Found" : `Results Found ${values?.results.length ? total : 0}`}</h6> */}
          {/* products mapping */}
          {loading ? (
            <h1 className="text-center">Loading...</h1>
          ) : (
            <>
              <h6>
                {total < 1
                  ? "No Results Found"
                  : `Results Found ${values?.results.length ? total : 0}`}
              </h6>
              <div
                className="d-flex flex-wrap mt-4"
                style={{ justifyContent: "space-around" }}
              >
                {values?.results.map((p) => {
                  return <CardProduct product={p} key={p._id} />;
                })}
              </div>
            </>
          )}
          <Pagination
            page={page}
            setPage={handlePageChange}
            total={total}
            perPage={3}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;

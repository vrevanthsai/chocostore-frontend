import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast} from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/Buttons/Pagination";
import "../../App.css"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  //pagination
  // const [page, setPage] = useState(1);
  const [total,setTotal] =useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const [page, setPage] = useState(parseInt(params.page) || 1);
  // Pagination perPage limit both to FE and BE
  const perPage = 6;

  //get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products/${perPage}/${page}`
      );
      if (data?.success) {
        setLoading(false);
        setProducts(data?.products);
        setTotal(data?.totalProducts)
      } else {
        setLoading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong in getting all products");
      if(error.message === "Network Error"){
        toast.error("Network Error, Please check you Network")
      }
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, [page]);

  // reload/persist pagination logic
  const handlePageChange = (selectedPage) => {
    // console.log(selectedPage)
    if (selectedPage !== page) {
      setPage(selectedPage);
      if (selectedPage === 1) {
        navigate(`/dashboard/admin/products`);
      } else {
        navigate(`/dashboard/admin/products/page/${selectedPage}`);
      }
    }
  };


  return (
    <Layout title={"All Products"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            {/* {loading && <p className="loading text-center">loading...</p>}  */}
            {products.length > 0 ? (
              <div>
                <div className="d-flex flex-wrap">
                  {products?.map((p) => {
                    return (
                      <Link
                        key={p._id}
                        to={`/dashboard/admin/product/${p.slug}`}
                        className="product-link"
                      >
                        <div className="card m-2" style={{ width: "18rem" }}>
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} //direct API call
                            className="card-img-top card-img"
                            alt={p.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">
                              {p.description.substring(0, 30)}...
                            </p>
                            <p className="card-text">
                              <strong>Price:</strong> {p.price} Rs
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <Pagination page={page} setPage={handlePageChange} total={total} perPage={perPage}/>
              </div>
            ) : // loading section
            loading ? (
              <p className="loading text-center">loading...</p>
            ) : (
              <h4 className="text-center m-10">No Products Added/Created</h4>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

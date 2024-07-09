//modified code in add to cart button, more details ,Card-product
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CardProduct from "../components/Buttons/CardProduct";
import Pagination from "../components/Buttons/Pagination"
// import toast from "react-hot-toast";
import { toast} from "react-toastify";
import { useSearch } from "../context/search";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  // pagination
  // const [page,setPage] = useState(parseInt(params.page) || 1);
  const [total,setTotal] = useState(0);
  const navigate = useNavigate();
  const {catPage,setCatPage} = useSearch();

  useEffect(() => {
    if(params?.slug){
      //Page-Persist logic
      setCatPage(parseInt(params.page) || 1);
      getProductsByCat(parseInt(params.page) || 1);
    }else{
      return;
    }
    // eslint-disable-next-line
  }, [params.page,params.slug]);

  // get products by category
  const getProductsByCat = async (pageNumber) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-categroy/${params.slug}/${pageNumber}`
      );
      if (data?.success) {
        setLoading(false);
        setTotal(data?.totalProducts);
        setProducts(data?.products);
        setCategory(data?.category);
      }else{
        setLoading(false);
        navigate('/page-not-found')
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if(error.message === "Network Error"){
        toast.error("Network Error, Please check you Network")
      }
    }
  };

  // reload pagination logic
  const handlePageChange = (selectedPage) => {
    // console.log(selectedPage)
    if (selectedPage !== catPage) {
      setCatPage(selectedPage);
      if(selectedPage === 1){
        navigate(`/category/${params.slug}`)
      }else{
        navigate(`/category/${params.slug}/page/${selectedPage}`);
      }
    }
  };

  return (
    <Layout>
      {loading ? (
        <h3 className="loading text-center mt-4">loading...</h3>
      ) : (
        <div className="container">
          <h1 className="text-center mt-4">Category - {category?.name}</h1>
          <h3 className="text-center mt-2">{products.length > 0 ?`${total} results found`:"No Results Found"}</h3>
          <div className="row">
            {products.length > 0 ? (
              <div className="allcatproducts">
                {/* product-cards(by maping/iterating) */}
                <div
                  className="d-flex flex-wrap"
                  style={{ justifyContent: "space-around" }}
                >
                  {products?.map((p) => {
                    return (                  
                      <CardProduct product={p} key={p._id}/>
                    );
                  })}
                </div>
                {/* buttons (Pagination) for Category-products */}
                <Pagination page={catPage} setPage={handlePageChange} total={total} perPage={2} />
                
              </div>
            ) : 
             (
              <h4 className="text-center m-10">No Products </h4>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CategoryProduct;

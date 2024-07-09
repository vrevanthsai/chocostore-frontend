import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const hookValues = useCategory();

  return (
    <Layout title={"All Categories"}>
      <h1 className="text-center mt-4">All Categories</h1>
      <div className="container">
        <div className="row">
          {/* {loading && <h3 className="loading text-center mt-4">loading...</h3>} */}
          {hookValues?.loading ? (
            <h3 className="loading text-center mt-4">loading...</h3>
          ) : (
            <>
              {hookValues?.categories?.length > 0 ? (
                hookValues?.categories?.map((c) => {
                  return (
                    <div className="col-md-6 mt-5 mb-3 gx-3 hy-3" key={c._id}>
                      <Link
                        to={`/category/${c.slug}`}
                        className="btn btn-primary"
                      >
                        {c.name}
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h3 className="loading text-center mt-4">
                  No Categories Created YET,..
                </h3>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;

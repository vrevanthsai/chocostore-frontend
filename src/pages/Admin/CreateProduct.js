import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// dropdown menu
import { Select } from "antd";
import useCategory from "../../hooks/useCategory";
const { Option } = Select;

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const hookValues = useCategory();

  // submit(create-product) form funtion
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // combining all input and select tags
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
        // { name, description, price, quantity, category, photo, shipping }
      );
      if (data?.success) {
        navigate("/dashboard/admin/products");
        toast.success(data?.message, {
          position: "top-center",
          theme: "dark",
        });
      } else {
        toast.error(data?.error, {
          duration: 8000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };
  // create product
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Products</h1>
            <form onSubmit={handleCreate} id="createpform">
              <div className="m-1 w-75">
                <Select
                  // bordered={false}
                  variant={false}
                  placeholder="Select Product category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {hookValues?.loading && (
                    <Option className="loading" value="">
                      loading...
                    </Option>
                  )}
                  {hookValues?.categories?.map((c) => {
                    return (
                      <Option key={c._id} value={c._id || ""}>
                        {c.name}
                      </Option>
                    );
                  })}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Product Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      id="cpimg"
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter Product Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    id="cpname"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    value={description}
                    className="form-control"
                    rows="2"
                    placeholder="Enter Product Description"
                    onChange={(e) => setDescription(e.target.value)}
                    id="cpdesc"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter Product Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    id="cpprice"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter Product Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                    id="cpquan"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Select
                    variant={false}
                    // placeholder="Select Product Shipping"
                    placeholder="Product Stock Status:"
                    size="large"
                    //showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="No">No,Product Out of Stock</Option>
                    <Option value="Yes">Yes,Stocks are Available</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  {/* <button  className="btn btn-primary" onClick={handleCreate} >  */}
                  <button type="submit" className="btn btn-primary">
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

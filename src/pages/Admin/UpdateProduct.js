// modified code in getSingleProduct() and Delete product
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
// dropdown menu
import { Select } from "antd";
import DeleteProduct from "../../components/Buttons/DeleteProduct";
import useCategory from "../../hooks/useCategory";
const { Option } = Select;

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState(""); // product ID for update and delete,get photo
  const params = useParams();
  // store all initial values from getSingleProduct function in state-Object
  const [initialFormValues, setInitialFormValues] = useState({});
  const navigate = useNavigate();
  const hookValues = useCategory();

  // get Single Product And Set Initial values to all States Except Photo value
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      if (data?.success) {
        // setting initial values for update-states
        setId(data?.product._id); // used for image preview/initial photo value
        setName(data?.product.name);
        setDescription(data?.product.description);
        setPrice(data?.product.price);
        setQuantity(data?.product.quantity);
        setShipping(data?.product.shipping);
        setCategory(data?.product.category._id); // store category ID only
        //set all in one initial values in state-object for verifing
        // setInitialFormValues({name,description,price,quantity,shipping,category,photo})
        setInitialFormValues({
          name: data?.product.name,
          description: data?.product.description,
          price: data?.product.price,
          quantity: data?.product.quantity,
          shipping: data?.product.shipping,
          category: data?.product.category._id,
          photo: "", // photo is not included in initial form values
        });
      } else {
        // setLoading(false);
        navigate("/page-not-found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting single product details");
    }
  };
  //   initial call
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // submit(update-product) form funtion
  const handleUpdate = async (e) => {
    e.preventDefault();
    // check if input-values are changed or not for update-form-submission
    const updatedData = {
      name,
      description,
      price,
      quantity,
      shipping,
      category,
      photo,
    };
    if (JSON.stringify(initialFormValues) === JSON.stringify(updatedData)) {
      toast.error("No changes made. Product not updated.");
      return;
    }

    try {
      // combining all input and select tags
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        // navigate("/dashboard/admin/products");
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
      toast.error("Something went wrong in updating product");
    }
  };

  // Update Product and Single Product display in Form formate
  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <form onSubmit={handleUpdate} id="updatepform">
              <div className="m-1 w-75">
                <label htmlFor="productCategory" className="form-label">
                  Product category:
                </label>
                <Select
                  // bordered={false}
                  variant={false}
                  placeholder="Select Product category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  id="productCategory"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
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
                      id="upimg"
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="upname" className="form-label">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter Product Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    id="upname"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="updesc" className="form-label">
                    Product Description:
                  </label>
                  <textarea
                    value={description}
                    className="form-control"
                    rows="2"
                    placeholder="Enter Product Description"
                    onChange={(e) => setDescription(e.target.value)}
                    id="updesc"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="upprice" className="form-label">
                    Product Price:
                  </label>
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter Product Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    id="upprice"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="upquan" className="form-label">
                    Product Quantity:
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter Product Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                    id="upquan"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="upship" className="form-label">
                    Product Stock Status:
                  </label>
                  <Select
                    variant={false}
                    // placeholder="Select Product Shipping"
                    placeholder="Product Stock Status:"
                    size="large"
                    //showSearch
                    className="form-select mb-3"
                    id="upship"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping}
                  >
                    <Option value="No">No,Product Out of Stock</Option>
                    <Option value="Yes">Yes,Stocks are Available</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Update Product
                  </button>
                </div>
                <DeleteProduct pid={id} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

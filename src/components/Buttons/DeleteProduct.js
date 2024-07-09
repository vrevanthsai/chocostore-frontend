import axios from "axios";
import React from "react";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const DeleteProduct = ({ pid }) => {
  const navigate = useNavigate();

  // DELETE A PRODUCT
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${pid}`
      );
      if (data?.success) {
        navigate("/dashboard/admin/products");

        toast.success(data?.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Deleting Product");
    }
    // navigate("/dashboard/admin/products");
  };

  return (
    <DeleteModal handleDelete={handleDelete} item={'Product'}/>
  );
};

export default DeleteProduct;

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import CategoryForm from "../../components/Form/CategoryForm";
// ant-design(reusable components)
import { Modal } from "antd";
// import DeleteCategory from "../../components/Buttons/DeleteCategory";
import DeleteModal from "../../components/Buttons/DeleteModal";
import { useAuth } from "../../context/auth";

const CreateCategory = () => {
  // get states
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  // create state
  const [name, setName] = useState("");
  // update-form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // delete modal states
  // const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteValue, setDeleteValue] = useState("");
  const [deleteAnswer, setDeleteAnswer] = useState("");
  // initial category name
  const [initialFormValue, setInitialFormValue] = useState("");
  const [auth] = useAuth();

  // handle category-Form-submit(creating-category)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Trim the Name to handle leading/trailing spaces(first/last)
    const trimmedName = name.trim();
    // Validation for Name not being only a single white space or multiple consecutive spaces between words
    if (trimmedName === "") {
      toast.error("Category input cannot be empty or just spaces.");
      return;
    }
    // Validation for two or more consecutive white spaces
    const consecutiveSpacesPattern = /\s{2,}/;
    if (consecutiveSpacesPattern.test(name)) {
      toast.error("Please remove extra spaces from your Category input.");
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name: name }
      );
      if (data?.success) {
        setLoading(false);
        toast.success(`${name} is created`, {
          position: "top-center",
          theme: "dark",
        });
        // reset name-state
        setName("");
        getAllcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in category input form");
    }
  };

  // displaying(read)get all categories
  const getAllcategory = async () => {
    try {
      setLoading(true);
      // const {data} = await axios.get('/api/v1/category/get-category') //axios using proxy in package.json
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      ); //axios using env
      if (res?.data.success) {
        setLoading(false);
        setCategories(res?.data.category);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  // re-rendering
  useEffect(() => {
    getAllcategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    // check if input-values are changed or not for update-form-submission
    if (initialFormValue === updatedName) {
      toast.error("No changes made. Category not updated.");
      return;
    }

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        // toast.success(data.message)
        // reset all update-states
        setSelected(null);
        setUpdatedName("");
        setIsModalOpen(false);
        // re-render all categories
        getAllcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category");
    }
  };

  //DELETE CATEGORY
  const handleDelete = async () => {
    // console.log(deleteAnswer);
    try {
      // const { data } = await axios.delete(
      //   `${process.env.REACT_APP_API}/api/v1/category/delete-category/${deleteValue}`,
      //   { answer : deleteAnswer }
      // );
      let data = await fetch(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${deleteValue}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
          body: JSON.stringify({ answer: deleteAnswer }),
        }
      );
      data = await data.json();

      if (data.success) {
        toast.success(data.message);
        // reset state
        setDeleteValue("");
        setDeleteAnswer("");
        // re-render all categories
        getAllcategory();
      } else {
        // toast.error(data.message);
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in delete category");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="table-responsive w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="loading">
                      <td>loading...</td>
                    </tr>
                  ) : (
                    <>
                      {categories?.length > 0 ? (
                        categories?.map((c) => {
                          return (
                            <tr key={c._id}>
                              <td>{c.name}</td>
                              <td>
                                <button
                                  className="btn btn-primary ms-2"
                                  onClick={() => {
                                    setIsModalOpen(true);
                                    setUpdatedName(c.name);
                                    setInitialFormValue(c.name);
                                    setSelected(c);
                                  }}
                                >
                                  Edit
                                </button>
                                {/* <DeleteCategory cid={c._id} getAllcategory={getAllcategory} /> */}
                                <button
                                  type="button"
                                  className="btn btn-danger m-2 mb-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  onClick={() => {
                                    setDeleteValue(c._id);
                                    setDeleteAnswer("");
                                  }}
                                >
                                  Delete Category
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td>No Categories</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <Modal
              title="Update Category"
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              open={isModalOpen}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
            {/* DELETE-MODEL-BOOTSTRAP */}
            <DeleteModal
              handleDelete={handleDelete}
              item="Category"
              deleteAnswer={deleteAnswer}
              setDeleteAnswer={setDeleteAnswer}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

// NOT USING THIS COMP IN OTHER COMPS LIKE CreateCategory.js 

import React from "react";
// import DeleteModal from "./DeleteModal";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteCategory = ({ cid, getAllcategory }) => {
  // const [deleteValue, setDeleteValue] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const yesDelete = (cid) =>{
  //   // await setDeleteValue(cid)
  //   // console.log(deleteValue)
  //   isModalOpen && handleDelete(cid)
  // }

  // console.log(cid)
  // let item = "category";
  // console.log("first", deleteValue);
  // delete category
  const handleDelete = async (deleteValue) => {
    console.log("Sec", deleteValue);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${deleteValue}`
      );
      if (data.success) {
        toast.success(data.message);
        // re-render all categories
        getAllcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in delete category");
    }
  };

  // const openDeleteModal = () => {
  //   setIsModalOpen(true); // Open the modal when the delete button is clicked
  // };

  return (
    <div>
      {/* <DeleteModal
        handleDelete={handleDelete}
        item="Category"
        // deleteValue={deleteValue}
        // setDeleteValue={setDeleteValue}
        cid={cid}
      /> */}
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        // onClick={() => setDeleteValue(cid)}
      >
        Delete Category
      </button>
    </div>

    // <div className="mb-3">
    //   {/* Button trigger modal */}
    //   <button
    //     type="button"
    //     className="btn btn-danger"
    //     data-bs-toggle="modal"
    //     data-bs-target="#staticBackdrop"
    //     onClick={() => {setDeleteValue(cid); setIsModalOpen(true) }}
    //   >
    //     Delete Category
    //   </button>
    //   {/* DeleteModal */}
    //   <div
    //     className="modal fade"
    //     id="staticBackdrop"
    //     data-bs-backdrop="static"
    //     data-bs-keyboard="false"
    //     tabIndex={-1}
    //     aria-labelledby="staticBackdropLabel"
    //     aria-hidden="true"
    //   >
    //     <div className="modal-dialog">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <h1 className="modal-title fs-5" id="staticBackdropLabel">
    //             Delete {item}
    //           </h1>
    //           <button
    //             type="button"
    //             className="btn-close"
    //             data-bs-dismiss="modal"
    //             aria-label="Close"
    //           />
    //         </div>
    //         <div className="modal-body">
    //           Are you sure,you want to <strong>Delete</strong> this {item}?
    //         </div>
    //         <div className="modal-footer">
    //           <button
    //             type="button"
    //             className="btn btn-secondary"
    //             data-bs-dismiss="modal"
    //           >
    //             Close
    //           </button>
    //           <button
    //             type="button"
    //             className="btn btn-danger"
    //             data-bs-dismiss="modal"
    //             onClick={() => yesDelete(deleteValue)}
    //           >
    //             Yes, Delete
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DeleteCategory;

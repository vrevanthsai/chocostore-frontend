import React from "react";
//DeletedModel used in DeleteProduct.js and CreateCategroy.js and Users.js(Admin-dashboard)

const DeleteModal = ({
  handleDelete,
  item = "item",
  deleteAnswer,
  setDeleteAnswer,
}) => {
  const handleCloseButton = () => {
    item!=="Product" && setDeleteAnswer('')
  }

  return (
    <div className="mb-3">
      {/* Button trigger modal only show for DeleteProduct.js */}
      {item === "Product" && (
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Delete {item}
        </button>
      )}
      {/* DeleteModal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Delete {item}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              Are you sure,you want to <strong>Delete</strong> this {item}?
              {((item === "Category") || ( item === "User") )&& (
                <div>
                  Then Enter/Type '<strong>DELETE</strong>' Word in below input
                  to delete the {item} {item === "Category" && <span> along with its related Products</span>}
                </div>
              )}
            </div>
            <div className="modal-footer">
              {/* input for careful category deletion */}
              {((item === "Category") || ( item === "User") ) && (
                <span>
                  <input
                    type="text"
                    placeholder="Enter DELETE word Here"
                    value={deleteAnswer}
                    onChange={(e) => setDeleteAnswer(e.target.value)}
                  />
                </span>
              )}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                // onClick={() => setDeleteAnswer('')}
                onClick={handleCloseButton}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

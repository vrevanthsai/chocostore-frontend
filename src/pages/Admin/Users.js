import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import DeleteModal from "../../components/Buttons/DeleteModal";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  // delete modal states
  const [deleteValue, setDeleteValue] = useState("");
  const [deleteAnswer, setDeleteAnswer] = useState("");

  const getAllUsers = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-users`
      );
      if (data?.success) {
        setUsers(data?.users);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //initial call
  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);

  //DELETE USER
  const handleDelete = async () => {
    try {
      let data = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-user/${deleteValue}`,
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
        // re-render all users
        getAllUsers()
      } else {
        // toast.error(data.message);
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in delete user");
    }
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Users</h1>
            {loading ? (
              <h3 className="text-center">Loading...</h3>
            ) : (
              <div>
                {users?.length > 0 ? (
                  <table className="table shadow">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone_Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Account_Created</th>
                        <th scope="col">Role</th>
                        <th scope="col">Remove_Usre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((u, i) => {
                        return (
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{u?.name}</td>
                            <td>{u?.email}</td>
                            <td>{u?.phone}</td>
                            <td>{u?.address}</td>
                            <td>{moment(u?.createdAt).fromNow()}</td>
                            <td>
                              {u?.role === 1 ? <strong>Admin</strong> : "User"}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger m-2 mb-1"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                onClick={() => {
                                  setDeleteValue(u._id);
                                  setDeleteAnswer("");
                                }}
                                disabled={auth?.user?.name === u.name}
                              >
                                Delete User
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <h4 className="text-center">No Users Yet</h4>
                )}
              </div>
            )}
          </div>
          {/* DELETE-MODEL-BOOTSTRAP */}
          <DeleteModal
            handleDelete={handleDelete}
            item="User"
            deleteAnswer={deleteAnswer}
            setDeleteAnswer={setDeleteAnswer}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Users;

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
// import toast from "react-hot-toast";
import { toast} from "react-toastify";
import MoreDetails from "../../components/Buttons/MoreDetails";
const { Option } = Select;

const AdminOrders = () => {
  // order manage status states
  // removed setStatus because we are not updating state value
  const [status] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  // order states
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  // get All Manage(status) orders data(initially)
  const getOrders = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(
        // data(direct) = orders(BE)
        `${process.env.REACT_APP_API}/api/v1/auth/manage-orders`
      );
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //initial rendering call
  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  //   Change function
  const handleChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      // re-call the function to display order-status changes
      getOrders();
      // console.log(data);
      toast.success(data?.message,{
        position:"top-center",
        theme:"dark"
      });
    } catch (error) {
      console.log(error);
    }
  };

  //add pagination logic here

  return (
    <Layout title={"Manage Orders"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {loading ? (
              <h3 className="text-center loading">loading...</h3>
            ) : (
              <div>
                {orders?.length > 0 ? (
                  <div>
                    {orders?.map((o, i) => {
                      // o -> order,i -> index(array)
                      return (
                        <div className="border shadow mb-3" key={i}>
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Status</th>
                                <th scope="col">Buyer</th>
                                <th scope="col">Date</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">{i + 1}</th>
                                <th scope="row">
                                  <Select
                                    variant={false}
                                    onChange={(value) =>
                                      handleChangeStatus(o._id, value)
                                    }
                                    defaultValue={o?.status}
                                  >
                                    {status.map((s, i) => {
                                      return (
                                        <Option key={i} value={s}>
                                          {s}
                                        </Option>
                                      );
                                    })}
                                  </Select>
                                </th>
                                {/* <td>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={o?.status}
                                onChange={(value) =>
                                  handleChangeStatus(o._id, value)
                                }
                              >
                                {status.map((s, i) => {
                                  return (
                                    <option key={i} value={s}>
                                      {s}
                                    </option>
                                  );
                                })}
                              </select>
                            </td> */}
                                <td>{o?.buyer?.name}</td>
                                <td>{moment(o?.createdAt).fromNow()}</td>
                                <td>
                                  <strong>
                                    {o?.payment?.transaction?.amount} Rs
                                  </strong>
                                </td>
                                <td>
                                  {o?.payment.success ? "Success" : "Failed"}
                                </td>
                                {/* <td>{o?.orderProducts?.length}</td> */}
                                <td>
                                  {o?.orderProducts?.reduce(
                                    (total, p) => total + p.cartQuantity,
                                    0
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {/* Ordered Products */}
                          <div className="container">
                            <h4 className="text-center">Ordered Products</h4>
                            <div
                              className="d-flex flex-wrap"
                              style={{ justifyContent: "space-around" }}
                            >
                              {o?.orderProducts?.map((p) => {
                                return (
                                  <div
                                    className="row mb-2 p-2 card flex-row"
                                    key={p._id}
                                  >
                                    <div className="col-md-6">
                                      <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} //direct API call
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100px"
                                        height={"100px"}
                                      />
                                      <p>Name: {p.name}</p>
                                    </div>
                                    <div className="col-md-6 orders">
                                      {/* <p>{p.name}</p> */}
                                      <p>Price : {p.price}</p>
                                      <h6>Quantity: {p.cartQuantity} </h6>
                                      <h6>
                                        Total-Cost: {p.price * p.cartQuantity}{" "}
                                        Rs{" "}
                                      </h6>
                                      <MoreDetails slug={p.slug} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <h3 className="text-center">No Orders</h3>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;

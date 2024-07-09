import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
// toast msg to show "Unauthorized Access" msg when ok=false(role=0)
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
        // sends msg to admin/user

        toast.error(res.data.message, {
          duration: 8000,
          position: "top-center",
        });
      }
    };
    if (auth?.token) authCheck();
    //eslint-disable-next-line
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />; // spinner with empty(homepage) path
}

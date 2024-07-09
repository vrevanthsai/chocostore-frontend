import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
// import toast from 'react-hot-toast';
import { toast } from "react-toastify";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);

        toast.error(res.data.message, {
          duration: 6000,
          position: "top-center",
        });
      }
    };
    if (auth?.token) authCheck();
    //eslint-disable-next-line
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}

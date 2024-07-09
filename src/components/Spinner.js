import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const Spinner = ({path = "login"}) => {
  const [count,setCount] = useState(3); //intial time starts at 5sec
  const navigate =useNavigate();
  const location =useLocation(); 
  const [auth] = useAuth();

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount((prevValue) => --prevValue)
    },1000);
    // count === 0 &&  navigate(`/${path}`,{
    //   state: location.pathname,
    // }) 
    if(count === 0){
      navigate(`/${path}`,{
        state: location.pathname,
      });
      // console.log("first")
      !auth?.token && toast.error('UnAuthorized Access,Please Login')
    }
    return () =>clearInterval(interval) //clean-up
  },[count,navigate,location,path,auth?.token])


  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center" >redirecting to you in {count} second</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;

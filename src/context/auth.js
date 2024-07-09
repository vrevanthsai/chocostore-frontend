import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
//cookies and encryption
import Cookies from "js-cookie";
// import CryptoJS from "crypto-js";
import { decryptToken } from "../components/filters/encryption";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios-header value
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const encryptedToken = Cookies.get("authToken");
    const finalToken = encryptedToken ? decryptToken(encryptedToken) : null;
    const encryptedUser = Cookies.get("userData");
    const userData = encryptedUser ? decryptToken(encryptedUser) : null;

    if (userData && finalToken) {
      try {
        const parseUserData = JSON.parse(userData);
        setAuth({
          ...auth,
          user: parseUserData,
          token: finalToken,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    getCategories();
    // const data= localStorage.getItem('auth');
    // if(data){
    //     const parseData = JSON.parse(data);
    //     setAuth({
    //         ...auth,
    //         user: parseData.user,
    //         token: parseData.token
    //     })
    // console.log(auth)
    // }

    //eslint-disable-next-line
  }, []);

  //storing categories data for header.js in LS 
  const getCategories = async () => {
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
        if(data?.success){
          let catProducts = localStorage.getItem('categories');
          if(catProducts && catProducts === JSON.stringify(data?.category)){
            // console.log("2")
            return;
          }else{
            localStorage.setItem('categories',JSON.stringify(data?.category))
            // console.log("first")
          }         
        }
    }catch(error){
        console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

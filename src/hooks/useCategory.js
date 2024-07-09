import { useState,useEffect } from 'react';
import axios from 'axios';

// it is a custom hook used to get all categories from BE when ever useCategory() hook is called
// use it in all other pages which uses getCategory API
export default function useCategory() {
    const [values ,setValues] = useState({
        loading:false,
        categories:[]
    })

    //get categories
    const getCategories = async () => {
        try{
            setValues({...values,loading:true})
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if(data?.success){
                setValues({...values,loading:false,categories:data?.category})
            }
        }catch(error){
            setValues({...values,loading:false})
            console.log(error);
        }
    }

    // initial call
    useEffect(() => {
        getCategories();
        // eslint-disable-next-line
    },[]);

    return values
}
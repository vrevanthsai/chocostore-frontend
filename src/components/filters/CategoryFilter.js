// import { Checkbox } from "antd";
// import axios from "axios";
import React from "react";
import useCategory from "../../hooks/useCategory";

const CategoryFilter = ({
  setFpage,
  setFtotal,
  setPage,
  checked,
  setChecked,
  navigate,
}) => {
  // const [categories, setCategories] = useState([]);
  // const [catloading, setCatloading] = useState(true);
  // //   const [checked, setChecked] = useState([]);

  // // get all categories
  // const getAllcategory = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/category/get-category`
  //     );
  //     if (res?.data.success) {
  //       setCatloading(false);
  //       setCategories(res?.data.category);
  //     }
  //   } catch (error) {
  //     setCatloading(false);
  //     console.log(error);
  //     console.log("Something went wrong in getting category");
  //   }
  // };

  // // re-rendering for both allcategories and total(no of products)
  // useEffect(() => {
  //   getAllcategory();
  //   // eslint-disable-next-line
  // }, []);

  const hookValues = useCategory();

  // filter by category
  const handleFilter = (value, id) => {
    navigate(`/`);
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    // console.log(all);
  };

  return (
    <div>
      <div className="d-flex flex-column">
        {hookValues?.loading && <p className="loading">loading...</p>}
        {hookValues?.categories?.map((c, i) => {
          return (
            <div className="form-check" key={c._id}>
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id={`flexCheckDefault-${i + 1}`}
                checked={checked.includes(c._id)}
                onChange={(e) => {
                  handleFilter(e.target.checked, c._id);
                  setFpage(1);
                  setFtotal(0);
                  setPage(1);
                }}
              />
              <label
                className="form-check-label"
                htmlFor={`flexCheckDefault-${i + 1}`}
              >
                {c?.name}
              </label>
            </div>

            // <Checkbox
            //   key={c._id}
            //   checked={checked.includes(c._id)}
            //   onChange={(e) => {
            //     handleFilter(e.target.checked, c._id);
            // setFpage(1);
            // setFtotal(0);
            // setPage(1);
            //   }}
            // >
            //   {c.name}
            // </Checkbox>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;

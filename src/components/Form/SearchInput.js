// modified code in api call and its function
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import { toast} from "react-toastify";

const SearchInput = () => {
  const { values, setValues ,setPage} = useSearch();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Trim the keyword to handle leading/trailing spaces(first/last)
    const trimmedKeyword = values?.keyword.trim();
    // Validation for keyword not being only a single white space or multiple consecutive spaces between words
    if (trimmedKeyword === "") {
      toast.error("Search query cannot be empty or just spaces.",{
        autoClose:3000
      });
      return;
    }
    // Validation for two or more consecutive white spaces
    const consecutiveSpacesPattern = /\s{2,}/;
    if (consecutiveSpacesPattern.test(values?.keyword)) {
      toast.error("Please remove extra spaces from your search query.",{
        autoClose:3000
      });
      return;
    }
    setPage(1); //reset page when new keyword is given
    // searchProducts(1, trimmedKeyword); // Ensure we search with the first page and use the trimmed keyword
    navigate(`/search/${values.keyword}`)
    // navigate(`/search/${keyword}`)
  };

  return (
    <div className="search">
      <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values?.keyword}
          onChange={(e) => {
            setValues({ ...values, keyword: e.target.value });
          }}
          required
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;

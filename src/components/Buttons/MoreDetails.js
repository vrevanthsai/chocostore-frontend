import React from "react";
import { useNavigate } from "react-router-dom";

const MoreDetails = ({slug}) => {
    const navigate = useNavigate();

  return (
    <button
      className="btn btn-primary ms-1"
      onClick={() => navigate(`/product/${slug}`)}
    >
      More Details
    </button>
  );
};

export default MoreDetails;

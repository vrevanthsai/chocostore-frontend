import React from "react";
import { Prices } from "../Price";
// import { Radio } from "antd";

const PriceFilter = ({
  radio,
  setRadio,
  setFpage,
  setFtotal,
  setPage,
  navigate,
}) => {
  // console.log(radio)
  return (
    <div>
      <div className="d-flex flex-column">
        {Prices?.map((p, i) => {
          return (
            <div className="form-check" key={i}>
              <input
                className="form-check-input"
                value={JSON.stringify(p.array)}
                onChange={(e) => {
                  setRadio(JSON.parse(e.target.value))
                  setFpage(1);
                  setFtotal(0);
                  setPage(1);
                  navigate(`/`);
                }}
                type="radio"
                name="flexRadioDefault"
                id={`flexRadioDefault${i + 1}`}
                checked={radio && JSON.stringify(radio) === JSON.stringify(p.array)}
              />
              <label
                className="form-check-label"
                htmlFor={`flexRadioDefault${i + 1}`}
              >
                {p.name}
              </label>
            </div>
          );
        })}

        {/* <Radio.Group
          value={radio}
          onChange={(e) => {
            setRadio(e.target.value);
            setFpage(1);
            setFtotal(0);
            setPage(1);
            navigate(`/`);
          }}
        >
          {Prices?.map((p) => {
            return (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            );
          })}
        </Radio.Group> */}
      </div>
    </div>
  );
};

export default PriceFilter;

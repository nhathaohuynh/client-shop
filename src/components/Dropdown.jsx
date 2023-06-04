import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/style";

const Dropdown = ({ categoriesData, setDropdown }) => {
  const navigate = useNavigate();

  const handleSubmit = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropdown(false);
  };
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md show-sm">
      {categoriesData &&
        categoriesData.map((i) => {
          return (
            <div
              key={crypto.randomUUID()}
              className={styles.noramlFlex}
              onClick={() => handleSubmit(i)}
            >
              <img
                src={i.image_Url || "https://unsplash.com/photos/Im7lZjxeLhg"}
                alt=""
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
              />
              <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default Dropdown;

import React, { useEffect, useState } from "react";
import styles from "../styles/style";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data }) => {
  const [relativeData, setRelativeData] = useState();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    const productData = [...products];
    const d =
      productData && productData.filter((i) => i.category === data.category);
    setRelativeData(d);
  }, [data]);
  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {relativeData &&
              relativeData.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;

import React, { useEffect, useState } from "react";
import styles from "../styles/style";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const BestDeals = () => {
  const { products } = useSelector((state) => state.product);
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = [...products];
    const sorted = data?.sort((a, b) => b?.sold_out - a?.sold_out);

    const firstFive = sorted && sorted?.slice(0, 5);
    setData(firstFive);
  }, [products]);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.length !== 0 && (
            <>
              {data &&
                data.map((i) => (
                  <ProductCard data={i} key={crypto.randomUUID()} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;

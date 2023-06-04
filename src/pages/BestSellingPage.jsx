import React, { useEffect, useState } from "react";
import { Footer, Header, ProductCard, Sponsored } from "../components";
import styles from "../styles/style";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const { products } = useSelector((state) => state.product);
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = [...products];
    const sorted = data?.sort((a, b) => b?.sold_out - a?.sold_out);

    const firstFive = sorted && sorted?.slice(0, 10);
    setData(firstFive);
  }, [products]);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((i) => <ProductCard data={i} key={crypto.randomUUID()} />)}
        </div>
      </div>
      <Sponsored />
      <Footer />
    </div>
  );
};

export default BestSellingPage;

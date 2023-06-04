import React, { useEffect, useState } from "react";
import { Footer, Header, ProductCard, Sponsored } from "../components";
import styles from "../styles/style";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const [data, setData] = useState();
  const [searchParams] = useSearchParams();
  const { products } = useSelector((state) => state.product);

  const categoryData = searchParams.get("category");

  useEffect(() => {
    const productData = [...products];
    if (categoryData === null) {
      const d = productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d =
        productData && productData.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [searchParams]);
  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Sponsored />
      <Footer />
    </div>
  );
};

export default ProductPage;

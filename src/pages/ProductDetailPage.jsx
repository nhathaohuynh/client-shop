import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer, Header, ProductDetail, SuggestedProduct } from "../components";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  const { products } = useSelector((state) => state.product);
  const [data, setData] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    if (products && products.length > 0) {
      const productData = (products && [...products]) || [];
      const data = productData?.filter((product) => product?._id === name);
      setData(data);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [name]);
  return (
    <div>
      <Header />
      {data.length > 0 && <ProductDetail data={data[0]} />}
      {data.length > 0 && <SuggestedProduct data={data[0]} />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

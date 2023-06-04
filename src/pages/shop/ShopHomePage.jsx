import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import {
  Header,
  Loading,
  ShopHeader,
  ShopInfo,
  ShopProfileData,
} from "../../components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import instance from "../../axios";

const ShopHomePage = () => {
  const { isSeller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState();
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      instance
        .get(`shop/getInfo/${id}`)
        .then((res) => {
          setLoading(false);
          setInfo(res?.data?.shop);
          setProduct(res?.data?.products);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);
  console.log();

  return loading ? (
    <Loading></Loading>
  ) : (
    <div>
      {isSeller ? <ShopHeader></ShopHeader> : <Header></Header>}
      <div className={`${styles.section} bg-[#f5f5f5]`}>
        <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-auto detailCard h-[90vh] sticky top-10 left-0 z-1">
            <ShopInfo
              isOwner={isSeller}
              seller={info}
              total_product={products.length}
            />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={isSeller} seller={info} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BestDeal,
  Categories,
  FeaturedProduct,
  Header,
  Hero,
  Events,
  Sponsored,
  Footer,
  Loading,
} from "../components";
import { useNavigate } from "react-router-dom";
import { getProductHome } from "../redux/actions/product";
import { getEventHome } from "../redux/actions/event";
import { clearError } from "../redux/actions/user";
const Home = () => {
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error && isAuthenticated) {
      navigate("/login");
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    dispatch(getProductHome());
    dispatch(getEventHome());
  }, []);

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Header activeHeading={1}></Header>
          <Hero></Hero>
          <Categories></Categories>
          <BestDeal></BestDeal>
          <FeaturedProduct />
          <Events></Events>
          <Sponsored />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;

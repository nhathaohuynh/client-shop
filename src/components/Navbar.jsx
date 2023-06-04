import React from "react";
import styles from "../styles/style";
import { navItems } from "../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`${styles.noramlFlex} flex-col 800px:flex-row gap-5 800px:gap-0`}>
      {navItems &&
        navItems.map((i, index) => {
          return (
            <div key={crypto.randomUUID()} className="flex">
              <Link
                to={i.url}
                className={`${
                  active === index + 1 ? "text-[#17dd1f]" : " 800px:text-white"
                } font-[500] text-[18px] 800px:text-[16px] px-6 cursor-pointer"
                }`}
              >
                {i.title}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Header, ProfileContent, ProfileSideBar } from "../components";
import styles from "../styles/style";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`flex bg-{#f5f5f5} py-10 ${styles.section}`}>
        <div className="800px:w-[335px]">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;

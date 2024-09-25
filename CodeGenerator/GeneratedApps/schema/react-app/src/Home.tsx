import { FC, Suspense } from "react";
import "./styles/home.css";
import * as React from "react";

const Home: FC = () => {
  return (
    <Suspense>
      <div className="home_container">
        <img src={"/svg/dashboard.png"} alt={"DASHBOARD ICON"} />
      </div>
    </Suspense>
  );
};

export default Home;

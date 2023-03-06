import React from "react";

import Messages from "../components/Messages";
import Sidebar from "../components/Sidebar";
const Home = () => {
  return (
    <div className="home">
      <div className="homeWrapper">
        <Sidebar />
        <Messages />
      </div>
    </div>
  );
};

export default Home;

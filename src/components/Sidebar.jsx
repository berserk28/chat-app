import React from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Users from "../components/Users";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Searchbar />
    </div>
  );
};

export default Sidebar;

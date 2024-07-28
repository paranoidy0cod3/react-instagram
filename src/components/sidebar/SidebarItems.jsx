import React from "react";
import Home from "./Home";
import Search from "./Search";
import Notification from "./Notification";
import CreatePost from "./CreatePost";
import Profile from "./Profile";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notification />
      <CreatePost />
      <Profile />
    </>
  );
};

export default SidebarItems;

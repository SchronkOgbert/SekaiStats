import React from "react";
import Background from "../Background";
import LoggedInNavbar from "../Navbar/LoggedInNavbar";
import SearchBar from "../Searchbar/SearchBar";
import Post from "./Feed";
import PostContent from "./FeedContent";
import { UserContext } from "../../context/userContext";

const Homepage = () => {
  return (
    <>
      <div>
        <Background />
        <LoggedInNavbar />
        <Post />
      </div>
    </>
  );
};

export default Homepage;

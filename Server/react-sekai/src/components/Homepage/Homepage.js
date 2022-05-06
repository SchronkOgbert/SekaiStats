import React from "react";
import Background from "../Background";
import LoggedInNavbar from "../Navbar/LoggedInNavbar";
import Chart from "chart.js/auto";
import SearchBar from "../Searchbar/SearchBar";
import Post from "./Feed";
import PostContent from "./FeedContent";
import { UserContext } from "../../context/userContext";

const Homepage = () => {
  return (
    <>
      <div>
        <Background />
        <UserContext.Provider>
          <LoggedInNavbar />
        </UserContext.Provider>
        <Post />
      </div>
    </>
  );
};

export default Homepage;

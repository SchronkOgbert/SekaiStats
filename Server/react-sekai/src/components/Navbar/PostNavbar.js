import React, { useContext } from "react";
import { MenuItemsLogged } from "./MenuItems";
import "./Navbar.css";
import { Button } from "../Button";
import Cookies from "js-cookie";
import setSuccess from "../Login/Login";
import SearchBar from "../Searchbar/SearchBar";
import Login from "../Login/Login";
import UserContext from "../Login/Login";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Feed from "../Homepage/Feed";
import FeedContent from "../Homepage/FeedContent";
import "../Homepage/Feed.css";

const PLACEHOLDER_URL = "/Homepage/Feed/Get";

const PostNavbar = (props) => {
  const [data, setData] = useState("");

  let navbarTitle = "";
  navbarTitle = Cookies.get("navbarTitle");

  console.log(navbarTitle);

  const username = Cookies.get("username");
  const state = { clicked: false };

  const handleClick = () => {
    Cookies.remove("user");
    setSuccess(false);
    this.setState({ clicked: !this.state.clicked });
  };

  return (
    <nav className="navbarItems">
      <div className="tatalatitle">
        <a href="/Homepage">
          <h1 className="navbar-logo">Sekai Stats</h1>
        </a>
        <ul className="navbarTitle">{navbarTitle}</ul>
        <a href="/Login">
          <Button onClick={handleClick}>Log out</Button>
        </a>
      </div>
    </nav>
  );
};

export default PostNavbar;

import Cookies from "js-cookie";
import React from "react";
import Background from "../Background";
import PostNavbar from "../Navbar/PostNavbar";
import "./Post.css";
import { Link, Router, Route, Routes } from "react-router-dom";
import { Button } from "../Button";
import { useRef, useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/authProvider";
import api from "../../api/axios";
import PostContent from "./PostContent";
import FeedContent from "./FeedContent";

const POST_URL = "/Homepage/Post/Get";
const FEED_URL = "/Homepage/Feed/Get";
const LOAD_URL = "/Post/Load";

const Post = () => {
  const [data, setData] = useState([]);
  const postName = Cookies.get("postName");
  const postUser = Cookies.get("postUser");
  const postDate = Cookies.get("postDate");
  const postCategory = Cookies.get("postCategory");

  console.log(JSON.stringify({ postName, postUser, postDate }));

  useEffect(() => {
    const getData = async () => {
      const responseData = await axios.post(
        POST_URL,
        JSON.stringify({ postName, postUser, postDate }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(responseData.data);
      setData(responseData.data);
      console.log(data);
    };
    getData();
  }, []);

  Cookies.set("navbarTitle", postName);
  return (
    <div>
      <Background />
      <PostNavbar />
      <div className="mainulamain">
        <div className="tatalapostdata">
          <div className="postData">
            <div className="iframediv">
              <iframe height="780" src={data[2]}></iframe>
            </div>
            <div className="source">
              <a href={data[6]}>{data[6]}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const postTitle = Cookies.get("postTitle");
// const postUser = Cookies.get("postUser");
// const postBody = Cookies.get("postBody");
// const postDate = Cookies.get("postDate");
// const embeddedHTML = Cookies.get("embeddedHTML");
export default Post;

import Cookies from "js-cookie";
import React from "react";
import Background from "../Background";
import LoggedInNavbar from "../Navbar/LoggedInNavbar";
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
  ///aici e problemaaa
  const [data, setData] = useState([]);
  const postName = Cookies.get("postName");
  const postUser = Cookies.get("postUser");
  const postDate = Cookies.get("postDate");

  console.log(postName);

  useEffect(() => {
    console.log("marinel");

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
  //42:10
  return (
    <div>
      <Background />
      <LoggedInNavbar />
      <div className="mainulamain">
        <div className="tatalapostdata">
          <div className="postData">
            <div className="iframediv">
              <iframe height="780" src={data[2]}></iframe>
            </div>
            <div className="source">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
                Sursa:
                https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley
              </a>
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

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

  return (
    <div>
      <Background />
      <LoggedInNavbar />
      <div className="postData">
        <div className="text">
          <div className="postName">{data[0]}</div>
          <div className="postUser">{data[1]}</div>
          <div className="postDate">{data[4]}</div>
          <div className="postBody">{data[3]}</div>
        </div>
        <iframe height={900} width={1600} src={data[2]}></iframe>
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

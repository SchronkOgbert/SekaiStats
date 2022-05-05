import React from "react";
import "./Feed.css";
import FeedContent from "./FeedContent";
import { Button } from "../Button";
import { useRef, useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/authProvider";
import Cookies from "js-cookie";
import api from "../../api/axios";

const PLACEHOLDER_URL = "/Homepage/Feed/Get";

const Feed = () => {
  const { setAuth } = useContext(AuthContext);

  const [data, setData] = useState([]);

  // const [postName, setPostName] = useState(['']);

  // const [postUser, setPostUser] = useState('');

  // const [postDate, setPostDate] = useState('');

  useEffect(() => {
    const keyword = "";
    const exact_match = false;

    const getData = async () => {
      const response = await axios.post(
        PLACEHOLDER_URL,
        JSON.stringify({ keyword, exact_match }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      setData(response.data);

      console.log(data.postName);
    };
    getData();
  }, []);

  const lista = data.map((el) => {
    return (
      <FeedContent
        feedName={el.postName}
        feedUser={el.postUser}
        feedDate={el.postDate}
      />
    );
  });

  return (
    <div className="mainContainer">
      <div className="feedName">Feed</div>
      {lista}
    </div>
  );
};

// Cookies.set("postTitle", "post");
// Cookies.set("postUser", "post");

// Cookies.set("postBody", "lorem30");
// Cookies.set("postDate", "4/15/2022");

// Cookies.set("embeddedHTML", "<h1>EMBEDDED HTML<h1/>");

export default Feed;

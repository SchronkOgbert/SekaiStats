import Cookies from "js-cookie";
import React from "react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Button } from "../Button";
import { Navigate } from "react-router";

import { BrowserRouter, Link, Router, Route, Routes } from "react-router-dom";
import "./FeedContent.css";

const PLACEHOLDER_URL = "/Post/Load";

const FeedContent = (props) => {
  const [data, setData] = useState([]);

  const postName = props.feedName;
  const postUser = props.feedUser;
  const postDate = props.feedDate;

  var trimmedName = props.feedName.replace("\n", "").trim();
  console.log(props);

  // const handleSubmit = () => {
  //   axios.post(
  //     PLACEHOLDER_URL,
  //     JSON.stringify({ postName, postUser, postDate }),
  //     {
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  //   <Navigate to="/Post/Load" />;
  // };

  const handleClick = () => {
    console.log("marinel a dat click");
    Cookies.set("postName", props.feedName);
    Cookies.set("postUser", props.feedUser);
    Cookies.set("postDate", props.feedDate);
  };

  return (
    <>
      <a href="/Post" onClick={handleClick}>
        <div className="feedContainer">
          <div className="feedName">{props.feedName}</div>
          <div className="feedUser">User: {props.feedUser}</div>
          <div className="feedDate">Date: {props.feedDate}</div>
        </div>
      </a>
    </>
  );
};

export default FeedContent;

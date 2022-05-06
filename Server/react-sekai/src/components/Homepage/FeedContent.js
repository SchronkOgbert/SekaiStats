import Cookies from "js-cookie";
import React from "react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

import { BrowserRouter, Link, Router, Route, Routes } from "react-router-dom";
import "./FeedContent.css";

const PLACEHOLDER_URL = "/Post/Load";

const FeedContent = (props) => {
  const [data, setData] = useState([]);

  Cookies.set("postName", props.feedName);
  Cookies.set("postUser", props.feedUser);
  Cookies.set("postDate", props.feedDate);

  var trimmedName = props.feedName.replace("\n", "").trim();
  console.log(props);

  return (
    <>
      <a href={"/Post/Load"}>
        <div className="feedContainer">
          <div className="feedName">{props.feedName}</div>
          <div className="feedUser">{props.feedUser}</div>
          <div className="feedDate">{props.feedDate}</div>
        </div>
      </a>
    </>
  );
};

export default FeedContent;

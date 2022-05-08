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
  const postName = props.feedName;
  const postUser = props.feedUser;
  const postDate = props.feedDate;

  const handleClick = () => {
    console.log("marinel a dat click");
    Cookies.set("postName", props.feedName);
    Cookies.set("postUser", props.feedUser);
    Cookies.set("postDate", props.feedDate);
  };

  return (
    <>
      <a href="/Post" onClick={handleClick}>
        <div className="tatalafeed">
          <div className="feedContainer">
            <div className="feedName">{props.feedName}</div>
            <div className="feedUser">User: {props.feedUser}</div>
            <div className="feedDate">Date: {props.feedDate}</div>
            <div className="coolIcon"></div>
          </div>
        </div>
      </a>
    </>
  );
};

export default FeedContent;

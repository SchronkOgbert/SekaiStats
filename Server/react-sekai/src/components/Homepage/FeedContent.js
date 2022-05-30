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
  let postName = props.feedName;
  let postUser = props.feedUser;
  let postDate = props.feedDate;
  let postCategories = props.feedCategories;
  let postDescription = props.feedDescription;

  const handleClick = () => {
    Cookies.set("postName", props.feedName);
    Cookies.set("postUser", props.feedUser);
    Cookies.set("postDate", props.feedDate);
  };
  postCategories = postCategories.replace("[", "");
  postCategories = postCategories.replace("]", "");
  postCategories = postCategories.replace("\\'", '"');

  return (
    <>
      <div className="buniculafeed">
        <div className="tatalafeed">
          <a href="/Post" onClick={handleClick}>
            <div className="feedContainer">
              <div className="feedParent">
                <div className="feedName">{props.feedName}</div>
                <div className="feedUser">user: {props.feedUser}</div>
                <div className="feedDate">Date: {props.feedDate}</div>
              </div>
              <div className="feedCategory">Category: {postCategories}</div>
            </div>
          </a>
          <div className="flexTheDesc">
            <div className={"feedDescription"}>{postDescription}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedContent;

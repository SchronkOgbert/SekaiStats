import Cookies from "js-cookie";
import React from "react";
import { Link, Router, Route, Routes } from "react-router-dom";
import "./FeedContent.css";

const FeedContent = (props) => {
  Cookies.set("postName", props.feedName);
  Cookies.set("postUser", props.feedUser);
  Cookies.set("postDate", props.feedDate);

  var trimmedName = props.feedName.replace("\n", "").trim();
  console.log(props);

  return (
    <>
      <Link to={"/Post"}>
        <div className="feedContainer">
          <div className="feedName">{props.feedName}</div>
          <div className="feedUser">{props.feedUser}</div>
          <div className="feedDate">{props.feedDate}</div>
        </div>
      </Link>
      <Routes>
        <Route path="/Post/:feedName"></Route>
      </Routes>
    </>
  );
};

export default FeedContent;

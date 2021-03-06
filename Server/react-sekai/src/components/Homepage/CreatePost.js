import React from "react";
import "./CreatePost.css";
import Background from "../Background";
import LoggedInNavbar from "../Navbar/LoggedInNavbar";
import { useRef, useState, useEffect, useContext } from "react";
import { Button } from "../Button";
import axios from "../../api/axios";
import AuthContext from "../../context/authProvider";
import Cookies from "js-cookie";
import api from "../../api/axios";
import { Link, Router, Route, Routes, useNavigate } from "react-router-dom";

const createPostURL = "/Post/Make";

const CreatePost = () => {
  const [data, setData] = useState([]);
  const [postName, setPostName] = useState("");
  const [postCategories, setPostCategories] = useState([]);
  const [postLink, setPostLink] = useState("");
  const [postSource, setPostSource] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (postCategories == "") {
      alert("Error");
    } else {
      const text_body = "text_body";

      const formData = {
        postName: postName,
        postUser: Cookies.get("username"),
        postLink: postLink,
        postTextBody: "espanuel",
        postCategories: postCategories,
        postDataSource: postSource,
      };

      const getData = async () => {
        const response = await axios.post(
          createPostURL,
          JSON.stringify(formData),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setData(response.data);
        console.log(response.data);
      };

      getData().then((r) => {
        console.log("Submitted new post");
        navigate("/Homepage");
      });
    }
  };

  return (
    <div>
      <Background />
      <LoggedInNavbar />
      <div className="tataLaCreatePostContainer">
        <div className="createPostContainer">
          <div className="createPostTitle">Create New Post</div>
          <div className="createPostContent">
            <div className="newForm">
              <div className="newFormGroup">
                <label htmlFor="PostName">Name</label>
                <input
                  type="text"
                  id="newPostName"
                  onChange={(e) => setPostName(e.target.value)}
                  value={postName}
                  autoComplete="off"
                  required
                />
                <label htmlFor="PostCategory">Category</label>
                <input
                  type="text"
                  id="PostCategory"
                  onChange={(e) => setPostCategories(e.target.value)}
                  value={postCategories}
                  autoComplete="off"
                  required
                />
                <label htmlFor="PostLink">Link</label>
                <input
                  type="text"
                  id="PostLink"
                  onChange={(e) => setPostLink(e.target.value)}
                  value={postLink}
                  autoComplete="off"
                  required
                />
                <label htmlFor="PostSource">Source</label>
                <input
                  type="text"
                  id="PostSource"
                  onChange={(e) => setPostSource(e.target.value)}
                  value={postSource}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
          </div>
          <div className="newPostFooter">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;

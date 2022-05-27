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

const createPostURL = "/Post/Make";

const CreatePost = () => {
  const [data, setData] = useState([]);
  const [postName, setPostName] = useState("");
  const [postCategories, setPostCategories] = useState([]);
  const [postLink, setPostLink] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const text_body = "text_body";
    const data_source = "data_source_link";

    const formData = {
      postName: postName,
      postUser: "",
      postLink: postLink,
      postTextBody: text_body,
      postCategories: postCategories,
      postDataSource: data_source,
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

    getData();
  }, []);

  const handleSubmit = () => {
    console.log("Submitted new post");
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
                <label htmlFor="PostName">Post Name</label>
                <input
                  type="text"
                  id="newPostName"
                  // onChange={(e) => setPostName(e.target.value)}
                  // value={newPostName}
                  autoComplete="off"
                  required
                />
                <label htmlFor="PostCategory">Post Category</label>
                <input
                  type="text"
                  id="PostCategory"
                  // onChange={(e) => setPostCategories(e.target.value)}
                  // value={newPostCategory}
                  autoComplete="off"
                  required
                />
                <label htmlFor="PostLink">Post Link</label>
                <input
                  type="text"
                  id="PostLink"
                  // onChange={(e) => setPostLink(e.target.value)}
                  // value={newPostLink}
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

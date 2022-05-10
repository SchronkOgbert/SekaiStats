import React from "react";
import "./Feed.css";
import FeedContent from "./FeedContent";
import { Button } from "../Button";
import { useRef, useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/authProvider";
import Cookies from "js-cookie";
import api from "../../api/axios";
import SearchBar from "../Searchbar/SearchBar";

const PLACEHOLDER_URL = "/Homepage/Feed/Get";

const Feed = () => {
  const { setAuth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const exact_match = false;

    const getData = async () => {
      const response = await axios.post(
        PLACEHOLDER_URL,
        JSON.stringify({ keyword, exact_match }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setData(response.data);
    };
    getData();
  }, []);

  const searchFilter = data
    .filter((el) => {
      if (keyword == "") {
        return el;
      } else if (el.postName.toLowerCase().includes(keyword.toLowerCase())) {
        return el;
      }
    })
    .map((el) => {
      return (
        <FeedContent
          feedName={el.postName}
          feedUser={el.postUser}
          feedDate={el.postDate}
        />
      );
    });

  const financialFilter = () => {
    setFilterKeyword("financial");
    data
      .filter((el) => {
        if (filterKeyword == "") {
          return el;
        } else if (el.postType.toLowerCase() == filterKeyword.toLowerCase()) {
          return el;
        }
      })
      .map((el) => {
        return (
          <FeedContent
            feedName={el.postName}
            feedUser={el.postUser}
            feedDate={el.postDate}
          />
        );
      });
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleCheck = () => {
    setChecked(true);
    if (checked) {
      setChecked(false);
    }
  };

  return (
    <div className="buniculutata">
      <div className="tatalacopii">
        <div className="mainContainerParent">
          <div className="mainFilterContainer">
            <div className="searchBar">
              <SearchBar
                placeholder="search chart..."
                onChange={handleChange}
              />
            </div>
            <div className="checkboxList">
              <form>
                <label>
                  <input
                    type="checkbox"
                    id="checkboxID"
                    onClick={handleCheck}
                  />
                  Financial
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="checkboxID"
                    onClick={handleCheck}
                  />
                  Demographic
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="checkboxID"
                    onClick={handleCheck}
                  />
                  Geographic
                </label>
              </form>
            </div>
          </div>
          <div className="mainFeedContainer">
            <div className="lista">{searchFilter}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cookies.set("postTitle", "post");
// Cookies.set("postUser", "post");

// Cookies.set("postBody", "lorem30");
// Cookies.set("postDate", "4/15/2022");

// Cookies.set("embeddedHTML", "<h1>EMBEDDED HTML<h1/>");

export default Feed;

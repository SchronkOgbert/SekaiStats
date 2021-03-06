import React from "react";
import "./Feed.css";
import FeedContent from "./FeedContent";
import { Button } from "../Button";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/authProvider";
import Cookies from "js-cookie";
import api from "../../api/axios";
import SearchBar from "../Searchbar/SearchBar";

const SEARCH_URL = "/Homepage/Feed/Get";

const Feed = () => {
  const { setAuth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const [financialChecked, setFinancialChecked] = useState(false);
  const [demographicChecked, setDemographicChecked] = useState(false);
  const [geographicChecked, setGeographicChecked] = useState(false);
  const [healthChecked, setHealthChecked] = useState(false);

  useEffect(() => {
    const exact_match = false;
    const formData = {
      keyword: keyword,
      exact_match: exact_match,
      categories: categories,
    };

    const getData = async () => {
      const response = await axios.post(SEARCH_URL, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      });
      setData(response.data);
      console.log(response.data);
    };
    getData();
  }, [financialChecked, demographicChecked, geographicChecked, healthChecked]);

  const handleFinancialCheck = () => {
    if (!financialChecked) {
      categories.push("financial");
      console.log(categories);
      setCategories(categories);
      setFinancialChecked(true);
    }
    if (financialChecked) {
      categories.splice(categories.indexOf("financial"), 1);
      console.log(categories);
      setFinancialChecked(false);
    }
  };

  const handleDemographicCheck = () => {
    if (!demographicChecked) {
      categories.push("Demographic");
      setCategories(categories);
      console.log(categories);
      setDemographicChecked(true);
    }
    if (demographicChecked) {
      categories.splice(categories.indexOf("Demographic"), 1);
      console.log(categories);
      setDemographicChecked(false);
    }
  };

  const handleGeographicCheck = () => {
    if (!geographicChecked) {
      categories.push("Geographic");
      console.log(categories);
      setCategories(categories);
      setGeographicChecked(true);
    }
    if (geographicChecked) {
      categories.splice(categories.indexOf("Geographic"), 1);
      setGeographicChecked(false);
      console.log(categories);
    }
  };

  const handleHealthCheck = () => {
    if (!healthChecked) {
      categories.push("Health");
      setCategories(categories);
      console.log(categories);
      setHealthChecked(true);
    }
    if (healthChecked) {
      categories.splice(categories.indexOf("Health"), 1);
      console.log(categories);
      setHealthChecked(false);
    }
  };

  const searchFilter = data
    .filter((el) => {
      if (keyword === "") {
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
          feedCategories={el.postCategories}
          feedDescription={el.postDescription}
        />
      );
    });

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="buniculutata">
      <div className="tataLaFilter">
        <div className="mainFilterContainer">
          <div className="stickyDiv">
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
                    onClick={handleFinancialCheck}
                  />
                  Financial
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="checkboxID"
                    onClick={handleDemographicCheck}
                  />
                  Demographic
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="checkboxID"
                    onClick={handleGeographicCheck}
                  />
                  Geographic
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="checkboxID"
                    onClick={handleHealthCheck}
                  />
                  Health
                </label>
              </form>
            </div>
            <div className="createPost">
              <a href="/CreatePost">
                <Button>Create Post</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="tatalacopii">
        <div className="mainContainerParent">
          <div className="mainFeedContainer">
            <div className="lista">{searchFilter}</div>
          </div>
        </div>
      </div>
      {/* <div className="tatalacont3">
        <div className="mainCont3Parent">
          <div className="mainFeed3Container"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Feed;

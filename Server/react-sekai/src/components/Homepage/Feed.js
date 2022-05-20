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
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [financialChecked, setFinancialChecked] = useState(false);
  const [demographicChecked, setDemographicChecked] = useState(false);
  const [geographicChecked, setGeographicChecked] = useState(false);
  const [healthChecked, setHealthChecked]= useState(false);

  useEffect(() => {
    const exact_match = false;
    const formData = {
      keyword: keyword,
      exact_match: exact_match,
      categories: categories,
    };

    const getData = async () => {
      const response = await axios.post(
        PLACEHOLDER_URL,
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
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
        />
      );
    });

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="buniculutata">
      <div className="tatalacopii">
        <div className="mainContainerParent">
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

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

  const [financialChecked, setFinancialChecked] = useState(false);
  const [demographicChecked, setDemographicChecked] = useState(false);
  const [geographicChecked, setGeographicChecked] = useState(false);

  useEffect(() => {
    const exact_match = false;

    const getData = async () => {
      const response = await axios.post(
        PLACEHOLDER_URL,
        JSON.stringify({ keyword, category, exact_match }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setData(response.data);
      console.log(response.data)
    };
    getData();
  }, [category, keyword]);

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

  const financialFilter =
    data
    .filter((el) => {
      if (category === "") {
        return el;
      } 
      else if (category === "financial") {
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

  const demographicFilter =
  data
  .filter((el) => {
    if (category === "") {
      return el;
    } 
    else if (category === "demographic") {
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

  const geographicFilter =
  data
  .filter((el) => {
    if (category === "") {
      return el;
    } 
    else if (category === "geographic") {
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

  const handleFinancialCheck = () => {
    setCategory("")
    setFinancialChecked(false);
    if (!financialChecked) {
      setCategory("financial");
      setFinancialChecked(true);
    }
  };

  const handleDemographicCheck = () => {
    setCategory("")
    setDemographicChecked(false);
    if (!demographicChecked) {
      setCategory("demographic");
      setDemographicChecked(true);
    }
  };

  const handleGeographicCheck = () => {
    setCategory("")
    setGeographicChecked(false);
    if (!geographicChecked) {
      setCategory("geographic");
      setGeographicChecked(true);
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
              </form>
            </div>
          </div>
          <div className="mainFeedContainer">
            <div className="lista">{(financialChecked) ? financialFilter : searchFilter}</div>
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

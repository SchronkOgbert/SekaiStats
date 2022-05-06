import React from "react";
import axios from "../../api/axios";
import { useState } from "react";

const getData = async () => {
  const data = "";
  const keyword = "";
  const exact_match = false;
  const response = await axios.post(
    "/Homepage/Feed/Get",
    JSON.stringify({ keyword, exact_match }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  data = response.data.toString();
  console.log(data);

  getData();

  const paths = data.map((el) => {
    return {
      params: { postName: el.postName() },
    };
  });
};

const Test = () => {
  getData();
  return <div>Test</div>;
};

export default Test;

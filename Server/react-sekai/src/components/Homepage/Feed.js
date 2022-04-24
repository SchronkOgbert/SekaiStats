import React from 'react'
import './Feed.css'
import PostContent from './PostContent'
import { Button } from '../Button'
import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
import AuthContext from "../../context/authProvider";
import Cookies from 'js-cookie';

const PLACEHOLDER_URL = '/Homepage/Post'

const Feed = () => {

  const { setAuth } = useContext(AuthContext);

  const [postName, setPostName] = useState('');
  
  const [postUser, setPostUser] = useState('');

  const handleClickEvent = async (e) => {
    try {
        // const response = await axios.post(PLACEHOLDER_URL,
        //     JSON.stringify({postName, postUser}),
        //     {
        //         headers: { 'Content-Type': 'application/json' },
        //     }
        // );
        const response = JSON.stringify("Title", "User");

        const accessToken = response?.data?.accessToken;
        setAuth({ postName, postUser, accessToken });

        console.log("before checking response");
        console.log(response.data);
        
        Cookies.set("postTitle", "post");
        Cookies.set("postUser", "post");

        Cookies.set("postBody", "lorem30");
        Cookies.set("postDate", "4/15/2022");

        Cookies.set("embeddedHTML", "<h1>EMBEDDED HTML<h1/>");


        } catch (err) {
        console.log(err);
    }
  }

  return (
    <div className='mainContainer'>
        <div className='feedName'>
        Feed
        </div>
        <a href="/Post" onClick={handleClickEvent}>
          <PostContent postName="Title" postUser="user"/>
          <PostContent postName="Title" postUser="user"/>
          <PostContent postName="Title" postUser="user"/>
          <PostContent postName="Title" postUser="user"/>
        </a>
    </div>
  )
}

export default Feed
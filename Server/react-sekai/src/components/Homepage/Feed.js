import React from 'react'
import './Feed.css'
import PostContent from './PostContent'
import { Button } from '../Button'
import { useRef, useState, useEffect, useContext } from 'react'
import axios from '../../api/axios'
import AuthContext from "../../context/authProvider"
import Cookies from 'js-cookie'
import api from '../../api/axios'

const PLACEHOLDER_URL = '/Homepage/Post'

const Feed = () => {

  const { setAuth } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const [postName, setPostName] = useState('');
  
  const [postUser, setPostUser] = useState('');

  const [postDate, setPostDate] = useState('');

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
      const response = await axios.get(PLACEHOLDER_URL)
      setData(response.data)
      console.log("before checking response")
      console.log(response)
    
  };

  const setData = data.map(el => {
    return <PostContent postName = {el.postName} postUser = {el.postUser} postDate = {el.postDate}></PostContent>
  }) 

  const handleClickEvent = () => {
    try {
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
          {setData}
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
import Cookies from 'js-cookie'
import React from 'react'
import Background from '../Background'
import LoggedInNavbar from '../Navbar/LoggedInNavbar'
import './Post.css';

const Post = () => {

    const postTitle = Cookies.get("postTitle");
    const postUser = Cookies.get("postUser");
    const postBody = Cookies.get("postBody");
    const postDate = Cookies.get("postDate");
    const embeddedHTML = Cookies.get("embeddedHTML");

    console.log(postTitle);
    return (
        <div>
            <Background/>
            <LoggedInNavbar/>
            <div className='postData'>
                <div className='postTitle'>
                    {postTitle}
                </div>
                <div className='postUser'>
                    {postUser}
                </div>
                <div className='postBody'>
                    {postBody}
                </div>
                <div className='postDate'>
                    {postDate}
                </div>
                <iframe>
                    {embeddedHTML}
                </iframe>
            </div>
        </div>
    )
}

export default Post
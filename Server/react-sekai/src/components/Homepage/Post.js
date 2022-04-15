import React from 'react'
import './Post.css'
import PostContent from './PostContent'

const Post = () => {
  return (
    <div className='mainContainer'>
        <div className='feedName'>
        Feed
        </div>
        <PostContent postName="Title" postContent="Content"/>
        <PostContent postName="Title" postContent="Content"/>
        <PostContent postName="Title" postContent="Content"/>
    </div>
  )
}

export default Post
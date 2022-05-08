import './PostContent.css';
import React from 'react'

const PostContent = (props) => {
  return (
      <div className='postContainer'>
        <div className='postName'>
            {props.postName}
        </div>
        <div className='postUser'>
            {props.postUser}
        </div>
        <div className='postDate'>
            {props.postDate}
        </div>
        <div className='iframe'>
            {props.postIframe}
        </div>
      </div>
  )
}

export default PostContent
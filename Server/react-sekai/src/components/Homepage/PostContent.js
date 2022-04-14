import React from 'react'
import './PostContent.css'

const PostContent = (props) => {
    return (
          <div className='postContainer'>
              <div className='postName'>
                  {props.postName}
              </div>
              <div className='postContent'>
                  {props.postContent}
              </div>
          </div>
    );
  }
  
export default PostContent
import React from 'react'
import backgroundVideo from '../video/earthBackground.mp4'
import './Background.css'

const Background = () => {
  return (
    <div>
        <video autoPlay loop muted>
            <source src = {backgroundVideo} type = "video/mp4"/>
        </video>
    </div>
  )
}

export default Background

import React from 'react'
import './SearchBar.css'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => {
  return (
    <div className='searchbar'>
      Search
      <input 
        type="text"
        id="username"
      />
      <FontAwesomeIcon icon="fas fa-search" id='searchIcon'/>
    </div>
  )
}

export default SearchBar
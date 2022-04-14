import React from 'react'
import './SearchBar.css'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({placeholder}) => {
  return (
    <div className='searchbar'>
      <input 
        type="text"
        placeholder={placeholder}
      />
      <FontAwesomeIcon icon="fas fa-search" id='searchIcon'/>
    </div>
  )
}

export default SearchBar
import React, {useContext} from 'react';
import { MenuItemsLogged } from "./MenuItems";
import './Navbar.css';
import { Button } from '../Button';
import Cookies from 'js-cookie';
import setSuccess from '../Login/Login';
import SearchBar from '../Searchbar/SearchBar';
import Login from '../Login/Login';
import UserContext from '../Login/Login';


const LoggedInNavbar = () => {

  const state = { clicked: false }
  
  const handleClick = () => {
    Cookies.remove("user");
    setSuccess(false);
    this.setState({ clicked: !this.state.clicked })
  }

  const username = Cookies.get("username");

  // console.log(user);
    return(
      <nav className='NavbarItems'>
        <a href = '/Homepage'><h1 className='navbar-logo'>Sekai Stats</h1></a>
        <ul className={state.clicked ? 'nav-menu active' : 'nav-menu'}>
        <SearchBar placeholder='search chart...'/>
          {MenuItemsLogged.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
        <p>User: {username}</p>
        <a href = '/Login'>
          <Button onClick={handleClick}>Log out</Button>
        </a>
      </nav>
      
    )
  }

export default LoggedInNavbar;
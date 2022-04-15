import React from 'react';
import { MenuItemsLogged } from "./MenuItems";
import './Navbar.css'
import { Button } from '../Button';
import Cookies from 'js-cookie';
import setSuccess from '../Login/Login';
import user from '../Login/Login';
import SearchBar from '../Searchbar/SearchBar';


class LoggedInNavbar extends React.Component {

  state = { clicked: false }
  
  handleClick = () => {
    Cookies.remove("user");
    setSuccess(false);
    this.setState({ clicked: !this.state.clicked })
  }


  render(){
    return(
      <nav className='NavbarItems'>
        <a href = '/Homepage'><h1 className='navbar-logo'>Sekai Stats</h1></a>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
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
        <a href = '/Login'>
        <Button onClick={this.handleClick}>Log out</Button>
        </a>
      </nav>
      
    )
  }
}

export default LoggedInNavbar;
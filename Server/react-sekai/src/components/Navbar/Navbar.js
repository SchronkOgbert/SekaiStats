import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MenuItems } from "./MenuItems";
import './Navbar.css'
import { Button } from '../Button';


class Navbar extends React.Component {

  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }
  render(){
    return(
      <nav className='NavbarItems'>
        <Router>
          <Link to='/'><h1 className='navbar-logo'>Sekai Stats</h1></Link>
        </Router>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
        <Router>
          <Link to='/Register'>
            <Button>Sign Up</Button>
          </Link>
        </Router>
        
      </nav>
      
    )
  }
}

export default Navbar;
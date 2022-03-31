import React from 'react';
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
        <a href = '/'><h1 className='navbar-logo'>Sekai Stats</h1></a>
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
        <a href = '/Register'>
          <Button>Sign Up</Button>
        </a>
        
      </nav>
      
    )
  }
}

export default Navbar;
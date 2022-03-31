import React from 'react';
import { Button } from '../Button'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export class Login extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className="base-container" ref = {this.props.containerRef}>
               <div className="header">Login</div>
                    <div className="form">
                         <div className="form-group">
                            <label htmlFor='username'>Username</label>
                            <input type='text' name='username' placeholder='username'></input>
                        </div>
                            <div className="form-group">
                                <label htmlFor='password'>Username</label>
                                <input type='password' name='password' placeholder='password'></input>
                            </div>
                        </div>
                <div className="footer">
                    <Button>Login</Button>
                </div>
                <Link to='/Register'>
                        <Button>Register</Button>
                </Link>
            </div>
    }

    
}
import React from 'react';
import { Button } from '../Button'

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
                    <Button buttonSize>Login</Button>
                </div>
                Don't have an account?
                <a href='/Register'>
                    Register here!
                </a>
            </div>
    }
}
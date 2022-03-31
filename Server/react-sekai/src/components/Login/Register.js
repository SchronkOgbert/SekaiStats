import React from 'react';
import { Button } from '../Button'
import './style.css';

export class Register extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="base-container" ref = {this.props.containerRef}>
                <div className="header">Register</div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' placeholder='username'></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' placeholder='email'></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' placeholder='password'></input>
                    </div>
                </div>
                <div className="footer">
                    <Button>Register</Button>
                </div>
                <div className="alreadyRegistered">
                    Already have an account?
                </div>
                <a href='/Login'>
                    Login here!
                </a>
            </div>
    }
}
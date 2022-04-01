import React from 'react';
import { Button } from '../Button'
import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
import AuthContext from "../../context/authProvider";

const LOGIN_URL = '/Login/Response';

const Login = () => {

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleClick = async (e) => {
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
            }
        }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                </section>
                ) : (
                    <div>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <div className="base-container">
                        <div className="header">Login</div>
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor='username'>Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setUser(e.target.value)}
                                            value={user}
                                            required
                                        />
                                    </div>
                                        <div className="form-group">
                                        <label htmlFor='password'>Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            required
                                        />
                                        </div>
                                    </div>
                            <div className="footer">
                                <Button onClick={handleClick}>Login</Button>
                            </div>
                            Don't have an account?
                            <a href='/Register'>
                                Register here!
                            </a>
                    </div>
            </div>
            )}
        </>
    )
}

export default Login
















//     render() {
        // return <div className="base-container" ref = {this.props.containerRef}>
        //        <div className="header">Login</div>
        //             <div className="form">
        //                  <div className="form-group">
        //                     <label htmlFor='username'>Username</label>
        //                     <input type='text' name='username' placeholder='username'></input>
        //                 </div>
        //                     <div className="form-group">
        //                         <label htmlFor='password'>Username</label>
        //                         <input type='password' name='password' placeholder='password'></input>
        //                     </div>
        //                 </div>
        //         <div className="footer">
        //             <Button buttonSize>Login</Button>
        //         </div>
        //         Don't have an account?
        //         <a href='/Register'>
        //             Register here!
        //         </a>
        //     </div>
//     }
// }
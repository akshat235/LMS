import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Navigate } from 'react-router-dom'
import './Login.scss';
import bg from "../assets/libraryunsplash.jpg";
import Button from '@material-ui/core/Button';


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            login: false,
            store: null
        }
    }
    login() {
        if (this.state.username === null || this.state.password === null) {
            alert("Enter login details");
            return;
        }
        let data = {
            username: this.state.username,
            password: this.state.password,
        };
        const requestOptions = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "Accept": "application/json"
            },
            body: JSON.stringify(data),
        };
        fetch('https://localhost:7007/api/login', requestOptions)
            .then((res) => res.json())
            .then((result) => {
                if (result === "User Not Found") {
                    alert(result);
                    console.log(result);
                    return;
                }
                else {
                    this.setState({ login: true });
                    // this.props.history.push("/homepage");
                    console.log(result);
                    localStorage.setItem('login', true);
                    localStorage.setItem('Admin_token', result);
                }
            });
    }

    render() {
        {localStorage.setItem('login', false);}
        return (
            <div className='base-container' style={{
                backgroundImage: `url(${bg})`, backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className='header-main'>
                    <div className='main-title'>
                        <h1>Welcome to Book Byte! </h1>
                    </div>
                </div>
                <div>
                    {this.state.login === true ? <div className='msg-container'>
                        <div className='login-msg'>Login Successful! Welcome Back<br /></div><br />
                        <Link to="/homepage"><button className='enter-btn'>Enter</button></Link></div> : <div>
                        <div className='form-login'>
                            <div className='entries'>
                                <input className='cred-entry' placeholder=' Username' type="text" onChange={(event) => { this.setState({ username: event.target.value }) }} />
                                <input className='cred-entry' placeholder=' Password' type="password" onChange={(event) => { this.setState({ password: event.target.value }) }} />
                            </div>
                            <button onClick={() => { this.login() }}>Login</button>
                        </div></div>}
                </div>
            </div>
        )
    }
}

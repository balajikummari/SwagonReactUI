import React from 'react';
import './LoginPage.css';

import Login from '../Components/Login/login'
import Logo from '../Components/Logo/logo'
import Intro from '../Components/Intro/intro'



const LoginPage = () => {
    return(
    <div className="mycontainer">
        <Logo />
        <introJs/>
        <Login />
    </div>
    );
}
export default LoginPage;
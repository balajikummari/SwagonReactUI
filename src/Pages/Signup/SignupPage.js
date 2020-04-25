import React from 'react';
import './SignupPage.css';

import Signup from '../../Components/SignUp/signup'
import Logo from '../../Components/Logo/logo'
import Intro from '../../Components/Intro/intro'



const SignupPage = () => {
    return(
    <div className="myScontainer"> 
        <div className="LogoItem">
        <Logo/>
        </div>
        <Intro className="Intro"/>
        <div className = "SignupItem">
          <div className = "ISignupItem">
            <Signup/>
          </div>
        </div> 
    </div>
    );
} 
export default SignupPage;
import React, { Component } from "react";
import './login.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom' 

class Login extends Component  {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            id:''
        };
    } 

    handleSubmit = event => {
        event.preventDefault();
        var self=this;
        axios(
            {
            method: 'post',
            url: 'https://localhost:44374/api/User/login',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "*"
              },
            data: {
                "username": this.state.email,
                "password": this.state.password
            }
          }).then(function (response) {

            console.log("response"+JSON.stringify(response.data));
            if(response.data != "")
            {
                console.log('final email :' + self.state.email)
                console.log('final pass  :'+  self.state.password)
                window.localStorage.setItem('id',response.data);
                window.localStorage.setItem('email',self.state.email);
                self.props.history.push('/')
            }
            else{
                window.alert("User Not found.. Sign up ??")
            }
          });
    }

    handleChange = event =>{
        const {value, name } = event.target
        this.setState({[name] : value})
    }

    render(){
    return(
    <div className="LoginContainer">
        <h2>Login</h2>
        <hr></hr>
        <form onSubmit ={this.handleSubmit} class="form">
           
                <div className="form-groupe  field  ">
                    <input type="email" name="email" className="form-control " id="email" placeholder="Tonny@strak.tech" className="UserName"  value={this.state.email} onChange={this.handleChange} required />
                    <label htmlFor="email">UserName</label>
                </div>

                <div className="form-groupe field ">
                    <input name="password" type="password" className="form-control " id="PassWord" placeholder="TSECURWE"  className="PassWord" value={this.state.password} onChange={this.handleChange} required/>
                    <label htmlFor="PassWord">Password</label>
                </div>

            <div className="sbutton">
                <button type="submit" id ="LoginSubmit"className="btn grow btn-subL">Submit</button>
            </div>
            <div className="almem">New here?  <Link to="/Signup">Signup</Link></div>
        </form>
    </div>
    );
    }
}
export default withRouter(Login);

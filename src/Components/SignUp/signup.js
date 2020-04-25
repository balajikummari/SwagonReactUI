import React, { Component } from "react";
import './signup.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import { withRouter } from 'react-router-dom' 


class SignUp extends Component  {
    constructor(props){
        super(props);
        this.state = {
            Username:'',
            password:'',
            cpassword:'',
            Firstname:'',
            Phonenumber:'',
            id:''
        };
    }
     
    handleSubmit = event => {
        event.preventDefault(); 
        var self=this;
        
        if( this.state.password ==  this.state.cpassword){
            //API CALL
            {
                axios(
                    {
                    method: 'post',
                    url: 'https://localhost:44374/api/User/signup',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Acces-Control-Allow-Origin": "*"
                      },
                    data: {
                        "username": this.state.Username,
                        "password": this.state.password,
                        "Firstname": this.state.Firstname,
                        "Phonenumber": this.state.Phonenumber,
                    }
                  }).then(function (response) {
                      if(response.data != null){
                        self.props.history.push('/login')
                      }
                      else{
                          window.alert("something went wrong")
                      }
                  }).catch(error => {
                   window.alert(error.response.data)
                  });
            }
        }
        else{
            window.alert("passwords Didnot match")
        }
    }

    handleChange = event =>{
        const {value, name } = event.target
        this.setState({[name] : value})
        console.log(name +":"+ value)
    }

    render(){
    return(
        <div className="SignupContainer">
            <h2>Signup</h2>
            <hr></hr>
            <form onSubmit ={this.handleSubmit}  class="form">
               <div className="form-groupe  field  ">
                 <input type="text" name="Firstname" className="form-control" id="Fullname" placeholder="Tonny strak"  className="Fullname"   onChange={this.handleChange} required />
                    <label htmlFor="Fullname">Full Name</label>
                </div>


                <div className="form-groupe  field  ">
                 <input type="text" name="Phonenumber" className="form-control" id="Phonenumber" placeholder="879089203"  className="Phonenumber"  onChange={this.handleChange} required />
                    <label htmlFor="Phonenumber">PhoneNumber</label>
                </div>
 
                <div className="form-groupe  field  ">
                 <input type="email" name="Username" className="form-control" id="Username" placeholder="Tonny@strak.tech"  className="Username" onChange={this.handleChange} required />
                    <label htmlFor="Username">Username</label>
                </div>

                <div className="form-groupe field ">
                    <input name="password" type="password" className="form-control PassWord" id="PassWord" placeholder="TSECURWE"  className="PassWord" value={this.state.password} onChange={this.handleChange} required />
                    <label htmlFor="PassWord">Password</label>
                </div>

                    <div className="form-groupe field ">
                        <input name="cpassword" type="password" className="form-control CPassWord" id="CPassWord" placeholder="prove youe memmory" className="CPassWord" value={this.state.cpassword} onChange={this.handleChange} required/>
                        <label htmlFor="CPassWord">Conform Password</label>
                    </div>
                <div  className="sbutton">
                    <button type="submit" id = "submitButton" className="btn grow btn-subS">Submit</button>
                </div>
                <div className="almem">Alredy a member? <Link to="/login">login</Link></div>
            </form>
        </div>
        );
    }
}
export default withRouter(SignUp);

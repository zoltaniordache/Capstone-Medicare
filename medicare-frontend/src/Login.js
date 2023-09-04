import React, { useState, useEffect } from "react";

import { login } from './repository';
import {Link,useNavigate} from 'react-router-dom';

export default class Login extends React.Component{

  constructor() {
    super();
    this.state = { username: '', password: '' };
  
  }
  
//   handleInputChange = (event) => 
//             {this.setState({[event.target.name]: event.target.value});
// console.log(event.target.value);
// }
         
  
  submitLogin =async(event) => {
    event.preventDefault();
    console.log( this.state);
    //event.preventDefault();
    let result = await login(this.state);
        console.log(result);
   // let navigate = useNavigate();
   
      try{
       
        //console.log(result.data);
        if(result=="Admin Success"){
           // navigate("/categories");
         
            localStorage.setItem('user',JSON.stringify(this.state ))
            //console.log(this.state );
            this.successMsg="Admin Successfully loged in";
            window.location = '/inventory'
     
        }else if(result=="Customer success"){
            // navigate("/Customer");
            
            localStorage.setItem('user', JSON.stringify(this.state ) )
            this.successMsg="Customer "+this.state.username+ " successfully loged in";
            window.location = '/productlist'
        }else{
          this.errorMsg = result
          console.log(this.errorMsg);
        }
        }catch(err){
          this.errorMsg = err.message;
        }
  }

  render() {
     return (
      <div className="container">
      <hr/>
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading"><h3>Log in </h3></div>
            <div className="panel-body">
              <form onSubmit={this.submitLogin}>
                <div className="form-group">
                  <label>Username:</label>
                  <input type="text" className="form-control" 
                      id="username" onChange={e=>this.state.username=e.target.value}/>
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" 
                      id="password" onChange={e=>this.state.password=e.target.value}/>
                </div>
                <button type="submit" id = "submitButton" className="btn btn-success">Submit</button>
                <div className="text-center text-danger">{this.errorMsg}</div>
                    <div className="text-center text-success">{this.successMsg}</div>
              <div className="form-group text-center">
                Don't have an account? <Link to="/register">Register here!</Link> <br />
              </div>
            
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
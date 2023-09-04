import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
let [username,setUSername]=useState("");
let [password,setPassword]=useState("");


const [errorMsg, setErrorMsg] = useState("");
let navigate = useNavigate();
let handleSubmitButton=async (event)=> {
    event.preventDefault();
    const user = {"username":username,"password":password};
    try{
    let result = await axios.post("http://localhost:8081/user/signin",user);
    //console.log(result.data);
    if(result.data=="Admin Success"){
        navigate("/categories");
        localStorage.setItem('user',JSON.stringify(user))
        console.log(user);
       
 
    }else if(result.data=="Customer success"){
        navigate("/Customer");
        localStorage.setItem('user', user)
    }else{
      setErrorMsg(result.data);
    }
    }catch(err){
      setErrorMsg(err.message);
    }
}
return (
    <>
      <div className="d-flex h-100">
        <div className="card container col-10 col-sm-10 col-md-9 col-lg-8 mt-5 p-0 align-self-center border-primary">
          <div className="card-header border-darks">
            <div className="mt-2 text-center">
              <h3>MediCare</h3>
              <h4>Welcome Back!</h4>
            </div>
          </div>
          <div className="card-body">
            <div className="container align-self-center">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input  name="username" onChange={e=>setUSername(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email Address"/><br/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
             <input  name="password" onChange={e=>setPassword(e.target.value)}
               type="password"
               className="form-control"
               id="exampleInputPassword1"
               placeholder="Password"/><br/>
              </div>
              <div className="text-center text-danger">{errorMsg}</div>
              <div className="form-group mt-4">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleSubmitButton}>
                  Login
                </button>
              </div>
              <div className="form-group text-center">
                Don't have an account? <Link to="/register">Register here!</Link> <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default Login;
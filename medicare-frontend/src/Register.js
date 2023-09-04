import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {
 let [username,setUSername]=useState("");
 let [password,setPassword]=useState("");
 let [firstName,setfirstName]=useState("");
 let [lastName,setlastName]=useState("");
 let [contactNumber,setcontactNumber]=useState("");

 let [user, setValues] = useState({
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  contactNumber: ""
});

const [errorMsg, setErrorMsg] = useState("");
const [successMsg, setSuccessMsg] = useState("");


let navigate = useNavigate();
let handleSubmission=async (event)=> {
    event.preventDefault();
    let values = {"username":user.username,"password":user.password,"firstName":user.firstName,"lastName":user.lastName,"contactNumber":user.contactNumber};
    console.log(values);
    if (
      user.username &&
      user.password &&
      user.firstName &&
      user.lastName &&
      user.contactNumber
    )
    {
    try{
    let result = await axios.post("http://localhost:8081/user/signup",values);
    //console.log(result.data);
    if(result.data=="User Created"){
      setSuccessMsg("Registration done successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/register");
      }, 3000);
       

    }else  {
      setErrorMsg(result.data);
      setTimeout(() => {
        setErrorMsg("");
        navigate("/register");
      }, 3000);
     
    
    }
    }catch(ex){
        console.log(ex.message);
    }
  }
  else{
    setErrorMsg("Please fill all the required fields!");
  }
}
return (
    <>
      <div className="d-flex h-100">
        <div className="card container col-10 col-sm-10 col-md-9 col-lg-8 mt-2 p-0 align-self-center border-success">
          <div className="card-header border-dark">
            <div className="mt-2 text-center">
              <h3>MediCare</h3>
              <h4>Register</h4>
            </div>
          </div>
          <div className="card-body">
            <div className="container align-self-center">
             
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  value={user.username}
                  aria-describedby="emailHelp"
                  placeholder="Email Address"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, username: event.target.value }))
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={user.password}
                  placeholder="Password"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, password: event.target.value }))
                  }
                />
              </div>
			   <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={user.firstName}
                  placeholder="First Name"
                  onChange={(event) => setValues((prev) => ({ ...prev, firstName: event.target.value }))}
                />
              </div>
			 
			   <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={user.lastName}
                  placeholder="Last Name"
                  onChange={(event) => setValues((prev) => ({ ...prev, lastName: event.target.value }))}
                />
              </div>
			   <div className="form-group">
                <label htmlFor="name">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  value={user.contactNumber}
                  placeholder="Contact Number"
                  onChange={(event) =>setValues((prev) => ({ ...prev, contactNumber: event.target.value }))
                }
                />
              </div>
              
              <div id = "errorMsg" className="text-center text-danger"value = {errorMsg}>{errorMsg}</div>
              <div id ="succesMsg" className="text-center text-success"value = {successMsg}>{successMsg}</div>
              <div className="form-group mt-4">
                <button
                  type="submit"
                  onClick={handleSubmission}
                  id ="submitButton"
                  className="btn btn-success btn-block">
                  Register
                </button>
              </div>
              <div className="form-group text-center">
                Already have an account? <Link to="/">Login here!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
                }
export default Register;
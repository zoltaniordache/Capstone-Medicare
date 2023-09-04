import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminSideBar(props) {
  const [userName, setUserName] = useState("");
  const [user, setUser] =  useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log(loggedInUser);
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);  
      console.log("login  found")
      setUserName(foundUser.username);
    
    }
    else{
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);  
      console.log("login not found")
      navigate("/");
    }
   
    //localStorage.clear();
  }, []);



  const handleLogout = () => {
    
    console.log("Logout initiated")
    // setUser({});
     localStorage.removeItem('user');
     console.log(localStorage.getItem("user"));
     window.location = '/';
   
  };
  return (
    <>
      <div className="sidebar">
        <div className="scrollbar-inner sidebar-wrapper">
          <div className="user">
            <div className="photo">
              <img src={`assets/img/profile4.jpg`} />
            </div>
            <div className="info">
              <a>
                <span>
                  {userName != "" ? userName : "Username"}
                  <span className="user-level">Administrator</span>
                </span>
              </a>
            </div>
          </div>
          <ul className="nav">
          
            <li className="nav-item">
              <Link to="/inventory">
                <i className="la la-ambulance"></i>
                <p>Inventory</p>
              </Link>
            </li>
            <li className="nav-item" >
              <Link to="/categories" id="categories">
                <i className="la la-align-justify"></i>
                <p>Catgories</p>
              </Link>
            </li>
           
        
            <li className="nav-item">
              <Link onClick={handleLogout}>
                <i className="la la-power-off"></i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
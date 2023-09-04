import React, { useState, useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom';
 import AdminHeader from "./AdminHeader";
 import AdminSideBar from "./AdminSideBar";
 import AdminFooter from "./AdminFooter";
import axios from 'axios';

export default function Category(props) {
  var counter = 1;
  const [user, setUser] =  useState([]);
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  //const categoriesCollectionReference = collection(db, "medicine_categories");
  const getCategories = async () => {
    const result = await axios.get("http://localhost:8081/categories");
    setCategories(result.data);
   // console.log(result);
    //console.log(categories);
  };
   const handleDeleteButton = async (cid) => {
     //console.log(cid);
    const result = await axios.delete("http://localhost:8081/categories/delete/"+cid);
    getCategories();
   };
  useEffect(() => {
    // const loggedInUser = JSON.parse(localStorage.getItem("user"));
    // console.log(loggedInUser);
    // if (loggedInUser) {
    //   const foundUser = loggedInUser;
    //   setUser(foundUser);  
    //   console.log("login  found")
    
    
    // }
    // else{
    //   const foundUser = JSON.parse(loggedInUser);
    //   setUser(foundUser);  
    //   console.log("login not found")
    //   navigate("/");
    // }
    getCategories();
    //localStorage.clear();
  }, []);
  return (
    <>
      <AdminHeader />
      <AdminSideBar /> 
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Product Categories</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">
                      Categories List{" "}
                      <Link to="/addcategory" className="btn btn-primary btn-sm float-right">
                        Add new Category
                      </Link>{" "}
                    </h4>
                  </div>
                  <div className="card-body ">
                    <div className="table-full-width px-5 py-4 table-striped">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((category) => {
                            return (
                              <tr>
                                <td>{counter++}</td>
                                <td>{category.categoryname}</td>
                                <td className="td-actions">
                                  <div className="form-button-action">
                                    <Link to="/updatecategory">
                                      <button
                                        type="button"
                                        className="btn btn-link btn-success"
                                        onClick={() => {
                                          localStorage.setItem(
                                            "category_obj",
                                            JSON.stringify(category)
                                          );
                                        }}>
                                        <i className="la la-edit"></i>
                                      </button>
                                    </Link>
                                    <button
                                      type="button"
                                       onClick={() => {
                                         handleDeleteButton(category.cid);
                                      }}
                                      className="btn btn-link btn-danger">
                                      <i className="la la-times"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         <AdminFooter /> 
      </div>
    </>
  );
}

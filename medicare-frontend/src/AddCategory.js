import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import AdminFooter from "./AdminFooter";

function AddCategory() {
// let [username,setUSername]=useState("");
// let [password,setPassword]=useState("");
// let [firstname,setfirstname]=useState("");
// let [lastname,setlastname]=useState("");
// let [contactnumber,setcontactnumber]=useState("");
   

const [errorMsg, setErrorMsg] = useState("");
const [successMsg, setSuccessMsg] = useState("");
const [categoryname, setCategoryname] = useState("");

let navigate = useNavigate();


const handleAddCategory = async () => {
  if (categoryname) {
    setErrorMsg("");
    let category = {"categoryname":categoryname};
    let result = await axios.post("http://localhost:8081/categories/add",category);
    if(result.data=="Category Created"){
      setSuccessMsg("Category  created successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/categories");
      }, 3000);
       

    }else  {
      setErrorMsg("Category already exists!");
      setTimeout(() => {
        setErrorMsg("");
        navigate("/categories");
      }, 3000);
     
    
    }
  } else {
    setErrorMsg("Category name required!");
  }
};




return (
  <>
    {/* <AdminHeader />*/}
    <AdminSideBar /> 
    <div className="main-panel">
      <div className="content">
        <div className="container-fluid">
          <h4 className="page-title">Create Category</h4>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    New Category Details
                    <Link to="/categories" className="btn btn-danger btn-sm float-right">
                      Go BACK
                    </Link>{" "}
                  </div>
                </div>
                <div className="card-body px-4">
                  <div className="form-group">
                    <label htmlFor="name">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={categoryname}
                      id="categoryname"
                      onChange={(event) => {
                        setCategoryname(event.target.value);
                      }}
                      placeholder="Enter Category Name"
                    />
                  </div>
                </div>
                <div className="form-group px-4 mb-3">
                <div id = "errorMsg" className="text-center text-danger"value = {errorMsg}>{errorMsg}</div>
              <div id ="succesMsg" className="text-center text-success"value = {successMsg}>{successMsg}</div>
                  <button className="btn btn-primary mx-3" id = "addCategoryButton" onClick={handleAddCategory}>
                    Add Category
                  </button>
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
export default AddCategory;
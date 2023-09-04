import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import AdminFooter from "./AdminFooter";

// import { db } from "../firebase";
// import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import axios from 'axios';
export default function Inventory() {
  
  var counter = 1;
  const [products, setProducts] = useState([]);
  //const categoriesCollectionReference = collection(db, "Product_categories");
  const getProducts = async () => {
    const result = await axios.get("http://localhost:8081/products");
    setProducts(result.data);
};

  const handleDeleteButton = async (pid) => {
  //  console.log(cid);
   const result = await axios.delete("http://localhost:8081/products/delete/"+pid);
   getProducts();
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
   <AdminHeader />
   <AdminSideBar /> 
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Product Inventory</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">
                      Inventory List{" "}
                      <Link to="/addproduct" className="btn btn-primary btn-sm float-right">
                        Add new Product
                      </Link>{" "}
                    </h4>
                  </div>
                  <div className="card-body ">
                    <div className="table-full-width px-5 py-4 table-striped">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>
                              Product Name
                            </th>
							 <th>Product Brand</th>
							 <th>Product Category</th>
                            <th>Product Description</th>
                            <th>Product Quantity</th>
                            <th>Product Price</th>
                            <th>Product Image</th>
							
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => {
                            return (
                              <tr>
                                <td>{counter++}</td>
                                <td>
                                  {product.name}
                                   {/* <sup>{Product.power}</sup> */}
                                </td>
                                <td>{product.brand}</td>
								   <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td>E{product.quantity}</td>
                                <td>{product.price}</td>
								  <td>
                                  <img height="100px" width="100px" src={product.productImage} ></img>
                                  </td>
								 
                                <td className="td-actions">
                                  <div className="form-button-action">
                                    <Link to="/updateproduct">
                                      <button
                                        type="button"
                                        className="btn btn-link btn-success"
                                        onClick={() => {
                                          localStorage.setItem(
                                            "product_obj",
                                            JSON.stringify(product)
                                          );
                                        }}>
                                        <i className="la la-edit"></i>
                                      </button>
                                    </Link>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleDeleteButton(product.pid);
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
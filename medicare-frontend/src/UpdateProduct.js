import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import AdminFooter from "./AdminFooter";
import axios from 'axios';


export default function UpdateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  //const categoriesCollectionReference = collection(db, "product_categories");
  const getCategories = async () => {
    const result = await axios.get("http://localhost:8081/categories");
    setCategories(result.data);
    console.log(result);
    console.log(categories);
  };
  
  useEffect(() => {
    getCategories();
    
  }, []);
  
  const [product, setProduct] = useState(JSON.parse(localStorage.getItem("product_obj")));

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const handleUpdateProduct = async () => {
    if (
        product.name &&
        product.brand &&
        product.category&&
        product.description &&
        product.price &&
        product.quantity &&
        product.productImage
      ) {
       
        let values = {"name": product.name,
        "brand": product.brand,
        "categoryid": product.categoryid,
        "description": product.description,
        "quantity": product.quantity,
        "price": product.price,
        "productImage": product.productImage};
        let result = await axios.put("http://localhost:8081/products/update/"+product.pid,values);
      setErrorMsg("");
      setSuccessMsg("Product updated Successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/inventory");
      }, 1000);
    } else {
      setErrorMsg("Please fill out all the required fields!");
    }
  };
  return (
    <>
      <AdminHeader />
    <AdminSideBar /> 
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Change Product</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      Edit Product Details
                      <Link to="/inventory" className="btn btn-danger btn-sm float-right">
                        Go BACK
                      </Link>{" "}
                    </div>
                  </div>
                  <div className="card-body px-4">
                    <div className="form-group">
                      <label htmlFor="name">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product.name}
                        id="name"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Enter Product Name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="power">Product Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product.brand}
                        id="brand"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, brand: event.target.value }))
                        }
                        placeholder="Enter Product Power"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">Product Category</label>
                      <select
                        class="form-control"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, categoryid: event.target.value }))
                        }
                        id="exampleFormControlSelect1">
                        <option value="">Select a Category...</option>
                        {categories.map((category) => {
                          if (category.name === product.category) {
                            return (
                              <option value={category.cid} selected="true">
                                {category.categoryname}
                              </option>
                            );
                          } else {
                            return <option value={category.cid}>{category.categoryname}</option>;
                          }
                        })}
                      </select>
                    </div>
                  <div className="form-group">
                      <label htmlFor="power">Product Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product.description}
                        id="description"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, description: event.target.value }))
                        }
                        placeholder="Enter Product Power"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Product Price (in E.)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product.price}
                        id="price"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, price: event.target.value }))
                        }
                        placeholder="Enter Product Price"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="quantity">Product Quantity</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product.quantity}
                        id="quantity"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, quantity: event.target.value }))
                        }
                        placeholder="Enter Product Quantity"
                      />
                    </div>
					 <div className="form-group">
                      <label htmlFor="productImage">Product Image Source</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product.productImage}
                        id="productImage"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, productImage: event.target.value }))
                        }
                        placeholder="Enter Product Image Source"
                      />
                    </div>
                  </div>
				  

                  <div className="form-group px-4 mb-3">
                    <div className="text-center text-danger">{errorMsg}</div>
                    <div className="text-center text-success">{successMsg}</div>
                    <button className="btn btn-success mx-3" onClick={handleUpdateProduct}>
                      Update Product
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
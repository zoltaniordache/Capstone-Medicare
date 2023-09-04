import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import AdminFooter from "./AdminFooter";
import axios from 'axios';

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  //const categoriesCollectionReference = collection(db, "medicine_categories");
  const getCategories = async () => {
    const result = await axios.get("http://localhost:8081/categories");
    setCategories(result.data);
    console.log(result);
    console.log(categories);
  };

  useEffect(() => {
    getCategories();
    
  }, []);
  //const medicinesCollectionRef = collection(db, "medicine_inventory");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    categoryid: "",
    description: "",
    quantity:"",
    price: "",
    productImage: "",
  });
  const handleAddProduct = async () => {
    if (
      product.name &&
      product.brand &&
      product.categoryid &&
      product.description &&
      product.quantity&&
      product.price &&
      product.productImage
    ) {
      setErrorMsg("");
      let values = {"name": product.name,
        "brand": product.brand,
        "categoryid": product.categoryid,
        "description": product.description,
        "quantity":product.quantity,
        "price": product.price,
        "productImage": product.productImage};
        console.log(values);
      let result = await axios.post("http://localhost:8081/products/add",values) ;
       console.log(result);
      if(result.data == "Product Saved Successfully"){
      setSuccessMsg("Product added successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/inventory");
      }, 1000);
    } else {
        setErrorMsg("Product failed to be added!");
    }
}
    else {
      setErrorMsg("Please fill out all the required fields!");
    }
  };
  return (
    <>
       {/* <AdminHeader />*/}
    <AdminSideBar /> 
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Create Product</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      New Product Details
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
                      <label htmlFor="pobrandwer">Product Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product.brand}
                        id="brand"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, brand: event.target.value }))
                        }
                        placeholder="Enter Product Brand"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">Product Category</label>
                      <select id="categoryname"
                        class="form-control"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, categoryid: event.target.value }))
                        }
                        >
                        <option  value="">Select a Category...</option>
                        {categories.map((category) => {
                          return <option value={category.cid}>{category.categoryname}</option>;
                        })}
                      </select>
                    </div>
                     {/* <div class="form-group">
                       <label for="exampleFormControlSelect2">Product description</label>
                       <select
                         class="form-control"
                         onChange={(event) =>
                           setProduct((prev) => ({ ...prev, description: event.target.value }))
                         }
                         id="exampleFormControlSelect2">
                         <option value="">Select a Type...</option>
                         {medTypes.map((medType) => {
                           return <option value={medType.name}>{medType.name}</option>;
                         })}
                      </select> 
                     </div>*/}
					     <div className="form-group">
                      <label htmlFor="description">Product Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product.description}
                        id="description"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, description: event.target.value }))
                        }
                        placeholder="Enter Product Description"
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
                      <label htmlFor="price">Product Price (in E)</label>
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
                      <label htmlFor="productImage">Product Image</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product.productImage}
                        id="productImage"
                        onChange={(event) =>
                          setProduct((prev) => ({ ...prev, productImage: event.target.value }))
                        }
                        placeholder="Enter Product Stock"
                      />
                    </div>
                  </div>

                  <div className="form-group px-4 mb-3">
                  <div id = "errorMsg" className="text-center text-danger"value = {errorMsg}>{errorMsg}</div>
              <div id ="succesMsg" className="text-center text-success"value = {successMsg}>{successMsg}</div>
                    <button className="btn btn-primary mx-3" id ="addProductButton" onClick={handleAddProduct}>
                      Add Product
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
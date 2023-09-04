import React from 'react';
import ProductItem from './ProductItem';
import { getProducts,getCategories,getProductsByCategory,getProductByValue } from './repository';
import { Link } from 'react-router-dom';
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import AdminFooter from "./AdminFooter";
export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    products: [], categories:[]
    }
  }

  componentDidMount() {
    getProducts().then((products) =>this.setState({ products }));
    getCategories().then((categories) =>this.setState({ categories }));
  }

async filterByCategory(category){
  this.setState({products: []});
  getProductsByCategory(category).then((products) =>this.setState({ products })).catch(err => console.log(err));;

}
async searchByValue(value){
  this.setState({products: []});
  getProductByValue(value).then((products) =>this.setState({ products })).catch(err => console.log(err));;

}

 sortByPriceLowToHigh =async() => {
  let sortedproducts =await  getProducts();
  //console.log(products);
  sortedproducts.sort((a, b) => a.price - b.price);
  //console.log(this.state.products);
  this.setState({ products : sortedproducts });
  
 
}
sortByPriceHighToLow =async() => {
  let sortedproducts =await  getProducts();
  //console.log(products);
  sortedproducts.sort((a, b) => b.price - a.price);
  //console.log(this.state.products);
  this.setState({ products : sortedproducts });
  
 
}
sortByNameAscending =async() => {
  let sortedproducts =await  getProducts();
  //console.log(products);
  sortedproducts.sort((a, b) => a.name.localeCompare(b.name));
  //console.log(this.state.products);
  this.setState({ products : sortedproducts });
  
 
}
sortByNameDescending =async() => {
  let sortedproducts =await  getProducts();
  //console.log(products);
  sortedproducts.sort((a, b) => b.name.localeCompare(a.name));
  //console.log(this.state.products);
  this.setState({ products : sortedproducts });
  
 
}

  render() {
    const { products,categories } =  this.state;
   // console.log(products);
    return (
     


      <div>
      

      <div>
<AdminHeader />
</div>
  
     
      <div className=" container">

        <h3 className="card-title">List of Available Products</h3><hr/>
      

       <div class="form-group">
                    <span class="float-left mt-2"><a class="btn btn-info btn-sm dropdown-toggle" href="#"
                    data-toggle="dropdown" role="button">
                    Sort by
                </a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" role="button" onClick={this.sortByPriceLowToHigh} >Price: Low To High</a>
                    <a class="dropdown-item" role="button" onClick={this.sortByPriceHighToLow}>Price: High To Low</a>
                    <a class="dropdown-item" role="button" onClick={this.sortByNameAscending}>Name: A-Z</a>
                    <a class="dropdown-item" role="button" onClick={this.sortByNameDescending}>Name: Z-A</a>
                </div>
            </span>
         </div>
 
           <br></br>
        <div class="form-group">
                      <label for="exampleFormControlSelect1">Product Category</label>
                      <select
                        class="form-control"
                         onChange={(event) =>
                           this.filterByCategory( event.target.value)
                        }
                        id="exampleFormControlSelect1">
                        <option value="">Filter by a Category...</option>
                        {categories.map((category) => {
                          return <option value={category.cid}>{category.categoryname}</option>;
                        })}
                      </select>
                      <div class="col-6">
              <input type="text" class="form-control" id = "search" placeholder="Search medicine, health products and more..."></input>
              <button className="btn btn-sm btn-info" 
                onClick={(event) =>this.searchByValue(document.getElementById('search').value)}>Search</button>
                
          </div>
          
                    </div>

                    
          
   
       
                    { !products.length ?<h3 className="text-warning">No item found</h3>: ''}
      {products.map((product, index) => <ProductItem product={product} key={index} categories ={categories}/>)}
        <hr/>
        <Link to="/checkout">
          <button className="btn btn-success float-right">Checkout</button>
        </Link>
        <Link to="/cart">
          <button className="btn btn-primary float-right" 
              style={{  marginRight: "10px" }}>View Cart</button>
        </Link><br/><br/><br/>
      </div>
      </div>
    );
  }
}
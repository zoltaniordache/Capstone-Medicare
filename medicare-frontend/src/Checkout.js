import React from 'react';
import { getCartProducts,getProducts } from './repository';
import CartItem from './CartItem';
    import {  Redirect, Link } from 'react-router-dom';
    
    export default class Checkout extends React.Component {
      constructor(props) {
      super(props);
        this.state = { products: [], total: 0 }
      }
    
      async  componentDidMount() {
        let productsAll = await getProducts();
      let products = [], id = null;
        let cart = JSON.parse( localStorage.getItem('cart'));
      // console.log(cart);
               if (!cart) return; 
        //console.log(productsAll);
        for (var i = 0; i < productsAll.length; i++) {
          id = productsAll[i].pid.toString();
          
          if (cart.hasOwnProperty(id)) {
            let myproducts ={pid : '',quantity:''};
            myproducts = {pid : id,quantity:cart[id].toString()};
            console.log(myproducts);
            let myproduct = await getCartProducts(myproducts);
          
            products.push(myproduct);
            
          }
        }
        let total = 0;
        console.log(products);
        for (var i = 0; i < products.length; i++) {
              total += products[i].price * products[i].quantity;
             }
             

             this.setState({ products, total });
     
      }
    
     pay() {
         console.log("Payed")
        this.successMsg="Payment Succesfully";
        console.log(this.successMsg)
    }
    
      render() {
       
        const { products, total } =  this.state;
        return (
        <div className=" container">
          <h3 className="card-title">Checkout</h3><hr/>
          { products.map((product, index) => 
              <div key={index}>
              <p>{product.name} <small> (quantity: {product.quantity})</small>
                 <span className="float-right text-primary">${product.quantity * product.price}
              </span></p><hr/>
              </div>
          )} <hr/>
          { products.length ? 
          <div><h4><small>Total Amount:</small><span className="float-right text-primary">
                ${total}</span></h4><hr/></div>: ''}
          { !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
          { products.length ? <button className="btn btn-success float-right" 
                onClick={this.pay}>Pay</button>: '' }
          <Link to="/"><button className="btn btn-danger float-right" 
            style={{ marginRight: "10px" }}>Cancel</button></Link><br/><br/><br/>
             <div className="text-center text-success">{this.successMsg}</div>
        </div>
        );
      }
    }

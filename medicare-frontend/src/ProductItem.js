import React, { useState, useEffect } from "react";

export default class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quantity: 1}
    
  }
  

  handleInputChange = event => 
  this.setState({[event.target.name]: event.target.value})

  addToCart = () => {
    let cart = localStorage.getItem('cart') 
                  ? JSON.parse(localStorage.getItem('cart')) : {};
    let id = this.props.product.pid.toString();
    cart[id] = (cart[id] ? cart[id]: 0);
    let qty = cart[id] + parseInt(this.state.quantity);
    if (this.props.product.quantity < qty) {
      cart[id] = this.props.product.quantity; 
    } else {
      cart[id] = qty
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
 
  // addToCart = () => {
  //   //let cartJSON =  {"pid":null,"quantity":null};
  //   let cart = localStorage.getItem('cart') 
  //                 ? JSON.parse(localStorage.getItem('cart')) : {};
  //   let id = this.props.product.pid.toString();
    
  //   cart[id] = (cart[id] ? cart[id]: 0);
  //   let qty = cart[id] + parseInt(this.state.quantity);
  //   if (this.props.product.quantity < qty) {
  //     cart[id] = this.props.product.quantity; 
  //   } else {
  //     cart[id] = qty
  //   }
  //   // cartJSON = {"pid":id,"quantity":cart[id]};
  //  // localStorage.setItem('cartJSON',JSON.stringify(cartJSON));
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   console.log(localStorage.getItem('cart'));
  //  // console.log(localStorage.getItem('cartJSON'));
    
  // }

  render(){
    const { product,categories } = this.props;
    //console.log(categories);
    return (
     <div className="card" style={{ marginBottom: "10px"}}>
       <div className="card-body">
         <h4 className="card-title">{product.name}</h4>
         <p className="card-text">{product.description}</p>
         <h5 className="card-text"><small>price: </small>${product.price}</h5>
         <h5 className="card-text"><small>Category: </small>{product.category}</h5>
         <span className="card-text">
           <small>Available Quantity: </small>{product.quantity}
         </span>
         
         { product.quantity > 0 ?
          <div>
             <button className="btn btn-sm btn-warning float-right" 
                onClick={this.addToCart}>Add to cart</button>
             <input type="number" value={this.state.quantity} name="quantity" 
                onChange={this.handleInputChange} className="float-right" 
                style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
          </div> : 
          <p className="text-danger"> product is out of stock </p>
        }
      </div>
    </div>
   )
 }
}
import React from 'react';
    import { Link } from 'react-router-dom';
    import { getCartProducts,getProducts } from './repository';
    import CartItem from './CartItem';
    import AdminHeader from "./AdminHeader";
      
  
    export default class Cart extends React.Component {
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

       
      
      
    
      removeFromCart = (product) => {
        let products = this.state.products.filter((item) => item.pid !== product.pid);
        let cart = JSON.parse(localStorage.getItem('cart'));
        delete cart[product.pid.toString()];
        localStorage.setItem('cart', JSON.stringify(cart));
        let total = this.state.total - (product.quantity * product.price) 
        this.setState({products, total});
      }
    
      clearCart = () => {
        localStorage.removeItem('cart');
        this.setState({products: []});
      }
    
      render() {
        const { products, total } =  this.state;
        console.log(products.data);
        return (
      
          <div className=" container">
           
                <div>
        
          </div>
            <h3 className="card-title">Cart</h3>
            {
              products.map((product, index) => 
                <CartItem product={product} remove={this.removeFromCart} key={index}/>)
            } 
            { products.length ? 
              <div><h4>
                <small>Total Amount: </small>
                <span className="float-right text-primary">${total}</span>
              </h4></div>: ''}
            { !products.length ?<h3 className="text-warning">No item on the cart</h3>: ''}
            <Link to="/productlist">
                <button className="btn btn-info float-right">Continue Shopping</button></Link>
            <Link to="/checkout">
                <button className="btn btn-success float-right">Checkout</button></Link>
           
            <button className="btn btn-danger float-right" onClick={this.clearCart} 
                style={{ marginRight: "10px" }}>Clear Cart</button><br/><br/><br/>
          </div>
        );
      }
    }
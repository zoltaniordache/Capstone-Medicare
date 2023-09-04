  import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export function getProducts() {
        return axios.get(`${BASE_URL}/products`)
                .then(response => response.data);
}
export function getProductByValue(value) {
        return axios.get(`${BASE_URL}/products/products-by-value/`+value)
                .then(response => response.data);
}
export function getProductsByCategory(category) {
        console.log(category);
        return axios.get(`${BASE_URL}/products/products-by-category/`+category)
                .then(response => response.data) ;
}
export function getCategories() {
    return axios.get(`${BASE_URL}/categories`)
            .then(response => response.data);
}
export function getCartProducts(cart) {
        
     
     // console.log("getCartProducts");
        
      //   console.log(JSON.stringify(cart));
        
          
         return axios.post(`${BASE_URL}/products`, cart)
                 .then(response => response.data);
}
export function login (data) {
   
    const user = {"username":data.username,"password":data.password};
    //console.log(user);
    return  axios.post(`${BASE_URL}/user/signin`, user).then(response => response.data) 



}
// export function pay (data) {
//         return axios.get(`${BASE_URL}/api/pay`, 
//             { params: { 'x-access-token': localStorage.getItem('x-access-token')} })
//                 .then(response => response.data)
//                 .catch(err => Promise.reject(err));
// }
// export function isAuthenticated(){
//         return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
// }
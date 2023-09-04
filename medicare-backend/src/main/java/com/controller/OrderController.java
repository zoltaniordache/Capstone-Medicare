package com.controller;

import java.text.DateFormat;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.criteria.Order;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//import com.config.ImageUtil;
//import com.bean.CartItem;
//import com.bean.CartOrder;
import com.bean.Product;
//import com.bean.ProductImage;

import com.bean.CartItem;
import com.bean.CartOrder;
import com.bean.Orders;
import com.service.ProductService;
import com.service.OrderService;

@RestController
@CrossOrigin(origins = "*")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private ProductService productService;
	

	@PostMapping("/user/create/order")
	public ResponseEntity<?> createOrder(@Valid @RequestBody Orders cartOrder){
		
		Orders newOrder = new Orders();
		newOrder.setUsername(cartOrder.getUsername());
		newOrder.setFirstName(cartOrder.getFirstName());
		newOrder.setLastName(cartOrder.getLastName());
		newOrder.setAddress(cartOrder.getAddress());
		newOrder.setDistrict(cartOrder.getDistrict());
		newOrder.setState(cartOrder.getState());
		newOrder.setContact(cartOrder.getContact());
		newOrder.setPinCode(cartOrder.getPinCode());
		
		DateFormat df = DateFormat.getDateInstance();
		Calendar cl = Calendar.getInstance();
		String orderDate = df.format(cl.getTime());
		newOrder.setDate(orderDate);
		newOrder.setStatus("PLACED");
		newOrder.setPaidAmount(cartOrder.getPaidAmount());
		newOrder.setPaymentMode(cartOrder.getPaymentMode());
		Set<Product> product  = cartOrder.getProducts();
		
//		for(Product item : product) {
//			Product result = this.productService.findProduct(item.getPid());
//			result.setQuantity(result.getQuantity()-1);
//		}
		
		
		Orders orderCreated = this.orderService.saveOrder(newOrder);
		return ResponseEntity.ok(orderCreated);
	}
	

	@GetMapping("/get/all/orders")
	public ResponseEntity<?> getAllOrders(){
		List<Orders> orders = this.orderService.getAll();
		return ResponseEntity.ok(orders);
	}
	
	
	@GetMapping("/get/orders/{username}")
	public ResponseEntity<?> orders(@PathVariable("username") String username){
		List<Orders> orders = this.orderService.getOrders(username);
		if(orders.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}else {
			return ResponseEntity.ok(orders);
		}
	}
	

	@GetMapping("/get/order-invoice/{oid}")
	public ResponseEntity<?> getOrderById(@PathVariable("oid") Long oid){
		Orders order = this.orderService.getOrderById(oid);
		
		return ResponseEntity.ok(order);
	}
	
	
	@DeleteMapping("/delete/order/{oid}")
	public ResponseEntity<?> deleteOrderById(@PathVariable("oid") Long oid){
		this.orderService.deleteOrder(oid);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

}

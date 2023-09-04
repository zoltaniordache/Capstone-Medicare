package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.bean.Orders;
import com.repository.OrderRepository;


@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	

	
	public Orders saveOrder(Orders userOrder) {
		Orders orderSaved = this.orderRepository.save(userOrder);
		return orderSaved;
	}

	
	public List<Orders> getAll(){
		return this.orderRepository.findAll();
	}
	
	public List<Orders> getOrders(String username){
		List<Orders> orders = this.orderRepository.findByUsername(username);
		return orders;
	}
	
	public Orders getOrderById(Long oid) {
		Orders order = this.orderRepository.findById(oid).get();
		return order;
	}
	
	public void deleteOrder(Long oid) {
		this.orderRepository.deleteById(oid);
	}

}
package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bean.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long>{
	public List<Orders> findByUsername(String username);
}
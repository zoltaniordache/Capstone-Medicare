package com.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.bean.User;

import com.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	
	
	
	
	//register a new user
	public String createUser(User user){
		User newUser = userRepository.findByUsername(user.getUsername());
		//System.out.println(newUser.toString());
		//if user exists or not
		try {
			if(newUser!=null) {
				throw new Exception("Username already exists!");
			}else {
				
				 userRepository.save(user);
				
			}
		} catch (Exception e) {
			return e.getMessage();
			
		}
		
		return "User Created";
	}
	
	public User getByUsername(String username) {
	User user = this.userRepository.findByUsername(username);
	
		return user;
	}
	
	public String signIn(String username,String password ) {		
		User result = userRepository.findByUsername(username);
		System.out.println(result.toString());
		
		if(result!=null) {
			
			
			
			if(result.getPassword().equals(password)) {
				
					if(result.getRole().equals("ADMIN")) {
						return "Admin Success";
					}else {
						return "Customer success";
					}
					
			}else {
				return "Password is not correct";
			}
		}else {
			return "Username does not exist";
		}
		
	}
	
	

}

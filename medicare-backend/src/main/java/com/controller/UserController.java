package com.controller;

import java.net.URI;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import com.bean.User;

import com.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	//init admin user
	@PostConstruct
	public void createAdmin(){
		User admin = new User();
		admin.setUsername("admin@medicare.com");
		admin.setPassword("123456");
		admin.setFirstName("Zoltan");
		admin.setLastName("Iordache");
		admin.setContactNumber("1234567890");
		admin.setRole("ADMIN");
		String adminCreated = this.userService.createUser(admin);
		
		System.out.println("Admin username: "+adminCreated+admin.getUsername());
	}
	
	//create new user
	@PostMapping(value = "/user/signup",consumes = MediaType.APPLICATION_JSON_VALUE)
	
	public String createNewUser( @RequestBody User user){
			
			user.setRole( "CUSTOMER");
			
			System.out.println(user.toString());	
			return userService.createUser(user);
			
			
		
	}
	
	@PostMapping(value = "/user/signin",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String signIn(@RequestBody User login) {
		System.out.println(login.getUsername()+login.getPassword());
		return userService.signIn(login.getUsername(),login.getPassword());
	}
	

}
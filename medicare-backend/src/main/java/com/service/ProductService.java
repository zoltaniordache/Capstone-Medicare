package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.Category;
import com.bean.Product;
import com.bean.Product;
import com.repository.ProductRepository;
import com.repository.CategoryRepository;;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	// add product
	public String addProduct(Product product) {
		System.out.println(product.toString());
		try {
		Product savedProduct =this.productRepository.save(product);
		
		if (savedProduct==null) {
			throw new Exception("Product failed to be added!");
		}
		else {
			 return  "Product Saved Successfully";
		}
		}
		catch(Exception e)
		{
			return e.toString();
		}
		
		
		
		
	}
	
	//find product by id
	public Product findProduct(int pid) {
		return this.productRepository.findById(pid).get();
	}
//	
	//find all products
	public List<Product> findAllProducts(){
		return this.productRepository.findAll();
	}
	
	//find product by name or salt
	public List<Product> findByName(String name){
		List<Product> products = this.productRepository.findByNameContainingIgnoreCase(name);
		return products;
	}
	
	
	
	
	//find product by category
	public List<Product> findProductByCategory(int categoryid){
		

		List<Product> products = this.productRepository.findProductsByCategoryId(categoryid);
		
		return products;
	}
	
	
	public String deleteProduct(int pid) {
		Optional<Product> result = productRepository.findById(pid);
		if(result.isPresent()) {
			Product product = result.get();
			productRepository.delete(product);;
			return "Product deleted successfully";
		}else {
			return "Product not found";
		}
	}


	
	//delete product by id
//	public void deleteProductById(Long pid) {
//		this.productRepository.deleteById(pid);
//	}
	

}
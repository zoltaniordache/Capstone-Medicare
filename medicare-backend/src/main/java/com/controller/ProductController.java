package com.controller;

import java.io.IOException;
import java.util.List;

import javax.swing.text.html.HTMLDocument.Iterator;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.bean.CartItem;
import com.bean.Category;
//import com.medicare.config.ImageUtil;
import com.bean.Product;
//import com.bean.ProductImage;
import com.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	
	
	
	@PostMapping(value = "/products/add",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String addProduct(@RequestBody Product product
										   //@RequestParam("image") MultipartFile  file
										  ) throws IOException{
		
		System.out.println(product.toString());
		
		String saveProduct = productService.addProduct(product);
		
		return saveProduct;
	}
	
	//update existing product

//	@PutMapping("/update/product/{id}")
//	public ResponseEntity<?> updateProduct(@PathVariable("id") Long id,@Valid @RequestBody Product product){
//		Product updateProduct = this.productService.findProduct(id);
//		updateProduct.setName(product.getName());
//		updateProduct.setBrand(product.getBrand());
//		updateProduct.setCategory(product.getCategory());
//		updateProduct.setDescription(product.getDescription());
//		//updateProduct.setSalt(product.getSalt());
//		
//		updateProduct.setPrice(product.getPrice());
//		this.productService.addProduct(updateProduct);
//		return ResponseEntity.status(HttpStatus.CREATED).build();
//	}
	
	
	@PutMapping("/products/update/{pid}")
	public String updateCategory(@PathVariable("pid") int pid, @RequestBody Product product){

		Product updateProduct = productService.findProduct(pid);
		updateProduct.setName(product.getName());
		updateProduct.setBrand(product.getBrand());
		updateProduct.setCategory(product.getCategory());
		updateProduct.setDescription(product.getDescription());
		updateProduct.setPrice(product.getPrice());
		updateProduct.setQuantity(product.getQuantity());
		updateProduct.setProductImage(product.getProductImage());
		this.productService.addProduct(updateProduct);
		
		return this.productService.addProduct(updateProduct);
	}
//	
//	//find product by id
//	@GetMapping("get-product/{id}")
//	public ResponseEntity<?> getProductById(@PathVariable("id") Long id){
//		Product product = this.productService.findProduct(id);
//		//ProductImage img =  new ProductImage();
////		img.setImageData(ImageUtil.decompressImage(product.getProductImage().getImageData()));
////		img.setImgId(product.getProductImage().getImgId());
////		img.setName(product.getProductImage().getName());
////		img.setType(product.getProductImage().getType());
//		//product.setProductImage(img);
//		return ResponseEntity.ok(product);
//	}
	
	//find all products
//	@GetMapping("/get/all-products")
//	public ResponseEntity<?> getAllProducts(){
//		List<Product> allProducts = this.productService.findAllProducts();
//		allProducts.forEach(product -> {
////			ProductImage img =  new ProductImage();
////			img.setImageData(ImageUtil.decompressImage(product.getProductImage().getImageData()));
////			img.setImgId(product.getProductImage().getImgId());
////			img.setName(product.getProductImage().getName());
////			img.setType(product.getProductImage().getType());
////			product.setProductImage(img);
//		});
//		if(allProducts.isEmpty()) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//		}else {
//			return ResponseEntity.ok(allProducts);
//		}
//	}
	
	@GetMapping("/products")
	public ResponseEntity<?> getProducts(){
		List<Product> allProducts = productService.findAllProducts();
		
		if(allProducts.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}else {
			return ResponseEntity.ok(allProducts);
		}
	}
	

	@PostMapping("/products")
	public ResponseEntity<?> getProductsCart(@RequestBody CartItem cart){
		Product product = this.productService.findProduct(cart.getPid());
		//return product;
//		List<Product> allProducts = productService.findAllProducts();
		
		if(product==null) {
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();		
			}else {
				product.setQuantity(cart.getQuantity());
		return ResponseEntity.ok(product);
	}
	}
	
	
	@DeleteMapping(value = "products/delete/{pid}")
	public String deleteCategory(@PathVariable("pid") int pid) {
		
		return productService.deleteProduct(pid);
	}
	
	
	@GetMapping(value = {"/products/products-by-value/{value}"})
	public ResponseEntity<?> getProductByName(@PathVariable("value") String value){
		List<Product> products = this.productService.findByName(value);

		if(products.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}else {
			return ResponseEntity.ok(products);

	}	}
	@GetMapping("/products/products-by-category/{categoryid}")
	public ResponseEntity<?> getProductsByCategory(@PathVariable("categoryid") int categoryid){
		List<Product> products = this.productService.findProductByCategory(categoryid);
		
		if(products.isEmpty()) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}else {
			return ResponseEntity.ok(products);
		}
	}
	
	
//	@DeleteMapping("/delete/product/{id}")
//	public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id){
//		this.productService.deleteProductById(id);
//		return ResponseEntity.status(HttpStatus.OK).build();
//	}
//	

	
	
	@GetMapping("/get/{name}")
	public ResponseEntity<?> getAvailable(@PathVariable("name") String name){
		List<Product> products = this.productService.findByName(name);
		if(products.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}else {
			return ResponseEntity.ok(products);
		}
	}
	
	
	
}

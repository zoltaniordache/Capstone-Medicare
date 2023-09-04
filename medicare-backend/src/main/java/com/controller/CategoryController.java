package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bean.Category;
import com.service.CategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

	@Autowired
	CategoryService categoryService;
	
	@RequestMapping(value = "/adminHome",method = RequestMethod.GET)
	public String back(Model mm, Category cc) {
		mm.addAttribute("category", cc);
		return "adminHome";
	}
	
//
	
	
	
	
	@PostMapping(value = "/categories/add",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String createCategory(@RequestBody Category category) {
			
		String response = categoryService.storeCategory(category);
		System.out.println(response);
		return response;
	}
	
	
	@GetMapping("/categories")
	public ResponseEntity<?> getCategories(){
		List<Category> listOfCategories = categoryService.findAllCategory();
		
		if(listOfCategories.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}else {
			return ResponseEntity.ok(listOfCategories);
		}
	}
	@DeleteMapping(value = "categories/delete/{cid}")
	public String deleteCategory(@PathVariable("cid") int cid) {
		
		return categoryService.deleteCategory(cid);
	}
	
	
	
	@PutMapping("/categories/update/{cid}")
	public String updateCategory(@PathVariable("cid") int cid, @RequestBody Category category){
		Category updateCategory = categoryService.findCategoryById(cid);
		updateCategory.setCategoryname(category.getCategoryname());
	
		
		return this.categoryService.storeCategory(updateCategory);
	}
	
	
//	@GetMapping("/categories/delete/{cid}")
//	public String deleteCat(@PathVariable int cid) {
//		
//		categoryService.removeCategoryById(cid);
//		
//		return "redirect:/categories";
//	}
	
	
//	@GetMapping("/categories/update/{cid}")
//	public String updateCat(@PathVariable int cid , Model model) {
//		
//		Category category = categoryService.findCategoryById(cid);
//		
//		
//			model.addAttribute("category" , category);
//			return "addCategory";
//		
//		
//	}
//	@RequestMapping(value = "/categories",method = RequestMethod.GET)
//	public String viewCategory(Model mm, Category cc) {
//		List<Category> listOfCategories = categoryService.findAllCategory();
//		mm.addAttribute("category", listOfCategories);
//		return "categories";
//	}
}

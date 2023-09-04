package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.Category;

import com.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	public String storeCategory(Category category){
		Category newcategory = categoryRepository.findByCategoryname(category.getCategoryname());
		//if user exists or not
		
		
		try {
			if(newcategory!=null) {
				
				throw new Exception("Category already exists!");
			}else {
				
				 categoryRepository.save(category);
				
			}
		} catch (Exception e) {
			  System.out.println(e);  
			  return e.toString();
			
		}
	
		return "Category Created";
	}
	
	public List<Category> findAllCategory() {
		return categoryRepository.findAll();
	}
//	public void removeCategoryById(int cid) {
//		categoryRepository.deleteById(cid);
//	}

	
	public String deleteCategory(int cid) {
		Optional<Category> result = categoryRepository.findById(cid);
		if(result.isPresent()) {
			Category category = result.get();
			categoryRepository.delete(category);;
			return "Category deleted successfully";
		}else {
			return "Category not found";
		}
	}
	public Category findCategoryById(int id) {
		
		return categoryRepository.findByCategoryId(id);
		
	}
public Category findCategoryByCategoryname(String categoryname) {
		
	return categoryRepository.findByCategoryname(categoryname);
		
	}


}

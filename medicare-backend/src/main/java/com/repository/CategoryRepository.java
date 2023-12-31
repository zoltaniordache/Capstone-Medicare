package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bean.Category;
import com.bean.User;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
	
	
	public Category findByCategoryname(String categoryname);
	@Query("select c from Category c where c.cid = :cid ")
	public  Category findByCategoryId(@Param("cid") Integer categoryid);
	

	
}

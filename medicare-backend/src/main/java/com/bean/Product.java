package com.bean;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="products")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer pid;
	
	@NotNull(message = "name cannot be blank")
	private String name;
	
	@NotNull(message = "brand cannot be blank")
	private String brand;
	@JsonBackReference
	@NotNull(message = "category cannot be blank")
	private Integer categoryid;
	
	@NotNull(message = "description cannot be blank")
	private String description;
	
//	@NotBlank(message = "salt cannot be blank")
//	private String salt;
	
	@NotNull(message = "quantity cannot be null")
	private int quantity;
	
	@NotNull(message = "price cannot be null")
	private Double price;
	
	
	
//	@OneToOne(cascade = CascadeType.ALL)
//	@JsonManagedReference
	@NotNull(message = "image cannot be null")
	private String productImage;
	
	public Product() {
		super();
	}
	public Product(Integer pid, String name, String brand, Integer categoryid,String description,   Double price,
			String productImage) {
		super();
		this.pid = pid;
		this.name = name;
		this.brand = brand;
		this.categoryid = categoryid;
		this.description = description;
		//this.salt = salt;
		
		this.price = price;
		
		this.productImage = productImage;
	}
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public Integer getCategory() {
		return categoryid;
	}
	public void setCategory(Integer categoryid) {
		this.categoryid = categoryid;
	}
//	public String getSalt() {
//		return salt;
//	}
//	public void setSalt(String salt) {
//		this.salt = salt;
//	}

	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	
	public String getProductImage() {
		return productImage;
	}
	public void setProductImage(String productImage) {
		this.productImage = productImage;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	@Override
	public String toString() {
		return "Product [pid=" + pid + ", name=" + name + ", brand=" + brand + ", categoryid=" + categoryid
				+ ", description=" + description + ", quantity=" + quantity + ", price=" + price + ", productImage="
				+ productImage + "]";
	}
	
}
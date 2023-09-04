package com.test;

import org.testng.annotations.Test;
import org.testng.annotations.BeforeTest;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterTest;
import static org.testng.Assert.assertEquals;

import java.time.Duration;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.support.ui.Select;
public class AddProductTest {
	ChromeDriver driver;
  @Test(enabled = false)
  public void addProduct_succesfully() {
	
		
	  
	  driver.get("http://localhost:3000/addproduct");
	  WebElement name = driver.findElement(By.id("name"));
	  WebElement brand = driver.findElement(By.id("brand"));
	  Select categoryname = new Select(driver.findElement(By.id("categoryname")));
	  WebElement description = driver.findElement(By.id("description"));
	  WebElement quantity = driver.findElement(By.id("quantity"));
	  WebElement price = driver.findElement(By.id("price"));
	  WebElement productImage = driver.findElement(By.id("productImage"));
	  name.sendKeys("testMedicine");
	  brand.sendKeys("testMedicine");
	  categoryname.selectByVisibleText("Headache");
	  description.sendKeys("Description TEST");
	  quantity.sendKeys("1");
		price.sendKeys("1");
		productImage.sendKeys("testImage");
		
		
		
	  WebElement addCategoryButton = driver.findElement(By.id("addProductButton"));
	  addCategoryButton.click();
	  WebElement succesMsgREf = driver.findElement(By.id("succesMsg"));	

	  String result= succesMsgREf.getAttribute("value");
	   assertEquals(result, "Product added successfully!");


  }
  @Test(enabled = true)
  public void addProduct_emptyfields() {
	  driver.get("http://localhost:3000/addproduct");
	  WebElement name = driver.findElement(By.id("name"));
	  WebElement brand = driver.findElement(By.id("brand"));
	  Select categoryname = new Select(driver.findElement(By.id("categoryname")));
	  WebElement description = driver.findElement(By.id("description"));
	  WebElement quantity = driver.findElement(By.id("quantity"));
	  WebElement price = driver.findElement(By.id("price"));
	  WebElement productImage = driver.findElement(By.id("productImage"));
	  name.sendKeys("");
	  brand.sendKeys("");
	  categoryname.selectByVisibleText("Headache");
	  description.sendKeys("Description TEST");
	  quantity.sendKeys("1");
		price.sendKeys("1");
		productImage.sendKeys("testImage");
		
		
		
	  WebElement addCategoryButton = driver.findElement(By.id("addProductButton"));
	  addCategoryButton.click();
	  WebElement succesMsgREf = driver.findElement(By.id("errorMsg"));	

	  String result= succesMsgREf.getAttribute("value");
	   assertEquals(result, "Please fill out all the required fields!");
		   
  }

  @BeforeTest
  public void beforeTest() {
	  System.setProperty("webdriver.chrome.driver", "/home/zoltaniordachev/Desktop/Medicare/chromedriver");
	  ChromeOptions co = new ChromeOptions();
	  co.addArguments("--remote-allow-origins=*");
	  driver= new ChromeDriver(co);
	  driver.get("http://localhost:3000/");
	  WebElement emailidREf = driver.findElement(By.id("username"));
			WebElement passwordREf = driver.findElement(By.id("password"));
			emailidREf.sendKeys("admin@medicare.com");
			passwordREf.sendKeys("123456");
			WebElement submitButtonRef = driver.findElement(By.id("submitButton"));
			submitButtonRef.click();
  }

  @AfterTest
  public void afterTest() {
	  driver.close();
  }
 
}

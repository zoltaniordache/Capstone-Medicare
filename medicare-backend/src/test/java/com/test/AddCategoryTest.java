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

public class AddCategoryTest {
	ChromeDriver driver;
  @Test(enabled = false)
  public void addCategory_succesfully() {
	
		
	  
	  driver.get("http://localhost:3000/addcategory");
	  WebElement categoryname = driver.findElement(By.id("categoryname"));
	  categoryname.sendKeys("Headache");
	  WebElement addCategoryButton = driver.findElement(By.id("addCategoryButton"));
	  addCategoryButton.click();
	  WebElement succesMsgREf = driver.findElement(By.id("succesMsg"));	

	  String result= succesMsgREf.getAttribute("value");
	   assertEquals(result, "Category  created successfully!");


  }
  @Test(enabled = false)
  public void addCategory_alreadyExists() {
	  driver.get("http://localhost:3000/addcategory");
	  WebElement categoryname = driver.findElement(By.id("categoryname"));
	  categoryname.sendKeys("Headache");
	  WebElement addCategoryButton = driver.findElement(By.id("addCategoryButton"));
	  addCategoryButton.click();
	  WebElement succesMsgREf = driver.findElement(By.id("errorMsg"));	

	  String result= succesMsgREf.getAttribute("value");
	   assertEquals(result, "Category already exists!");
		   
  }
  @Test(enabled = true)
  public void addCategory_emptyFields() {
	  driver.get("http://localhost:3000/addcategory");
	  WebElement categoryname = driver.findElement(By.id("categoryname"));
	  categoryname.sendKeys("");
	  WebElement addCategoryButton = driver.findElement(By.id("addCategoryButton"));
	  addCategoryButton.click();
	  WebElement succesMsgREf = driver.findElement(By.id("errorMsg"));	

	  String result= succesMsgREf.getAttribute("value");
	   assertEquals(result, "Category name required!");
		   
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

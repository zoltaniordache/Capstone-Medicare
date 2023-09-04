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

public class RegisterTest {
	ChromeDriver driver;
  @Test(enabled = false)
  public void registerSuccesfully() {
	  WebElement emailidREf = driver.findElement(By.id("username"));
		WebElement passwordREf = driver.findElement(By.id("password"));
		WebElement firstNameREf = driver.findElement(By.id("firstName"));
		WebElement lastNameREf = driver.findElement(By.id("lastName"));
		WebElement contactNumberREf = driver.findElement(By.id("contactNumber"));
	
		emailidREf.sendKeys("customerTEST3@medicare.com");
		passwordREf.sendKeys("123456");
		firstNameREf.sendKeys("customerTEST");
		lastNameREf.sendKeys("customerTEST");
		contactNumberREf.sendKeys("123456");
		WebElement submitButtonRef = driver.findElement(By.id("submitButton"));
		submitButtonRef.click();
		//Alert alertRef= driver.switchTo().alert();
		WebElement succesMsgREf = driver.findElement(By.id("succesMsg"));
		String result= succesMsgREf.getAttribute("value");
		   assertEquals(result, "Registration done successfully!");
		   
//		WebElement h2TagREf = driver.findElement(By.tagName("h2"));
//		assertEquals(h2TagREf.getText(), "Welcomem to Home page");
  }
  @Test(enabled = false)
  public void registerUnSuccesfully_userAlreadyExists() {
	  WebElement emailidREf = driver.findElement(By.id("username"));
		WebElement passwordREf = driver.findElement(By.id("password"));
		WebElement firstNameREf = driver.findElement(By.id("firstName"));
		WebElement lastNameREf = driver.findElement(By.id("lastName"));
		WebElement contactNumberREf = driver.findElement(By.id("contactNumber"));
	
		emailidREf.sendKeys("customerTEST3@medicare.com");
		passwordREf.sendKeys("123456");
		firstNameREf.sendKeys("customerTEST");
		lastNameREf.sendKeys("customerTEST");
		contactNumberREf.sendKeys("123456");
		WebElement submitButtonRef = driver.findElement(By.id("submitButton"));
		submitButtonRef.click();
		//Alert alertRef= driver.switchTo().alert();
		WebElement succesMsgREf = driver.findElement(By.id("errorMsg"));
		String result= succesMsgREf.getAttribute("value");
		   assertEquals(result, "Username already exists!");
		   
  }
  @Test(enabled = true)
  public void registerUnSuccesfully_emptyFields() {
	  WebElement emailidREf = driver.findElement(By.id("username"));
		WebElement passwordREf = driver.findElement(By.id("password"));
		WebElement firstNameREf = driver.findElement(By.id("firstName"));
		WebElement lastNameREf = driver.findElement(By.id("lastName"));
		WebElement contactNumberREf = driver.findElement(By.id("contactNumber"));
	
		emailidREf.sendKeys("customerTEST3@medicare.com");
		passwordREf.sendKeys("");
		firstNameREf.sendKeys("customerTEST");
		lastNameREf.sendKeys("customerTEST");
		contactNumberREf.sendKeys("123456");
		WebElement submitButtonRef = driver.findElement(By.id("submitButton"));
		submitButtonRef.click();
		//Alert alertRef= driver.switchTo().alert();
		WebElement succesMsgREf = driver.findElement(By.id("errorMsg"));
		String result= succesMsgREf.getAttribute("value");
		   assertEquals(result, "Please fill all the required fields!");
		   
  }
  @BeforeTest
  public void beforeTest() {
	  System.setProperty("webdriver.chrome.driver", "/home/zoltaniordachev/Desktop/Medicare/chromedriver");
	  ChromeOptions co = new ChromeOptions();
	  co.addArguments("--remote-allow-origins=*");
	  driver= new ChromeDriver(co);
	  driver.get("http://localhost:3000/register");
  }

  @AfterTest
  public void afterTest() {
	  driver.close();
  }
 
}

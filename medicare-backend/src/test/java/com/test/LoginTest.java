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

public class LoginTest {
	ChromeDriver driver;
  @Test(enabled = false)
  public void signInSuccesfullyAdmin() {
	  WebElement emailidREf = driver.findElement(By.id("username"));
		WebElement passwordREf = driver.findElement(By.id("password"));
		emailidREf.sendKeys("admin@medicare.com");
		passwordREf.sendKeys("123456");
		WebElement submitButtonRef = driver.findElement(By.id("submitButton"));
		submitButtonRef.click();
		//Alert alertRef= driver.switchTo().alert();
		String result= driver.getCurrentUrl();
		   assertEquals(result, "http://localhost:3000/inventory");
		   
//		WebElement h2TagREf = driver.findElement(By.tagName("h2"));
//		assertEquals(h2TagREf.getText(), "Welcomem to Home page");
  }
  @Test(enabled = true)
  public void signInSuccesfullyCustomer() {
	  WebElement emailidREf = driver.findElement(By.id("username"));
		WebElement passwordREf = driver.findElement(By.id("password"));
		emailidREf.sendKeys("d@medicare.com");
		passwordREf.sendKeys("123456");
		WebElement submitButtonRef = driver.findElement(By.id("submitButton"));
		submitButtonRef.click();
		//Alert alertRef= driver.switchTo().alert();
		String result= driver.getCurrentUrl();
		   assertEquals(result, "http://localhost:3000/productlist");
		   
//		WebElement h2TagREf = driver.findElement(By.tagName("h2"));
//		assertEquals(h2TagREf.getText(), "Welcomem to Home page");
  }
  @Test(enabled = false)
  public void signInUnsuccesfully() {
	  WebElement emailidREf = driver.findElement(By.id("username"));
		WebElement passwordREf = driver.findElement(By.id("password"));
		emailidREf.sendKeys("admin@medicare.com");
		passwordREf.sendKeys("1234567");
		WebElement submitButtonRef = driver.findElement(By.id("submitButton"));
		submitButtonRef.click();
		//Alert alertRef= driver.switchTo().alert();
		String result= driver.getCurrentUrl();
		   assertEquals(result, "http://localhost:3000/?");
		   
//		WebElement h2TagREf = driver.findElement(By.tagName("h2"));
//		assertEquals(h2TagREf.getText(), "Welcomem to Home page");
  }
  @BeforeTest
  public void beforeTest() {
	  System.setProperty("webdriver.chrome.driver", "/home/zoltaniordachev/Desktop/Medicare/chromedriver");
	  ChromeOptions co = new ChromeOptions();
	  co.addArguments("--remote-allow-origins=*");
	  driver= new ChromeDriver(co);
	  driver.get("http://localhost:3000/");
  }

  @AfterTest
  public void afterTest() {
	  driver.close();
  }
 
}

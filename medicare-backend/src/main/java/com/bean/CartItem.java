package com.bean;

public class CartItem {
	
	private int pid;
	private int quantity;
	public CartItem() {
		
	}
	public CartItem(int pid, int quantity) {
		super();
		this.pid = pid;
		this.quantity = quantity;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	@Override
	public String toString() {
		return "CartItem [pid=" + pid + ", quantity=" + quantity + "]";
	}
	
	

}

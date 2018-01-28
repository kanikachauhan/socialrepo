package com.server.beans;

import java.util.List;

import com.server.entity.UserDetails;

public class UserUpdate {
	private List<UserDetails> data;
	public List<UserDetails> getData() {
		return data;
	}
	public void setData(List<UserDetails> data) {
		this.data = data;
	}
}

package com.server.beans;

import org.springframework.social.connect.Connection;

public class CustomUserConnection {

	private Connection<?> connection;
	private String firstName;
	private String providerId;
	public Connection<?> getConnection() {
		return connection;
	}
	public void setConnection(Connection<?> connection) {
		this.connection = connection;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getProviderId() {
		return providerId;
	}
	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}
	
	
}

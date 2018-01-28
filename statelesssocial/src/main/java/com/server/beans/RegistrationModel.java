package com.server.beans;

public class RegistrationModel {

	private String fname;
	private String lname;
	private String username;
	private String email;
	private String passwd;
	private String cpasswd;
	private String location;
	private String question;
	private String answer;
	
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public String getCpasswd() {
		return cpasswd;
	}
	public void setCpasswd(String cpasswd) {
		this.cpasswd = cpasswd;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	@Override
	public String toString() {
		return "RegistrationModel [fname=" + fname + ", lname=" + lname + ", username=" + username + ", email=" + email
				+ ", passwd=" + passwd + ", cpasswd=" + cpasswd + ", location=" + location + "]";
	}
}

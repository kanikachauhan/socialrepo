package com.server.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.linkedin.api.LinkedIn;
import org.springframework.social.linkedin.api.LinkedInProfile;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.server.beans.UserBean;
import com.server.dao.DatabaseDao;
import com.server.entity.UserDetails;
import com.server.service.UserService;
import com.server.utils.Constants;
@CrossOrigin
@RestController
public class LinkedInController {

	@Autowired
	LinkedIn linkedin;
	@Autowired
	UserService userService;
	private Gson gson = new Gson();
	@RequestMapping(value = Constants.LINKEDIN_INFO, method = RequestMethod.GET, produces = Constants.APPLICATION_JSON)
    public String getSocialDetails() {
    	LinkedInProfile userResult = linkedin.profileOperations().getUserProfile();
    	String userId = userResult.getId();
    	UserBean user = userService.findByProviderUserId(userId);
    	String resultStr = null;
    	Date date = new Date();
    	com.server.entity.User userForId = userService.findByProviderIdAndProviderUserId(Constants.PROVIDER_LINKEDIN, userId);
    	boolean userAlreadyExists = userService.userAlreadyExists(userId);
    	if (!userAlreadyExists) {
			user.setBirthday("");
			user.setUsername(userResult.getFirstName());
			user.setFirstname(userResult.getFirstName());
			user.setGender("");
			user.setLastname(userResult.getLastName());
			user.setLocation("");
			user.setIndustry("");
			user.setCreationDate(date.toString());
			user.setUpdateDate(date.toString());
			user.setEmail("");
			user.setProviderUserId(userForId.getProviderUserId());
			user.setId(userForId.getId());
			user.setFlag(false);
			int count = userService.countOfUsersRegistered();
			if (count == 0) {
				user.setRole(Constants.ADMIN);
			} else {
				user.setRole(Constants.USER);
			}
			resultStr = gson.toJson(user, UserBean.class);
			return resultStr;
		} else {
			com.server.beans.UserBean userDetails = userService.findByProviderUserId(userId);
			user.setFlag(true);
			user.setBirthday(userDetails.getBirthday());
			user.setUsername(userDetails.getUsername());
			user.setFirstname(userDetails.getFirstname());
			user.setGender(userDetails.getGender());
			user.setLastname(userDetails.getLastname());
			user.setLocation(userDetails.getLocation());
			user.setIndustry(userDetails.getIndustry());
			user.setCreationDate(userDetails.getCreationDate());
			user.setUpdateDate(userDetails.getUpdateDate());
			user.setEmail(userDetails.getEmail());
			user.setProviderUserId(userDetails.getProviderUserId());
			user.setId(userDetails.getId());
			user.setRole(userDetails.getRole());
			resultStr = gson.toJson(user, UserBean.class);
			return resultStr;
		}
    }
}

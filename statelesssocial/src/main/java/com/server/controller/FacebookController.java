package com.server.controller;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.server.beans.UserBean;
import com.server.dao.DatabaseDao;
import com.server.entity.UserDetails;
import com.server.service.UserService;
import com.server.serviceImpl.UserServiceImpl;
import com.server.utils.Constants;
@CrossOrigin
@RestController
public class FacebookController {
	private static final Logger logger = Logger.getLogger(FacebookController.class);
	@Autowired
	Facebook facebook;
	private Gson gson = new Gson();
	@Autowired
	UserService userService;

	@RequestMapping(value = Constants.FACEBOOK_INFO, method = RequestMethod.GET, produces = Constants.APPLICATION_JSON)
	public String getSocialDetails() {
		User userResult = facebook.userOperations().getUserProfile();
		String userId = userResult.getId();
		UserBean user = userService.findByProviderUserId(userId);
		String resultStr = null;
		Date date = new Date();
		com.server.entity.User userForId = userService.findByProviderIdAndProviderUserId(Constants.PROVIDER_FACEBOOK, userId);
		boolean userAlreadyExists = userService.userAlreadyExists(userId);
		if (!userAlreadyExists) {
			user.setBirthday(userResult.getBirthday());
			user.setUsername(userResult.getFirstName());
			user.setFirstname(userResult.getFirstName());
			user.setGender(userResult.getGender());
			user.setLastname(userResult.getLastName());
			user.setLocation("");
			user.setIndustry("");
			user.setCreationDate(date.toString());
			user.setUpdateDate(date.toString());
			user.setEmail(userResult.getEmail());
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

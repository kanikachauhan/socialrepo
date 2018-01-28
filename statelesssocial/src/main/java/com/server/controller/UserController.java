package com.server.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.server.beans.CustomUserConnection;
import com.server.beans.RegistrationModel;
import com.server.beans.UserBean;
import com.server.dao.DatabaseDao;
import com.server.entity.QuestionEntity;
import com.server.entity.User;
import com.server.service.UserService;
import com.server.utils.Constants;
@CrossOrigin
@RestController
public class UserController {
	private static final Logger logger = Logger.getLogger(UserController.class);
	private static final String AUTH_HEADER_NAME = "x-auth-token";
	@Autowired
	DatabaseDao userDao;
	@Autowired
	UserService userService;
	private Gson gson = new Gson();
	@RequestMapping(value = Constants.LOCAL_INFO, method = RequestMethod.GET)
	public  @ResponseBody  String getCurrentUser(HttpServletRequest request) {
		try{
			logger.info("inside get current user");
			String token = request.getHeader(AUTH_HEADER_NAME);
			User user = userDao.findUserByToken(token);
			String userResult = gson.toJson(user, User.class);
			return userResult;
		}catch(Exception e){
			logger.error("Exception occurred ",e);
		}return Constants.ERROR;
	}
	@RequestMapping(value=Constants.USER_ACCESS,method=RequestMethod.GET)
	public String isSuccess(HttpServletRequest request){
		CustomUserConnection connection = new CustomUserConnection();
		Cookie resultCookie[] =request.getCookies();
		String providerId = "";
		if(resultCookie.length>0){
		for(Cookie ckie:resultCookie){
			String strName = ckie.getName();
			if(strName.equals(Constants.PROVIDER_COOKIE)){
				providerId = ckie.getValue();
				break;
			}
		}
		}
		connection.setProviderId(providerId);
		return gson.toJson(connection, CustomUserConnection.class);
	}
	
	@RequestMapping(value=Constants.SHOW_ALL_USERS,method=RequestMethod.POST)
	public String getAllUsers(HttpServletRequest request){
		String result= "";
		try{
			List<UserBean> userBeanList = userService.getAllUsers();
			logger.info("User bean list size "+userBeanList.size());
			JsonArray jsonArr = gson.toJsonTree(userBeanList).getAsJsonArray();			
			result = jsonArr.toString();
		}catch(Exception e){
			logger.info("Exception occured ",e);
		}
		return result;
	}
	
	
	@RequestMapping(value=Constants.PROMOTE_ALL_USERS,method=RequestMethod.POST)
	public  @ResponseBody  String promoteUsers(HttpServletRequest request,@RequestBody String data){
		String result= null;
		try{
			userService.promoteUsersToAdmin(data);
			System.out.println(data);
		}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}
	
	
	@RequestMapping(value = Constants.SAVE_USER, method = RequestMethod.POST, consumes=Constants.APPLICATION_JSON, produces=Constants.APPLICATION_JSON)
	public @ResponseBody String saveUser( HttpServletRequest request,@RequestBody  UserBean userBean) {
		String result = Constants.ERROR;
		try {
			userBean.setFlag(true);
			if(userService.saveUser(userBean,request)){
				result = Constants.SUCCESS;
			}
		} catch (Exception e) {
			logger.info("Exception Occurred ",e);
		}
		return result;
	}
	@RequestMapping(value = Constants.UPDATE_USER, method = RequestMethod.GET)
	public @ResponseBody String updateUser(HttpServletRequest request) {
		String result = null;
		try {
			result = Constants.SUCCESS;
		} catch (Exception e) {
			result = Constants.ERROR;
			e.printStackTrace();
		}
		return result;
	}
	@RequestMapping(value=Constants.REGISTER_NEW_USER, method = RequestMethod.POST, consumes=Constants.APPLICATION_JSON, produces=Constants.APPLICATION_JSON)
	public  @ResponseBody  String registerNewUser(HttpServletRequest request, HttpServletResponse response,@RequestBody RegistrationModel registrationModel){
		String result = Constants.ERROR;
		try{
			if(userService.registerNewUser(registrationModel)){
				logger.info("Registration Successful ");
				result = Constants.SUCCESS;
			}
		}catch(Exception e){
			logger.info("Exception occurred ",e);
			result = Constants.ERROR;
		}
		return result;
	}
	@RequestMapping(value = Constants.RESET_PASSWORD, method = RequestMethod.POST, consumes=Constants.APPLICATION_JSON, produces=Constants.APPLICATION_JSON)
	public  @ResponseBody String forgetPassword(HttpServletRequest request,@RequestBody RegistrationModel model) {
		String result = Constants.ERROR;
		try {
			logger.info("User name for getting security question "+model.getUsername());
			QuestionEntity qentity = userService.getSecurityQuestionByUsername(model.getUsername());
			if(qentity!=null){
				Gson gson = new Gson();
				result =gson.toJson(qentity,QuestionEntity.class);
			}
		} catch (Exception e) {
			result = Constants.ERROR;
			logger.info("Exception occurred ",e);
		}
		return result;
	}
	@RequestMapping(value = Constants.VERIFY_SECURITY_QUESTION, method = RequestMethod.POST, consumes=Constants.APPLICATION_JSON, produces=Constants.APPLICATION_JSON)
	public  @ResponseBody String updatePassword(HttpServletRequest request,@RequestBody RegistrationModel model) {
		String result = Constants.ERROR;
		try {
			logger.info("User name for getting security question "+model.getUsername());
			if(userService.updatePasswordForUser(model.getUsername(),model.getPasswd()))
				result = Constants.SUCCESS;
		} catch (Exception e) {
			result = Constants.ERROR;
			logger.info("Exception occurred ",e);
		}
		return result;
	}
	
	
	@RequestMapping(value = Constants.NORMAL_USER_LOGIN,method = RequestMethod.POST, consumes=Constants.APPLICATION_JSON, produces=Constants.APPLICATION_JSON)
	public  @ResponseBody String validateUser(HttpServletRequest request,@RequestBody  UserBean userBean,HttpServletResponse response){
		String result = "";
		try{
			UserBean userBeanFound = userService.loadUserDetailsByUsername(userBean.getUsername(),userBean.getPassword());
			if(userBeanFound==null){
				result = Constants.ERROR;
			}else{
				result = Constants.SUCCESS;
				final Cookie authCookie = new Cookie(Constants.PROVIDER_COOKIE, Constants.PROVIDER_USER);
				authCookie.setPath("/");
				response.addCookie(authCookie);
				final Cookie userCookie = new Cookie("userName",userBean.getUsername());
				userCookie.setPath("/");
				response.addCookie(userCookie);
			}
		}catch(Exception e){
			result = Constants.ERROR;
			logger.info("Exception occurred ",e);	
		}return result;
	}
	@RequestMapping(value = Constants.NORMAL_USER_INFO,method = RequestMethod.GET, produces=Constants.APPLICATION_JSON)
	public @ResponseBody String retrieveNormalUser(HttpServletRequest request){
		String result = "";
		String username = "";
		UserBean userBeanFound = null;
		try{
			Cookie[] ckie = request.getCookies();
			if(ckie.length>0){
				for(Cookie ck:ckie){
					String cookieName = ck.getName();
					if(cookieName.equalsIgnoreCase("userName")){
						username = ck.getValue();
						break;
					}
				}
			}
			userBeanFound = userService.loadUserBeanByUsername(username);
			if(userBeanFound==null){
				result = Constants.ERROR;
			}else{
				Gson gson = new Gson();
				result = gson.toJson(userBeanFound, UserBean.class).toString();
			}
		}catch(Exception e){
			result = Constants.ERROR;
			logger.info("Exception occurred ",e);
		}return result;
	}
}

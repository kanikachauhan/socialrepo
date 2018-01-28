package com.server.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.social.connect.ConnectionKey;
import org.springframework.stereotype.Service;

import com.server.beans.QuestionBean;
import com.server.beans.RegistrationModel;
import com.server.beans.UserBean;
import com.server.dao.DatabaseDao;
import com.server.entity.QuestionEntity;
import com.server.entity.User;
import com.server.entity.UserDetails;
import com.server.service.UserService;
import com.server.utils.Constants;

@Service
public class UserServiceImpl implements UserService {
	private static final Logger logger = Logger.getLogger(UserServiceImpl.class);
	@Autowired
	private DatabaseDao userDao;
	private final AccountStatusUserDetailsChecker detailsChecker = new AccountStatusUserDetailsChecker();

	@Override
	public User loadUserByUserId(String userId)  {
		final User user = userDao.findById(userId);
		logger.info("load user by userid "+userId);
		return checkUser(user);
	}

	@Override
	public User loadUserByUsername(String username) {
		final User user = userDao.findByUsername(username);
		return checkUser(user);
	}

	@Override
	public User loadUserByConnectionKey(ConnectionKey connectionKey) {
		final User user = userDao.findByProviderIdAndProviderUserId(connectionKey.getProviderId(), connectionKey.getProviderUserId());
		return checkUser(user);
	}

	@Override
	public void updateUserDetails(User user) {
		userDao.updateUser(user);
	}

	private User checkUser(User user) {
		if (user == null) {
			throw new UsernameNotFoundException("user not found");
		}
		detailsChecker.check(user);
		return user;
	}

	@Override
	public User loadUserByToken(String token) {
		User user = userDao.findUserByToken(token);
		return user;
	}
	public int returnCountOfUsers(){
		int count = userDao.returnUserCount();
		return count;
	}
	@Override
	public boolean saveUser(UserBean user,HttpServletRequest httpServletRequest) {
		boolean flag = false;
		try{
			UserDetails userdetails = new UserDetails();
			userdetails.setUsername(user.getUsername());
			userdetails.setBirthday(user.getBirthday());
			userdetails.setCreationDate(user.getCreationDate());
			userdetails.setEmail(user.getEmail());
			userdetails.setFirstname(user.getFirstname());
			userdetails.setGender(user.getGender());
			userdetails.setId(user.getId());
			userdetails.setFlag(user.isFlag());
			userdetails.setIndustry(user.getIndustry());
			userdetails.setLastname(user.getLastname());
			userdetails.setLocation(user.getLocation());
			userdetails.setUpdateDate(user.getUpdateDate());
			userdetails.setUsername(user.getUsername());
			userdetails.setFlag(true);
			userdetails.setProviderUserId(user.getProviderUserId());
			int count = countOfUsersRegistered();
			if (count == 0) {
				userdetails.setRole(Constants.ADMIN);
			}else{
				userdetails.setRole(Constants.USER);
			}
			if(userDao.saveUser(userdetails)){
				flag = true;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public int countOfUsersRegistered() {
		int count = userDao.countUserRegistered();
		return count;
	}

	@Override
	public ArrayList<UserBean> getAllUsers() {
		ArrayList<UserBean> userBeanList = new ArrayList<UserBean>();
		try{
			List<UserDetails> userDetailsList = userDao.getAllUserList();
			for (UserDetails userDetail : userDetailsList) {
				UserBean userBean = new UserBean();
				userBean.setUsername(userDetail.getUsername());
				userBean.setCreationDate(userDetail.getCreationDate());
				userBean.setEmail(userDetail.getEmail());
				userBean.setFirstname(userDetail.getFirstname());
				userBean.setFlag(userDetail.isFlag());
				userBean.setGender(userDetail.getGender());
				userBean.setId(userDetail.getId());
				userBean.setIndustry(userDetail.getIndustry());
				userBean.setLastname(userDetail.getLastname());
				userBean.setLocation(userDetail.getLocation());
				userBean.setProviderUserId(userDetail.getProviderUserId());
				userBean.setRole(userDetail.getRole());
				userBean.setUpdateDate(userDetail.getUpdateDate());
				userBean.setBirthday(userDetail.getBirthday());
				userBeanList.add(userBean);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return userBeanList;
	}
	
	@Override
	public boolean registerNewUser(RegistrationModel registrationModel){
		boolean flag = false;
		try{
			UUID uid = UUID.randomUUID();
			User user =  new User();
			user.setUsername(registrationModel.getUsername());
			UserDetails udetails = new UserDetails();
			udetails.setFirstname(registrationModel.getFname());
			udetails.setId(uid.toString());
			udetails.setEmail(registrationModel.getEmail());
			udetails.setLastname(registrationModel.getLname());
			udetails.setLocation(registrationModel.getLocation());
			udetails.setProviderUserId(uid.toString());
			udetails.setPassword(registrationModel.getPasswd());
			boolean statusOne = userDao.saveUser(udetails);
			user.setId(uid.toString());
			user.setUsername(registrationModel.getUsername());
			int count = countOfUsersRegistered();
			if (count == 0) {
				udetails.setRole(Constants.ADMIN);
			}else{
				udetails.setRole(Constants.USER);
			}
			 user.setProviderId(Constants.PROVIDER_LOCAL);
			 user.setProviderUserId(uid.toString());
			 user.setId(uid.toString());
			 user.setAccessToken("");
			
			 boolean statusTwo = userDao.save(user);
			 QuestionEntity entity = new QuestionEntity();
			 entity.setAns(registrationModel.getAnswer());
			 entity.setQuest(registrationModel.getQuestion());
			 entity.setUser_id(registrationModel.getUsername());
			 
			 boolean statusThree = userDao.saveQuestionDetails(entity);
			 logger.info("Status One "+statusOne+" status two "+statusTwo+" status three "+statusThree);
			if(statusOne&&statusTwo&&statusThree){
				flag = true;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public User findByProviderIdAndProviderUserId(String providerId, String providerUserId) {
		User user = userDao.findByProviderIdAndProviderUserId(providerId, providerUserId);
		return user;
	}

	@Override
	public boolean userAlreadyExists(String userId) {
		return userDao.userAlreadyExists(userId);
	}

	@Override
	public UserBean findByProviderUserId(String providerUserId) {
		UserBean userBean = new UserBean();
		UserDetails userDetails = userDao.findByProviderUserId(providerUserId);
		userBean.setBirthday(userDetails.getBirthday());
		userBean.setCreationDate(userDetails.getCreationDate());
		userBean.setEmail(userDetails.getEmail());
		userBean.setFirstname(userDetails.getFirstname());
		userBean.setGender(userDetails.getGender());
		userBean.setId(userDetails.getId());
		userBean.setFlag(userDetails.isFlag());
		userBean.setIndustry(userDetails.getIndustry());
		userBean.setLastname(userDetails.getLastname());
		userBean.setLocation(userDetails.getLocation());
		userBean.setUpdateDate(userDetails.getUpdateDate());
		userBean.setUsername(userDetails.getUsername());
		userBean.setRole(userDetails.getRole());
		return userBean;
	}

	@Override
	public boolean promoteUsersToAdmin(String listOfIds) {
		boolean flag = false;
		try{
				String newString = listOfIds.substring(1);
				newString = newString.substring(0, newString.length()-2);
				newString = newString.replaceAll("\\n", "");
				String arr[] = newString.split(",");
				for(String val : arr){
					String arrTwo[] = val.split(":");
					String userId = arrTwo[1];
					if(userDao.promoteUserToAdmin(userId)){
						flag = true;
					}else{
						flag = false;
						break;
					}
				}
		}catch(Exception e){
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public UserBean loadUserDetailsByUsername(String username,String password) {
		UserBean userBean = new UserBean();
		try{
			UserDetails userDetails = userDao.findUserDetailByUserName(username);
			if(username.equals(userDetails.getUsername())&&password.equals(userDetails.getPassword())){
				if(StringUtils.isNotBlank(userDetails.getBirthday())){
					userBean.setBirthday(userDetails.getBirthday());
				}
				if(StringUtils.isNotBlank(userDetails.getCreationDate())){
					userBean.setCreationDate(userDetails.getCreationDate());
				}
				if(StringUtils.isNotBlank(userDetails.getEmail())){
					userBean.setEmail(userDetails.getEmail());
				}
				if(StringUtils.isNotBlank(userDetails.getFirstname())){
					userBean.setFirstname(userDetails.getFirstname());
				}
				if(StringUtils.isNotBlank(userDetails.getGender())){
					userBean.setGender(userDetails.getGender());
				}
				if(StringUtils.isNotBlank(userDetails.getId())){
					userBean.setId(userDetails.getId());
				}
				if(StringUtils.isNotBlank(userDetails.getIndustry())){
					userBean.setIndustry(userDetails.getIndustry());
				}
				if(StringUtils.isNotBlank(userDetails.getLastname())){
					userBean.setLastname(userDetails.getLastname());
				}
				if(StringUtils.isNotBlank(userDetails.getLocation())){
					userBean.setLocation(userDetails.getLocation());
				}
				if(StringUtils.isNotBlank(userDetails.getProviderUserId())){
					userBean.setProviderUserId(userDetails.getProviderUserId());
				}
				if(StringUtils.isNotBlank(userDetails.getRole())){
					userBean.setRole(userDetails.getRole());
				}
				if(StringUtils.isNotBlank(userDetails.getUpdateDate())){
					userBean.setUpdateDate(userDetails.getUpdateDate());
				}
				if(StringUtils.isNotBlank(username)){
					userBean.setUsername(username);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return userBean;
	}

	@Override
	public UserBean loadUserBeanByUsername(String username) {
		UserBean userBean = new UserBean();
		try{
			UserDetails userDetails = userDao.findUserDetailByUserName(username);
			if (StringUtils.isNotBlank(userDetails.getBirthday())) {
				userBean.setBirthday(userDetails.getBirthday());
			}
			if (StringUtils.isNotBlank(userDetails.getCreationDate())) {
				userBean.setCreationDate(userDetails.getCreationDate());
			}
			if (StringUtils.isNotBlank(userDetails.getEmail())) {
				userBean.setEmail(userDetails.getEmail());
			}
			if (StringUtils.isNotBlank(userDetails.getFirstname())) {
				userBean.setFirstname(userDetails.getFirstname());
			}
			if (StringUtils.isNotBlank(userDetails.getGender())) {
				userBean.setGender(userDetails.getGender());
			}
			if (StringUtils.isNotBlank(userDetails.getId())) {
				userBean.setId(userDetails.getId());
			}
			if (StringUtils.isNotBlank(userDetails.getIndustry())) {
				userBean.setIndustry(userDetails.getIndustry());
			}
			if (StringUtils.isNotBlank(userDetails.getLastname())) {
				userBean.setLastname(userDetails.getLastname());
			}
			if (StringUtils.isNotBlank(userDetails.getLocation())) {
				userBean.setLocation(userDetails.getLocation());
			}
			if (StringUtils.isNotBlank(userDetails.getProviderUserId())) {
				userBean.setProviderUserId(userDetails.getProviderUserId());
			}
			if (StringUtils.isNotBlank(userDetails.getRole())) {
				userBean.setRole(userDetails.getRole());
			}
			if (StringUtils.isNotBlank(userDetails.getUpdateDate())) {
				userBean.setUpdateDate(userDetails.getUpdateDate());
			}
			if (StringUtils.isNotBlank(username)) {
				userBean.setUsername(username);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return userBean;
	}

	@Override
	public QuestionEntity getSecurityQuestionByUsername(String username) {
		QuestionEntity qentity = null;
		try{
			qentity = userDao.getSecQuestionsForUserId(username);
		}catch(Exception e){
			e.printStackTrace();
		}return qentity;
	}

	@Override
	public boolean updatePasswordForUser(String username, String password) {
		boolean flag = false;
		try{
			flag = userDao.updatePasswordForUsername(username,password);
		}catch(Exception e){
			e.printStackTrace();
		}
		return flag;
	}
}

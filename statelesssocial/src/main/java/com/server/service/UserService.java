package com.server.service;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.social.connect.ConnectionKey;
import org.springframework.social.security.SocialUserDetailsService;

import com.server.beans.RegistrationModel;
import com.server.beans.UserBean;
import com.server.entity.QuestionEntity;
import com.server.entity.User;

public interface UserService extends SocialUserDetailsService, UserDetailsService {
    User loadUserByConnectionKey(ConnectionKey connectionKey);
    User loadUserByUserId(String userId);
    User loadUserByUsername(String username);
    UserBean loadUserBeanByUsername(String username);
    void updateUserDetails(User user);
    User loadUserByToken(String token);
	int returnCountOfUsers();
	boolean saveUser(UserBean user, HttpServletRequest httpServletRequest);	
	int countOfUsersRegistered();
	ArrayList<UserBean> getAllUsers();
	boolean registerNewUser(RegistrationModel registrationModel);
	com.server.entity.User findByProviderIdAndProviderUserId(String providerId, String providerUserId);
	boolean userAlreadyExists(String userId);
	UserBean findByProviderUserId(String providerUserId);
	boolean promoteUsersToAdmin(String listOfIds);
	UserBean loadUserDetailsByUsername(String username,String password);
	QuestionEntity getSecurityQuestionByUsername(String username);
	boolean updatePasswordForUser(String username,String password);
}

package com.server.dao;

import java.util.List;

import com.server.entity.QuestionEntity;
import com.server.entity.User;
import com.server.entity.UserDetails;

public interface DatabaseDao{

	com.server.entity.User findByUsername(String username);

	com.server.entity.User findById(String userId);

	com.server.entity.User findByProviderIdAndProviderUserId(String providerId, String providerUserId);

	com.server.entity.User findUserByToken(String token);
	
	boolean save(User user);

	List<User> findAll();

	void updateUser(User user);
	
	int returnUserCount();
	
	UserDetails findByProviderUserId(String providerUserId);
	
	boolean saveUser(UserDetails user);
	
	boolean userAlreadyExists(String userId);
	
	int countUserRegistered();
	
	List<UserDetails> getAllUserList();

	boolean updateUserTokens(String userName, String accessToken, String expireTime);
	
	boolean promoteUserToAdmin(String userId);
	
	UserDetails findUserDetailByUserName(String username);

	QuestionEntity getSecQuestionsForUserId(String uid);
	
	boolean saveQuestionDetails(QuestionEntity quesEntity);
	
	boolean updatePasswordForUsername(String username,String password);
}

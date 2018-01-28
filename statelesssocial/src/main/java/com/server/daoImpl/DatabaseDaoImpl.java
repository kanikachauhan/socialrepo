package com.server.daoImpl;

import java.io.Serializable;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.server.entity.QuestionEntity;
import com.server.entity.User;
import com.server.beans.UserBean;
import com.server.dao.DatabaseDao;
import com.server.entity.UserDetails;
import com.server.utils.Constants;

@Repository("userDao")
public class DatabaseDaoImpl implements DatabaseDao {
	private static final Logger logger = Logger.getLogger(DatabaseDaoImpl.class);
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	@Transactional
	public User findByUsername(String username) {
		try {
			Session session = this.sessionFactory.getCurrentSession();
			Query query = session.createQuery("from User where username=:username");
			logger.info("Query for findByUsername " + query.getQueryString());
			query.setParameter("username", username);
			List<User> list = query.getResultList();
			if (list.size() == 1) {
				logger.info("User found with username " + username);
				return list.get(0);
			}
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return null;
	}

	@Override
	@Transactional
	public User findById(String id) {
		try {
			Session session = this.sessionFactory.getCurrentSession();
			Query query = session.createQuery("from User where id=:id");
			logger.info("Query for findById " + query.getQueryString());
			query.setParameter("id", id);
			List<User> list = query.getResultList();
			if (list.size() == 1) {
				logger.info("User found with id " + id);
				return list.get(0);
			}
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return null;
	}

	@Override
	@Transactional
	public User findByProviderIdAndProviderUserId(String providerId, String providerUserId) {
		try {
			Session session = this.sessionFactory.getCurrentSession();
			Query query = session
					.createQuery("from User where providerId=:providerId and providerUserId=:providerUserId");
			logger.info("Query for findByProviderIdAndProviderUserId " + query.getQueryString());
			query.setParameter("providerId", providerId);
			query.setParameter("providerUserId", providerUserId);
			List<User> list = query.getResultList();
			if (list.size() == 1) {
				logger.info("User found with providerId " + providerId + " providerUserId " + providerUserId);
				return list.get(0);
			}
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return null;
	}

	@Override
	@Transactional
	public boolean save(User user) {
		boolean flag = false;
		try {
			Session session = this.sessionFactory.getCurrentSession();
			session.persist(user);
			flag = true;
			logger.info("User Info Saved ");
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return flag;
	}

	@Override
	public List<User> findAll() {
		return null;
	}

	@Override
	@Transactional
	public void updateUser(User user) {
		try {
			Session session = this.sessionFactory.getCurrentSession();
			session.saveOrUpdate(user);
			logger.info("User Info Updated ");
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
	}

	@Override
	@Transactional
	public User findUserByToken(String token) {
		try {
			Session session = this.sessionFactory.getCurrentSession();
			Query query = session.createQuery("from User where accessToken=:accessToken");
			logger.info("Query created " + query.getQueryString());
			query.setParameter("accessToken", token);
			List<User> userList = query.getResultList();
			if (userList.size() == 1) {
				logger.info("user found with token " + token);
				return userList.get(0);
			}
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return new User();
	}

	@Override
	@Transactional
	public int returnUserCount() {
		try {
			Session session = this.sessionFactory.getCurrentSession();
			Integer count = ((Long) session.createQuery("select count(*) from User").uniqueResult()).intValue();
			logger.info("count of users  " + count);
			if (count != null) {
				return count;
			}
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return 0;
	}

	@Override
	@Transactional
	public UserDetails findByProviderUserId(String providerUserId) {
		try {

			Session session = this.sessionFactory.getCurrentSession();
			Query query = session.createQuery("from UserDetails where providerUserId=:providerUserId");
			logger.info("Query created :" + query.getQueryString());
			query.setParameter("providerUserId", providerUserId);
			List<UserDetails> list = query.getResultList();
			if (list.size() == 1) {
				logger.info("User found with providerUserId :" + providerUserId);
				UserDetails userDetails = list.get(0);
				return userDetails;
			}
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return new UserDetails();
	}

	@Override
	@Transactional
	public boolean saveUser(UserDetails user) {
		boolean flag = false;
		try {
			Session session = this.sessionFactory.getCurrentSession();
			session.saveOrUpdate(user);
			logger.info("user update done");
			flag = true;
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return flag;
	}

	@Override
	@Transactional
	public boolean userAlreadyExists(String userId) {
		try {
			Session currentSession = this.sessionFactory.getCurrentSession();
			org.hibernate.query.Query createQuery = currentSession
					.createQuery("select count(1) from UserDetails where providerUserId=:providerUserId");
			createQuery.setParameter("providerUserId", userId);
			logger.info("Query created " + createQuery.getQueryString());
			Long counts = (Long) createQuery.uniqueResult();
			return counts.intValue() == 1 ? true : false;
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return false;
	}

	@Override
	@Transactional
	public int countUserRegistered() {
		try {
			Session session = this.sessionFactory.getCurrentSession();
			Integer count = ((Long) session.createQuery("select count(*) from UserDetails").uniqueResult()).intValue();
			logger.info("User count found " + count);
			if (count != null) {
				return count;
			}
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return 0;
	}

	@Override
	@Transactional
	public List<UserDetails> getAllUserList() {
		try {
			Session session = this.sessionFactory.getCurrentSession();
			org.hibernate.query.Query createQuery = session.createQuery("from UserDetails", UserDetails.class);
			logger.info("Query Created " + createQuery.getQueryString());
			List<UserDetails> UserDetailsList = createQuery.getResultList();
			logger.info("Number of users found in list " + UserDetailsList.size());
			logger.info("User List :" + UserDetailsList);
			return UserDetailsList;
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return null;
	}

	@Override
	@Transactional
	public boolean updateUserTokens(String userName, String accessToken, String expireTime) {
		try {
			Session session = this.sessionFactory.getCurrentSession();
			org.hibernate.query.Query createQuery = session.createQuery(
					"update User set accessToken=:accessToken,expireTime=:expireTime where username=:userName");
			logger.info("Query Created " + createQuery.getQueryString());
			createQuery.setParameter("userName", userName);
			createQuery.setParameter("accessToken", accessToken);
			createQuery.setParameter("expireTime", expireTime);
			int update = createQuery.executeUpdate();
			logger.info("update status " + update);
			return update == 1;
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return false;
	}

	@Override
	@Transactional
	public boolean promoteUserToAdmin(String userId) {
		boolean flag = false;
		try {
			Session session = this.sessionFactory.getCurrentSession();
			org.hibernate.query.Query createQuery = session
					.createQuery("update UserDetails set role=:role where id=:id");
			logger.info("Query Created " + createQuery.getQueryString());
			createQuery.setParameter("role", Constants.ADMIN);
			createQuery.setParameter("id", userId);
			int update = createQuery.executeUpdate();
			flag = (update == 1);
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return flag;
	}

	@Override
	@Transactional
	public UserDetails findUserDetailByUserName(String username) {
		UserDetails userDetails = null;
		try {
			Session session = this.sessionFactory.getCurrentSession();
			Query createQuery = session.createQuery("from UserDetails where username=:username", UserDetails.class);
			logger.info("Query Created " + createQuery.getQueryString());
			createQuery.setParameter("username", username);
			List<UserDetails> list = createQuery.getResultList();
			if (list.size() == 1) {
				logger.info("User found with providerUserId :" + username);
				userDetails = list.get(0);
			}
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return userDetails;
	}
	

	@Override
	@Transactional
	public QuestionEntity getSecQuestionsForUserId(String uid){
		QuestionEntity questionEntity = null;
		try {
			Session session = this.sessionFactory.getCurrentSession();
			Query createQuery = session.createQuery("from QuestionEntity where user_id=:uid", QuestionEntity.class);
			logger.info("Query Created " + createQuery.getQueryString());
			createQuery.setParameter("uid", uid);
			List<QuestionEntity> list = createQuery.getResultList();
			if (list.size() == 1) {
				logger.info("User found with providerUserId :" + uid);
				questionEntity = list.get(0);
			}
		} catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return questionEntity;
	}

	@Override
	@Transactional
	public boolean saveQuestionDetails(QuestionEntity quesEntity) {
		boolean flag = false;
		try{
			Session session = this.sessionFactory.getCurrentSession();
			session.saveOrUpdate(quesEntity);
			logger.info("Question Saved");
			flag = true;
		}catch (Exception e) {
			logger.error("Exception Occured: ", e);
		}
		return flag;
	}

	@Override
	@Transactional
	public boolean updatePasswordForUsername(String username, String password) {
		try{
			Session session = this.sessionFactory.getCurrentSession();
			org.hibernate.query.Query createQuery = session.createQuery(
					"update UserDetails set password=:password where username=:username");
			logger.info("Query Created " + createQuery.getQueryString());
			createQuery.setParameter("username", username);
			createQuery.setParameter("password", password);
			int update = createQuery.executeUpdate();
			logger.info("update status " + update);
			return update == 1;
		}catch(Exception e){
			logger.error("Exception Occured: ", e);
		}
		return false;
	}

}

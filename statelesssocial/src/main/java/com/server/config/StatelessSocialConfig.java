package com.server.config;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.env.Environment;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
import org.springframework.social.UserIdSource;
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurerAdapter;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.ConnectionSignUp;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.github.api.GitHub;
import org.springframework.social.github.connect.GitHubConnectionFactory;
import org.springframework.social.google.api.Google;
import org.springframework.social.google.connect.GoogleConnectionFactory;
import org.springframework.social.linkedin.api.LinkedIn;
import org.springframework.social.linkedin.connect.LinkedInConnectionFactory;
import org.springframework.social.live.api.Live;
import org.springframework.social.live.connect.LiveConnectionFactory;
import org.springframework.social.twitter.api.Twitter;

import com.server.beans.CustomUserConnection;
import com.server.security.SimpleUsersConnectionRepository;
import com.server.security.UserAuthenticationUserIdSource;
import com.server.service.UserService;

@Configuration
@EnableSocial
public class StatelessSocialConfig extends SocialConfigurerAdapter {

	private static final Logger logger = Logger.getLogger(StatelessSocialConfig.class);
	@Autowired
	private UserService userService;
	@Autowired
	ConnectionSignUp connectionSignUp;
	@Value(value = "${facebook.appKey}")
	String facebookAppKey;
	@Value(value = "${facebook.appSecret}")
	String facebookAppSecret;
	@Value(value = "${twitter.appId}")
	String twitterAppId;
	@Value(value = "${twitter.appSecret}")
	String twitterAppSecret;
	@Value(value = "${linkedin.appId}")
	String linkedinappId;
	@Value(value = "${linkedin.appSecret}")
	String linkedinappSecret;
	@Value(value = "${google.appId}")
	String googleAppId;
	@Value(value = "${google.appSecret}")
	String googleAppSecret;
	@Autowired
	private CustomUserConnection customConnectionBean;
	@Autowired
	DataSource dataSource;
	@Override
	public void addConnectionFactories(ConnectionFactoryConfigurer cfConfig, Environment env) {
		logger.info("facebook app key "+facebookAppKey);
		logger.info("facebook app secret "+facebookAppSecret);
		cfConfig.addConnectionFactory(new FacebookConnectionFactory(
				facebookAppKey,
				facebookAppSecret));
		logger.info("twitter access token "+twitterAppId);
		logger.info("twitter access secret "+twitterAppSecret);
		cfConfig.addConnectionFactory(new CustomTwitterConnectionFactory(
				twitterAppId,
				twitterAppSecret));
		logger.info("linkedin appId "+linkedinappId);
		logger.info("linkedin appSecret "+linkedinappSecret);
		cfConfig.addConnectionFactory(new LinkedInConnectionFactory(
				linkedinappId,
				linkedinappSecret));
		logger.info("google appId "+googleAppId);
		logger.info("google appSecret "+googleAppSecret);
		cfConfig.addConnectionFactory(new GoogleConnectionFactory(
				googleAppId,
				googleAppSecret));
		
	}

	@Override
	public UserIdSource getUserIdSource() {
		return new UserAuthenticationUserIdSource();
	}

	@Override
	public UsersConnectionRepository getUsersConnectionRepository(ConnectionFactoryLocator connectionFactoryLocator) {
		SimpleUsersConnectionRepository usersConnectionRepository =
				new SimpleUsersConnectionRepository(userService, connectionFactoryLocator);
		usersConnectionRepository.setConnectionSignUp(connectionSignUp);
		customConnectionBean.setConnection(usersConnectionRepository.getConnection());
		return usersConnectionRepository;
	}	
	@Bean
	@Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
	public Facebook facebook(ConnectionRepository repository) {
		Connection<Facebook> connection = repository.findPrimaryConnection(Facebook.class);
		return connection != null ? connection.getApi() : null;
	}
	@Bean
	@Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
	public Twitter twitter(ConnectionRepository repository) {
		Connection<Twitter> connection = repository.findPrimaryConnection(Twitter.class);
		return connection != null ? connection.getApi() : null;
	}
	@Bean
	@Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
	public LinkedIn linkedIn(ConnectionRepository repository) {
		Connection<LinkedIn> connection = repository.findPrimaryConnection(LinkedIn.class);
		return connection != null ? connection.getApi() : null;
	}
	@Bean
	@Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
	public Google google(ConnectionRepository repository) {
		Connection<Google> connection = repository.findPrimaryConnection(Google.class);
		return connection != null ? connection.getApi() : null;
	}
	
}

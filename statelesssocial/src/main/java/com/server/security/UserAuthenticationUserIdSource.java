package com.server.security;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.UserIdSource;

import com.server.entity.User;

public class UserAuthenticationUserIdSource implements UserIdSource {
	private static final Logger logger = Logger.getLogger(UserAuthenticationUserIdSource.class);
	@Override
	public String getUserId() {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		logger.info("authentication from UserAuthenticationUserIdSource "+authentication);
		User user = null;
		if (authentication instanceof UserAuthentication) {
			user = (User) authentication.getPrincipal();
		}

		if (user == null) {
			throw new IllegalStateException("Unable to get a ConnectionRepository: no user signed in");
		}
		return user.getUserId();
	}
}

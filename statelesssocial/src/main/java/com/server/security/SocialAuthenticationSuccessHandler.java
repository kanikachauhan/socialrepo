package com.server.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.server.entity.User;
import com.server.service.TokenAuthenticationService;
import com.server.service.UserService;

@Component
public class SocialAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	private static final Logger logger = Logger.getLogger(SocialAuthenticationSuccessHandler.class);
	@Autowired
	private TokenAuthenticationService tokenAuthenticationService;

	@Autowired
	private UserService userService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws ServletException, IOException {
		final User authenticatedUser = userService.loadUserByUsername(authentication.getName());
		logger.info("authenticated use with user name "+authenticatedUser.getUsername());
		final UserAuthentication userAuthentication = new UserAuthentication(authenticatedUser);
		tokenAuthenticationService.addAuthentication(request,response, userAuthentication);
		super.onAuthenticationSuccess(request, response, authentication);
	}
}

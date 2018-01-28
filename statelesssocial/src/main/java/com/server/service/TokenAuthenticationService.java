package com.server.service;

import java.util.regex.Pattern;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.server.entity.User;
import com.server.security.TokenHandler;
import com.server.security.UserAuthentication;
import com.server.utils.Constants;

@Service
public class TokenAuthenticationService {
	
	private static final String AUTH_COOKIE_NAME = "AUTH-TOKEN";
	private static final String AUTH_HEADER_NAME = "x-auth-token";
	private static final String PROVIDER_COOKIE = "provider_cookie";
	private static final String LINKEDIN_CODE = "linkedin_code";
	private static final long TEN_DAYS = 1000 * 60 * 60 * 24 * 10;
	private String providerId = "";
	private final TokenHandler tokenHandler;

	@Autowired
	public TokenAuthenticationService(@Value("${token.secret}") String secret) {
		tokenHandler = new TokenHandler(DatatypeConverter.parseBase64Binary(secret));
	}

	public void addAuthentication(HttpServletRequest request,HttpServletResponse response, UserAuthentication authentication) {
		final User user = authentication.getDetails();
		user.setExpires(System.currentTimeMillis() + TEN_DAYS);
		final String token = tokenHandler.createTokenForUser(user);
		response.addCookie(createCookieForToken(token));
		String requestStr = request.getRequestURI();
		if(requestStr.endsWith(Constants.PROVIDER_FACEBOOK)){
			providerId = Constants.PROVIDER_FACEBOOK;
		}
		if(requestStr.endsWith(Constants.PROVIDER_TWITTER)){
			providerId = Constants.PROVIDER_TWITTER;
		}
		if(requestStr.endsWith(Constants.PROVIDER_LINKEDIN)){
			providerId = Constants.PROVIDER_LINKEDIN;
		}
		if(requestStr.contains(Constants.PROVIDER_GOOGLE)){
			providerId = Constants.PROVIDER_GOOGLE;
		}
		if(requestStr.contains(Constants.PROVIDER_USER)){
			providerId = Constants.PROVIDER_USER;
		}
		response.addCookie(createCookieForProvider(providerId));
	}

	public UserAuthentication getAuthentication(HttpServletRequest request) {
		String requestStr = request.toString();
		final String token = request.getHeader(AUTH_HEADER_NAME);
		if (token != null) {
			final User user = tokenHandler.parseUserFromToken(token);
			if (user != null) {
				return new UserAuthentication(user);
			}
		}
		return null;
	}

	private Cookie createCookieForToken(String token) {
		final Cookie authCookie = new Cookie(AUTH_COOKIE_NAME, token);
		authCookie.setPath("/");
		return authCookie;
	}
	private Cookie createCookieForProvider(String providerId){
		final Cookie authCookie = new Cookie(PROVIDER_COOKIE, providerId);
		authCookie.setPath("/");
		return authCookie;
	}
	public Cookie createCookieForLinkedinCode(String linkedinCode){
		final Cookie authCookie = new Cookie(LINKEDIN_CODE, linkedinCode);
		authCookie.setPath("/");
		return authCookie;
	}
}

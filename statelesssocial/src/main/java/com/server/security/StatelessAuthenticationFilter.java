package com.server.security;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import com.server.service.TokenAuthenticationService;

@Component
public class StatelessAuthenticationFilter extends GenericFilterBean {
	@Autowired
	private TokenAuthenticationService tokenAuthenticationService;
	String code = "";
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
			ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest)request;
		if(httpServletRequest.getRequestURI().contains("/auth/linkedin")){
		Enumeration um = request.getParameterNames();
			while (um.hasMoreElements()) {
				String str = um.nextElement().toString();
				if (str.equalsIgnoreCase("code")) {
					code = request.getParameter(str);
					tokenAuthenticationService.createCookieForLinkedinCode(code);
					break;
				}
			}
		}
		setAuthenticationFromHeader(httpServletRequest);
		chain.doFilter(request, response);
	}

	private void setAuthenticationFromHeader(HttpServletRequest request) {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof UserAuthentication)) {
			final UserAuthentication userAuthentication = tokenAuthenticationService.getAuthentication(request);
			if (userAuthentication != null) {
				SecurityContextHolder.getContext().setAuthentication(userAuthentication);
			}
		}
	}
}
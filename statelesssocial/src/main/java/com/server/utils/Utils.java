package com.server.utils;

import java.util.Enumeration;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class Utils {

	public static boolean isExpired(Long currtimeOfSystem, Long expireTimefromDB) {
		boolean flag = false;
		try {
			if (expireTimefromDB < currtimeOfSystem) {
				flag = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	public static String getTokenFromRequest(HttpServletRequest request) {
		String token = "";
		try {
			if (request != null) {
				Enumeration headerNames = request.getHeaderNames();

				while (headerNames.hasMoreElements()) {
					String header = (String) headerNames.nextElement();
					if (header.equals("x-auth-token")) {
						token = request.getHeader(header);
						break;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return token;
	}

	
	public static String getProviderIdfromCookie(HttpServletRequest httpServletRequest) {
		String providerCookie = "";
		try{
			Cookie cookies[]= httpServletRequest.getCookies();
			for(Cookie cook:cookies){
				
				if(cook.getName().equalsIgnoreCase(Constants.PROVIDER_COOKIE))
				{
					providerCookie = cook.getValue();
					break;
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return providerCookie;
	}
}

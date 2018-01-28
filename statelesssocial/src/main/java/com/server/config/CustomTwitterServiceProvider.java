package com.server.config;

import org.apache.log4j.Logger;
import org.springframework.social.oauth1.AbstractOAuth1ServiceProvider;
import org.springframework.social.oauth1.OAuth1Template;
import org.springframework.social.oauth1.OAuth1Version;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.social.twitter.api.impl.TwitterTemplate;

public class CustomTwitterServiceProvider extends AbstractOAuth1ServiceProvider<Twitter>{
	private static final Logger logger = Logger.getLogger(CustomTwitterServiceProvider.class);
	public CustomTwitterServiceProvider(String consumerKey, String consumerSecret) {
		super(consumerKey, consumerSecret, new OAuth1Template(consumerKey, consumerSecret,
			"https://api.twitter.com/oauth/request_token",
			"https://api.twitter.com/oauth/authorize",
			"https://api.twitter.com/oauth/authenticate",			
			"https://api.twitter.com/oauth/access_token",OAuth1Version.CORE_10_REVISION_A));
	}
	
	@Override
	public Twitter getApi(String accessToken, String secret) {
		logger.info("CustomTwitterServiceProvider "+accessToken+","+secret);
		return new TwitterTemplate(getConsumerKey(), getConsumerSecret(), accessToken, secret);
	}

}

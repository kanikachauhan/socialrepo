package com.server.config;

import org.apache.log4j.Logger;
import org.springframework.social.connect.support.OAuth1ConnectionFactory;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.social.twitter.connect.TwitterAdapter;

public class CustomTwitterConnectionFactory extends OAuth1ConnectionFactory<Twitter> {
	public CustomTwitterConnectionFactory(String consumerKey, String consumerSecret) {
		super("twitter", new CustomTwitterServiceProvider(consumerKey, consumerSecret), new TwitterAdapter());
	}

}

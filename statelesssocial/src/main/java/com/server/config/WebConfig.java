package com.server.config;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
@Configuration
@EnableWebMvc
@Order(2)
public class WebConfig extends WebMvcConfigurerAdapter {
	private static final Logger logger = Logger.getLogger(WebConfig.class);
	@Value(value = "${host.allowedUrls}")
    private String origins;
	@Override
    public void addCorsMappings(CorsRegistry registry) {
		logger.info("Cors for orign "+origins);
        registry.addMapping("/**/**").allowedOrigins(origins);
    }
	
}

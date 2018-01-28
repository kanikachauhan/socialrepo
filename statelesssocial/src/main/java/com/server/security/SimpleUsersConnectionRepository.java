package com.server.security;

import org.apache.log4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.social.connect.*;
import org.springframework.social.connect.mem.TemporaryConnectionRepository;

import com.server.entity.User;
import com.server.service.UserService;

import java.util.*;

/**
 * A Simplified version of the JdbcUsersConnectionRepository that does not persist multiple connections to/from users.
 * This repository works with a one-to-one relation between between User and Connection
 * Note that it uses the JPA based UserService so no custom SQL is used
 */
public class SimpleUsersConnectionRepository implements UsersConnectionRepository {
	private static final Logger logger = Logger.getLogger(AutoSignUpHandler.class);
    private UserService userService;
    private ConnectionFactoryLocator connectionFactoryLocator;
    private ConnectionSignUp connectionSignUp;
    private Connection connection;
    public SimpleUsersConnectionRepository(UserService userService, ConnectionFactoryLocator connectionFactoryLocator) {
        this.userService = userService;
        this.connectionFactoryLocator = connectionFactoryLocator;
    }

    @Override
    public List<String> findUserIdsWithConnection(Connection<?> connection) {
        try {
            User user = userService.loadUserByConnectionKey(connection.getKey());
            ConnectionData createData = connection.createData();
            logger.info("User loaded by Connection Key with user Id "+user.getId());
			user.setAccessToken(createData.getAccessToken());
            userService.updateUserDetails(user);
            return Arrays.asList(user.getUserId());
        } catch (AuthenticationException ae) {
            return Arrays.asList(connectionSignUp.execute(connection));
        }
    }

    @Override
    public Set<String> findUserIdsConnectedTo(String providerId, Set<String> providerUserIds) {
        Set<String> keys = new HashSet<>();
        for (String userId: providerUserIds) {
            ConnectionKey ck = new ConnectionKey(providerId, userId);
            try {
                keys.add(userService.loadUserByConnectionKey(ck).getUserId());
            } catch (AuthenticationException ae) {
            }
        }
        return keys;
    }

    @Override
    public ConnectionRepository createConnectionRepository(String userId) {
        final ConnectionRepository connectionRepository = new TemporaryConnectionRepository(connectionFactoryLocator);
        final User user = userService.loadUserByUserId(userId);
        logger.info("User loaded with user id "+userId);
        final ConnectionData connectionData = new ConnectionData(
                user.getProviderId(),
                user.getProviderUserId(),
                null, null, null,
                user.getAccessToken(),
                user.getSecret(), null, null);  

        connection = connectionFactoryLocator
                .getConnectionFactory(user.getProviderId()).createConnection(connectionData);
        connectionRepository.addConnection(connection);
        return connectionRepository;
    }

    public void setConnectionSignUp(ConnectionSignUp connectionSignUp) {
        this.connectionSignUp = connectionSignUp;
    }
    public Connection getConnection(){
    	return this.connection;
    }
}

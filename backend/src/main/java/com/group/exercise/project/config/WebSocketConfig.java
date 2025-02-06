package com.group.exercise.project.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${project.frontent.address}")
    private String FRONT_HOST;

    @Override
    public void registerStompEndpoints(
            @SuppressWarnings("null") StompEndpointRegistry registry) {
        registry
                .addEndpoint("/gs-guide-websocket")
                .setAllowedOrigins(FRONT_HOST);
    }

    @Override
    public void configureMessageBroker(
            @SuppressWarnings("null") MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

}
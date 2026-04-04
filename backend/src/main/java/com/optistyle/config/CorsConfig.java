package com.optistyle.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow the React frontend to communicate with API
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000", 
            "http://localhost:3001", 
            "http://localhost:3002", 
            "http://localhost:3003", 
            "http://localhost:5173"
        ));
        config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L); // 1 hour
        
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}

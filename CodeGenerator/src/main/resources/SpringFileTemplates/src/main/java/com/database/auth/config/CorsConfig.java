package com.#{ALL_SCHEMA_NAME}#.api.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CorsConfig {
//    @Bean
//    public WebMvcConfigurer corsConfigurer(){
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**").allowedOriginPatterns("http://localhost:3000").allowCredentials(true);
//            }
//        };
//    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        // Whether to allow requests with verification information
        config.setAllowCredentials(true);

        // Client domain name that is allowed to be accessed
        // (Springboot2.4 and above can solve the problem of allowedOrigins cannot contain the special value "*" by adding this paragraph)
        List<String> allowedOriginPatterns = new ArrayList<>();
        allowedOriginPatterns.add("*");
        config.setAllowedOriginPatterns(allowedOriginPatterns);

        // Set the access source address
        // config.addAllowedOrigin("*");
        // Set the access source request header
        config.addAllowedHeader("*");
        // Set the access source request method
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
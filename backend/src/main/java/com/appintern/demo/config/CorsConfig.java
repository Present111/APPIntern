package com.appintern.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.Duration;
import java.util.Arrays;

@Configuration
public class CorsConfig {

    // Lấy danh sách origin từ properties. Ví dụ:
    // app.cors.allowed-origins=http://localhost:5173,https://appintern-6.onrender.com,https://*.vercel.app
    // hoặc app.cors.allowed-origins=*
    @Value("${app.cors.allowed-origins:*}")
    private String allowedOrigins;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();

        // Nếu bạn dùng jwt Bearer (không xài cookie) có thể để false.
        // Nếu bạn dùng cookie/session, để true và KHÔNG dùng "*" với setAllowedOrigins.
        cfg.setAllowCredentials(false);

        for (String origin : Arrays.stream(allowedOrigins.split(","))
                .map(String::trim).filter(s -> !s.isEmpty()).toList()) {

            // hỗ trợ wildcard (*, *.domain.com)
            cfg.addAllowedOriginPattern(origin);
        }

        cfg.setAllowedMethods(Arrays.asList("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
        cfg.setAllowedHeaders(Arrays.asList("Authorization","Content-Type","X-Requested-With","Accept"));
        cfg.setExposedHeaders(Arrays.asList("Authorization"));
        cfg.setMaxAge(Duration.ofHours(1)); // cache preflight 1h

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}

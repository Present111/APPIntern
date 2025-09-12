package com.appintern.demo.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    // Tên scheme dùng bên dưới và trong @SecurityRequirement
    private static final String BEARER_KEY = "bearerAuth";

    @Bean
    public OpenAPI api() {
        return new OpenAPI()
                .info(new Info()
                        .title("App Intern API")
                        .description("Swagger UI với JWT Bearer")
                        .version("v1"))
                // Khai báo scheme Bearer JWT
                .components(new Components()
                        .addSecuritySchemes(BEARER_KEY,
                                new SecurityScheme()
                                        .name(BEARER_KEY)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                // Yêu cầu bảo mật mặc định (các API cần JWT)
                .addSecurityItem(new SecurityRequirement().addList(BEARER_KEY));
    }
}

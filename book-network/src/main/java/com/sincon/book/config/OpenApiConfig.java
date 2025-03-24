package com.sincon.book.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
    info = @Info(
        contact = @Contact(
            name = "Mattia",
            email = "contact@sincon.com",
            url = "https://sincon.com"
        ),
        description = "OpenApi documentation for Spring Security",
        title = "OpenApi specification",
        version = "1.0.0",
        license = @License(
            name = "Licence name",
            url = "http://some-url.com"
        ),
        termsOfService = "Terms of Service"
    ),
    servers = {
        @Server(
            description = "Local ENV",
            url = "http://localhost:8088/api/v1"
        ),
        @Server(
            description = "Production ENV",
            url = "https://api.sincon.com/api/v1"
        )
    },
    security = {
        @SecurityRequirement(
            name = "BearerAuth"
        )
    }
)
@SecurityScheme(
    name = "BearerAuth",
    description = "JWT auth description",
    scheme = "bearer",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {}

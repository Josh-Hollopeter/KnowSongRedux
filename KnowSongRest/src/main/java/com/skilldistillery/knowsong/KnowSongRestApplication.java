package com.skilldistillery.knowsong;

import java.util.Collections;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class KnowSongRestApplication extends WebSecurityConfigurerAdapter{
	
	 @Override
	    protected void configure(HttpSecurity http) throws Exception {
	    	// @formatter:off
	        http
	            .authorizeRequests(a -> a
	                .antMatchers("/", "/error", "/webjars/**").permitAll()
	                .anyRequest().authenticated()
	            )
	            .exceptionHandling(e -> e
	                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
	            )
	            .logout(l -> l
	                    .logoutSuccessUrl("/").permitAll()
	            )
	            .csrf(c -> c
	                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
	                    )
	            .oauth2Login();
	        // @formatter:on
	    }
	 
	 
//	 @Override
//	    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//	        return application.sources(KnowSongRestApplication.class);
//	    }

	public static void main(String[] args) {
		SpringApplication.run(KnowSongRestApplication.class, args);
		
		
	}
//	@Bean
//	public PasswordEncoder configurePasswordEncoder() {
//		return new BCryptPasswordEncoder();
//	}

}

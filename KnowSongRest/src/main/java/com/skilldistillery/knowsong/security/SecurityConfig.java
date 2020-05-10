package com.skilldistillery.knowsong.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.repositories.UserRepository;
import com.skilldistillery.knowsong.services.CustomOAuth2UserService;
import com.skilldistillery.knowsong.services.MyUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomOAuth2UserService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	// @formatter:off
        http
            .authorizeRequests(a -> a
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
            )
            .exceptionHandling(e -> e
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            )
            .csrf(c -> c
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                    )
            .oauth2Login()
            	.userInfoEndpoint()
            			.userService(userService) // upon login, user information is opened in this service. conditionals applied in here
            	.and()
            			
//            		.
//            		.customUserType(new User(), clientRegistrationId)
//            	.redirectionEndpoint()
//            		.baseUri("")
//            	.and()
            	.defaultSuccessUrl("http://localhost:4200/home")
            	.failureUrl("http://localhost:4200");
        // @formatter:on
    }

   
}
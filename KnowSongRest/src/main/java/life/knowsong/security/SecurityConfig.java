package life.knowsong.security;

import java.util.Arrays;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler;
import org.springframework.security.oauth2.core.http.converter.OAuth2AccessTokenResponseHttpMessageConverter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import life.knowsong.repositories.UserRepository;
import life.knowsong.services.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomOAuth2UserService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests(a -> a
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                
            )
            .exceptionHandling(e -> e
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            )
//            .oauth2ResourceServer().authenticationManagerResolver(authenticationManagerResolver)
            .cors().and()
            .csrf(c -> c
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                    )
            .oauth2Login()
            	.userInfoEndpoint()
            			.userService(userService) // upon login, user information is opened in this service. conditionals applied in here
            	.and()
            	.defaultSuccessUrl("http://localhost:4200/loggedInCallback")
            	.failureUrl("http://localhost:4200");
   
    }
    
//    @Bean
//    public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient(){
//    	DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient = 
//    	          new DefaultAuthorizationCodeTokenResponseClient(); 
//    	        accessTokenResponseClient.setRequestEntityConverter(new CustomRequestEntityConverter()); 
//    	 
//    	        OAuth2AccessTokenResponseHttpMessageConverter tokenResponseHttpMessageConverter = 
//    	          new OAuth2AccessTokenResponseHttpMessageConverter(); 
//    	        tokenResponseHttpMessageConverter.setTokenResponseConverter(new CustomTokenResponseConverter()); 
//    	        RestTemplate restTemplate = new RestTemplate(Arrays.asList(
//    	          new FormHttpMessageConverter(), tokenResponseHttpMessageConverter)); 
//    	        restTemplate.setErrorHandler(new OAuth2ErrorResponseErrorHandler()); 
//    	         
//    	        accessTokenResponseClient.setRestOperations(restTemplate); 
//    	
//    	
//    	return accessTokenResponseClient;
//    }
    
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
    	CorsConfiguration configuration = new CorsConfiguration();
    	configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    	configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT"));
    	configuration.setAllowedHeaders(Arrays.asList("Content-Type", "credentials"));
    	configuration.setAllowCredentials(true);
    	
    	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    	source.registerCorsConfiguration("/**", configuration);
    	
    	return source;
    }

   
}
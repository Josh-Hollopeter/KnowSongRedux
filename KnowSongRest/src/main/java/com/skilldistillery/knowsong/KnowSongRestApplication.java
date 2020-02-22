package com.skilldistillery.knowsong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class KnowSongRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(KnowSongRestApplication.class, args);
		
		
	}
	@Bean
	public PasswordEncoder configurePasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}

package com.skilldistillery.knowsong.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.repositories.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> optionalUser = userRepo.findByUsername(username);
		
		optionalUser
		.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
		
//		optionalUser
//		.ifPresent(user -> {
//			new MyUserDetails(user);
//		});
		
		
		return null;
	}

	
	 

}

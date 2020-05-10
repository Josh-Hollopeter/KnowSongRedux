package com.skilldistillery.knowsong.services;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.skilldistillery.knowsong.repositories.UserRepository;

@Component
public class CustomOAuth2UserService extends DefaultOAuth2UserService{

	@Autowired
	UserRepository userRepo;
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
		//create new user object and get the attributes
		OAuth2User oAuth2User = super.loadUser(userRequest);
		Map<String, Object> attributes = oAuth2User.getAttributes();
		System.out.println(attributes);

		// grab username
		String username = (String) attributes.get("id");
		
		// grab image
		// Map -> ArrayList -> LinkedHashMap -> String
		
		@SuppressWarnings("unchecked")
		String imgSource = ( (LinkedHashMap<String,String>) ((ArrayList<LinkedHashMap<String,String>>) attributes.get("images")).get(0)).get("url");	// get first image for your spotify account..

		
		return oAuth2User;
	}
}

package com.skilldistillery.knowsong.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.services.CustomOAuth2UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	CustomOAuth2UserService userService;
	
	
	@SuppressWarnings("unchecked")
	@GetMapping("/user")
    public Map<String, String> user(@AuthenticationPrincipal OAuth2User principal) {
		Map<String, Object> attributes = principal.getAttributes();
		Map<String, String> userPacket = new HashMap<>();
		userPacket.put("username", (String) attributes.get("id"));
		userPacket.put("imgSource", ( (LinkedHashMap<String,String>) ((ArrayList<LinkedHashMap<String,String>>) attributes.get("images")).get(0)).get("url"));
        return userPacket;
    }

//	@GetMapping("/user")
//	public OAuth2User user(@AuthenticationPrincipal OAuth2User principal) {
////		System.out.println(oauth2User.);
//		return principal.getAttribute("id");
//	}

	@GetMapping("/getAccessToken")
	public OAuth2AccessToken accessToken(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
		return authorizedClient.getAccessToken();
	}

//	@GetMapping("/")
//	public OAuth2AuthorizedClient accessToken(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
//		return authorizedClient;
//	}
//	public OAuth2User getCurrentUser() {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		return ((OAuth2AuthenticationToken)auth).getPrincipal();
//	}
}

package com.skilldistillery.knowsong.controllers;

import java.util.Collections;
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

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

//	@GetMapping("/user")
//    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
//        return Collections.singletonMap("username", principal.getAttribute("id"));
//    }

	@GetMapping("/user")
	public OAuth2User user(@AuthenticationPrincipal OAuth2User oauth2User) {
		System.out.println(oauth2User);
		return oauth2User.getAttribute("id");
	}

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

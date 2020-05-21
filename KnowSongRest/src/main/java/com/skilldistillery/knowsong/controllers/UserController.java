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
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.endpoint.DefaultRefreshTokenTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2RefreshTokenGrantRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.services.CustomOAuth2UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@SuppressWarnings("unchecked")
	@GetMapping("/user")
    public Map<String, String> user(@AuthenticationPrincipal OAuth2User principal) {
		Map<String, Object> attributes = principal.getAttributes();
		Map<String, String> userPacket = new HashMap<>();
		userPacket.put("username", (String) attributes.get("id"));
		try {
			userPacket.put("imgSource", ( (LinkedHashMap<String,String>) ((ArrayList<LinkedHashMap<String,String>>) attributes.get("images")).get(0)).get("url"));
		} catch(Exception e) {
			System.out.println("user has no profile photo, not sure what error will look like. feel free to delete this ");
			e.printStackTrace();
		}
        return userPacket;
    }

	@GetMapping("/getAccessToken")
	public OAuth2AccessToken accessToken(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
		System.out.println("Refresh Token: " + authorizedClient.getRefreshToken().getTokenValue());
		System.out.println("Access Token: " + authorizedClient.getAccessToken().getTokenValue());
		return authorizedClient.getAccessToken();
	}
	
	@GetMapping("/refreshAccessToken")
	public OAuth2AccessToken refreshAccessToken(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
		
		OAuth2RefreshTokenGrantRequest grantRequest = new OAuth2RefreshTokenGrantRequest(
				authorizedClient.getClientRegistration(), 
				authorizedClient.getAccessToken(), 
				authorizedClient.getRefreshToken());
		
		DefaultRefreshTokenTokenResponseClient refreshResponseClient = new DefaultRefreshTokenTokenResponseClient();
		
		return refreshResponseClient.getTokenResponse(grantRequest).getAccessToken();
	}
	
	@GetMapping("/isLoggedIn")
	public Boolean isLoggedIn(@AuthenticationPrincipal OAuth2User principal) {
		if(principal != null)
			return true;
		else
			return false;
	}
	
}

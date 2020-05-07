package com.skilldistillery.knowsong.controllers;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.services.OAuth2Service;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class OAuth2Controller {

	private OAuth2Service service;
	
	//constructor
	public OAuth2Controller(OAuth2Service service) {
		this.service = service;
	}
	
	@GetMapping("/user")
	public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
		return Collections.singletonMap("spotifyName", principal.getAttribute("id"));
	}
}

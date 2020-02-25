package com.skilldistillery.knowsong.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.services.AuthService;

@RestController
@CrossOrigin({"*", "http://localhost:4250"})
public class UserController {

	@Autowired
	private AuthService svc;
	
	@GetMapping()
	public void checkAuthToken(Principal principal, HttpRequest request) {
		User user = svc.findUser(principal.getName());
		
		
	}
}

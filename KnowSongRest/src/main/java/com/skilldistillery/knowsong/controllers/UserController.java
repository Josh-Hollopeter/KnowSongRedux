package com.skilldistillery.knowsong.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.services.AuthService;
@RequestMapping(path = "api")
@RestController
@CrossOrigin({"*", "http://localhost:4250"})
public class UserController {

	@Autowired
	private AuthService svc;
	
	@GetMapping()
	public void checkAuthToken(Principal principal, HttpRequest request) {
		User user = svc.findUser(principal.getName());
		
		
	}
	
	@GetMapping("user")
	public User getUser(HttpServletResponse resp, Principal principal) {
		
		try{
			User user = svc.findUser(principal.getName());
			resp.setStatus(200);
			return user;
		}catch(Exception e) {
			resp.setStatus(404);
			return null;
		}
		
	}
}

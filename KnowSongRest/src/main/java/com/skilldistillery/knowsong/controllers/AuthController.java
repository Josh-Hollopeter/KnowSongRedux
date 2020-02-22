package com.skilldistillery.knowsong.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.repositories.RankRepository;
import com.skilldistillery.knowsong.services.AuthService;

@RestController
@CrossOrigin({"*", "http://localhost:4250"})
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	
	
	
	
	@RequestMapping(path = "/register", method = RequestMethod.POST)
	public User register(@RequestBody User user, HttpServletResponse res) {
	

	    if (user == null) {
	        res.setStatus(400);
	    }

	    user = authService.register(user);

	    return user;
	}

	@RequestMapping(path = "/authenticate", method = RequestMethod.GET)
	public Principal authenticate(Principal principal) {
	    return principal;
	}
	
	//------------------------------------------
	//--------------- OAuth2 -------------------
	//------------------------------------------


}

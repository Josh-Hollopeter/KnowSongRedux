package com.skilldistillery.knowsong.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.services.AuthService;
import com.skilldistillery.knowsong.services.UserService;

@RequestMapping(path = "api")
@RestController
@CrossOrigin({ "*", "http://localhost:4250" })
public class UserController {

	@Autowired
	private AuthService svc;
	
	@Autowired
	private UserService uSvc;

	@GetMapping()
	public void checkAuthToken(Principal principal, HttpRequest request) {
		User user = svc.findUser(principal.getName());

	}
	
	@GetMapping("users")
	public List<User> allUsers(Principal principal, HttpRequest request) {
		return uSvc.listAllUsers();
	}

	@GetMapping("user")
	public User getUser(HttpServletResponse resp, Principal principal) {

		try {
			User user = svc.findUser(principal.getName());
			resp.setStatus(200);
			return user;
		} catch (Exception e) {
			resp.setStatus(404);
			return null;
		}

	}
	
	@DeleteMapping("user")
	public void deleteUser(HttpServletResponse resp, Principal principal) {
		if(uSvc.delete(principal)) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
	}
}

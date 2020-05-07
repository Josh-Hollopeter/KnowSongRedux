package com.skilldistillery.knowsong.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.knowsong.entities.User;

public interface UserService {

	boolean changeEnabled(String username);
	
	public List<User> listAllUsers();
	
	public User update(Principal principal, User user);


}

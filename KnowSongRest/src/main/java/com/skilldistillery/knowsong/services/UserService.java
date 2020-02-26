package com.skilldistillery.knowsong.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.knowsong.entities.User;

public interface UserService {

	boolean delete(Principal principal);
	
	public List<User> listAllUsers();

}

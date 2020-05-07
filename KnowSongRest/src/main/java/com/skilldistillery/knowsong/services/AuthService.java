package com.skilldistillery.knowsong.services;

import com.skilldistillery.knowsong.entities.User;

public interface AuthService {
	
	public User registeredUser = null;

//	User register(User user);

	User findUser(String username);

	User save(User user);

}

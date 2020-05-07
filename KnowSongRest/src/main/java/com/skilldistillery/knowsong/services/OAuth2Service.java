package com.skilldistillery.knowsong.services;

import java.util.Optional;

import com.skilldistillery.knowsong.entities.User;

public interface OAuth2Service {

	Optional<User> findById(Integer id);
	
	User save(User user);
	
	Iterable<User> findAll();
}

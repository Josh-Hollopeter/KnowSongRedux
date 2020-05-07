package com.skilldistillery.knowsong.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.repositories.UserRepository;

@Service
public class OAuth2ServiceImpl implements OAuth2Service {

	private UserRepository userRepo;

	//constructor
	public OAuth2ServiceImpl(UserRepository userRepo) {
		this.userRepo = userRepo;
	}
	
	@Override
	public Optional<User> findById(Integer id) {

		return userRepo.findById(id);
	}

	@Override
	public User save(User user) {
		return userRepo.save(user);
	}

	@Override
	public Iterable<User> findAll() {
		return userRepo.findAll();
	}
	
	
}

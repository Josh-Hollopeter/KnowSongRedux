package com.skilldistillery.knowsong.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.knowsong.entities.Rank;
import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.repositories.RankRepository;
import com.skilldistillery.knowsong.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private RankRepository rankRepo;

	@Override
	public User register(User user) {
		String encodedPW = encoder.encode(user.getPassword());

		Rank rank = rankRepo.findById(1).get();
		System.err.println("**************" + rank + "******************");

		user.setRank(rank);
		user.setPassword(encodedPW); // only persist encoded password

		// set other fields to default values
		user.setEnabled(true);
			user.setRole("standard");

		userRepo.saveAndFlush(user);
		return user;
	}

}

package com.skilldistillery.knowsong.services;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	@Override
	public List<User> listAllUsers() {
		System.out.println(userRepo.findAll());
		return userRepo.findAll();

	}

	@Override
	public boolean changeEnabled(String username) {

		User user = null;
		user = userRepo.findByUsername(username);
		if (user != null) {
			user.setEnabled(!user.getEnabled());
			userRepo.save(user);
			return true;
		} else {
			return false;

		}

	}

	@Override
	public User changeUserImage(String username, String imgSource) {

		User user = null;
		user = userRepo.findByUsername(username);
		if (user != null) {
			user.setImgSource(imgSource);
			userRepo.save(user);
			return user;
		} else {
			return user;

		}

	}

	@Override
	public User update(Principal principal, User user) {

		User managedUser = userRepo.findByUsername(principal.getName());
		managedUser.setUsername(user.getUsername());
		managedUser.setImgSource(user.getImgSource());

		userRepo.saveAndFlush(managedUser);

		return user;
	}

}

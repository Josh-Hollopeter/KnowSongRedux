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
	public boolean delete(Principal principal) {
			
			User user = null;
			String username = principal.getName();
			user = userRepo.findByUsername(username);
			if(user != null) {
			user.setEnabled(false);
			userRepo.save(user);
			return true;
			}else {
				return false;
				
			}
			
	}
	
}

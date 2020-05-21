package com.skilldistillery.knowsong.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.knowsong.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>  {
	
	User findByUsername(String username);

}

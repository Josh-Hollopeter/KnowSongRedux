package com.skilldistillery.knowsong.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.knowsong.entities.Rank;

public interface RankRepository extends JpaRepository<Rank, Integer> {
	
	Optional<Rank> findById(Integer id);


}

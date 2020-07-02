package life.knowsong.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import life.knowsong.entities.User;

public interface UserRepository extends JpaRepository<User, String>  {
	
	Optional<User> findById(String id);

}

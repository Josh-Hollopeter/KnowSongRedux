package life.knowsong.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import life.knowsong.entities.SingleplayerGame;
import life.knowsong.entities.User;

public interface SingleplayerGameRepository extends JpaRepository<SingleplayerGame, Integer>{

	Optional<List<SingleplayerGame>> findByUser(User user);
}

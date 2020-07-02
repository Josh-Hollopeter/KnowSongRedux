package life.knowsong.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import life.knowsong.entities.SingleplayerGame;
import life.knowsong.entities.SingleplayerGameId;
import life.knowsong.entities.User;

public interface SingleplayerGameRepository extends JpaRepository<SingleplayerGame, SingleplayerGameId>{

	Optional<List<SingleplayerGame>> findById_User(int userId);
}

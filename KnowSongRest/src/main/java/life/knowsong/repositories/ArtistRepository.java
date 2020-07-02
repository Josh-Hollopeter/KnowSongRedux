package life.knowsong.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import life.knowsong.entities.Artist;

public interface ArtistRepository extends JpaRepository<Artist, String>{

	Optional<Artist> findById(String id);
	
	List<Artist> findAll();
	
}

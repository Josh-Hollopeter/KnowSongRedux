package life.knowsong.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import life.knowsong.entities.Genre;


public interface GenreRepository extends JpaRepository<Genre, String>{

	Optional<Genre> findById(String name);
}

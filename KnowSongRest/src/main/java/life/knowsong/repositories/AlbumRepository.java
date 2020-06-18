package life.knowsong.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import life.knowsong.entities.Album;

public interface AlbumRepository extends JpaRepository<Album, String>{

}

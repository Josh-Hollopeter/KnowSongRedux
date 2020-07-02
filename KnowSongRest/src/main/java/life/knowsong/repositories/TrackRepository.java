package life.knowsong.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import life.knowsong.entities.Track;

public interface TrackRepository extends JpaRepository<Track, String>{

	Set<Track> findByAlbum_IdLike(String albumId);
}

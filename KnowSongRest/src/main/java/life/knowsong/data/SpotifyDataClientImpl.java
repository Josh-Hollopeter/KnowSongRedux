package life.knowsong.data;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import life.knowsong.entities.Artist;

@Transactional
@Service
public class SpotifyDataClientImpl implements SpotifyDataClient {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<SimpleArtist> listAllArtists() {

		String jpql = "SELECT a.id AS id, a.name AS name, a.img_source AS imgSource, a.last_updated AS lastUpdated, a.popularity AS popularity, g.name AS genres"
				+ "FROM Artist a " + "JOIN artist_genre ag ON a.id = ag.artist_id "
				+ "JOIN Genre g ON ag.genre_name = g.name";

		List<SimpleArtist> simpleArtists = em.createQuery(jpql, SimpleArtist.class).getResultList();

		return simpleArtists;
	}

	@Override
	public boolean isArtistStored(String spotifyId) {
		String jpql = "SELECT COUNT(*) FROM Artist a WHERE a.id = :spotifyId";
		List<Long> isPresent = em.createQuery(jpql, Long.class).setParameter("spotifyId", spotifyId).getResultList();
		if (isPresent.get(0) > 0) {
			return true;
		} else {
			return false;
		}

	}
}

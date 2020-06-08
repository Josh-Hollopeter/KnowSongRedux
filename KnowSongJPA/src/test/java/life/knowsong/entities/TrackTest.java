package life.knowsong.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TrackTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Track track;
	private Track persistedTrack;
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("knowsong");

	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		track = new Track();
		track.setAlbum(new Album());
		track.getAlbum().setId("trackAlbum");
		track.setCreated(new Date());
		track.setExplicit(false);
		track.setName("track");
		track.setPopularity(44);
		track.setId("tackid");
		em.getTransaction().begin();
		em.persist(track.getAlbum());
		em.persist(track);
		em.flush();
		em.getTransaction().commit();
		persistedTrack = em.find(Track.class, "trackid");
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	@Test
	void test() {
		assertNotNull(persistedTrack);
		assertEquals(track.getPopularity(),persistedTrack.getPopularity());
	}

}

package life.knowsong.entities;

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

class ArtistTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Artist persistedArtist;
	private Artist artist;
	private Genre genre;

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
		artist = new Artist();
		artist.setCreated(new Date());
		artist.setName("squirrrely");
		artist.setPopularity(1);
		genre = new Genre("MOOSIC");
		artist.addGenre(genre);
		em.getTransaction().begin();
		em.persist(genre);
		em.persist(artist);
		em.flush();
		System.out.println(artist.getId());
		em.getTransaction().commit();
		persistedArtist = em.find(Artist.class, 2);
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	@Test
	void test() {
		assertNotNull(persistedArtist);
	}

}

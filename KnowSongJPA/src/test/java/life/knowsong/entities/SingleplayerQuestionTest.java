package life.knowsong.entities;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SingleplayerQuestionTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private SingleplayerQuestion spq;
	private SingleplayerQuestion persistedQuestion;
	private SingleplayerGame game;
	private User user;
	private Rank rank;

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
		spq = new SingleplayerQuestion();
		game = new SingleplayerGame();
		game.setPlayed(new Date());
		user = new User();
		rank = new Rank();
		rank.setId(9999);
		user.setRank(rank);
		user.setUsername("uniquestUsername");
		game.setDescription("game");
		game.setUserId(user);
		spq.setAnswer("answer");
		spq.setQuestionText("question");
		spq.setGame(game);
		spq.setNum(1);
		em.getTransaction().begin();
		em.persist(rank);
		em.persist(user);
		em.persist(game);
		em.persist(spq);
		em.flush();
		em.getTransaction().commit();
		persistedQuestion = em.find(SingleplayerQuestion.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	@Test
	void test() {
		assertNotNull(persistedQuestion);
	}

}

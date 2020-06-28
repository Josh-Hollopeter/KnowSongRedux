package life.knowsong.entities;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SingleplayerGameTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private SingleplayerGame game;
	private User user;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("knowsong");
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		user = em.find(User.class, 6);
	}


	@Test
	void test() {
		
		String jpql = "SELECT g FROM SingleplayerGame g WHERE g.user.id = :userId";
		List<SingleplayerGame> games = em.createQuery(jpql, SingleplayerGame.class)
				.setParameter("userId", user.getId())
				.getResultList();
		games.forEach(x ->{
			System.out.println(x);
		});
//		for(int x = 0; x < 3; x++) {
//			// jpql Count(*)
//		String jpql = "SELECT COUNT(*) FROM SingleplayerGame g WHERE g.id.user = :userId";
//		Integer count = em.createQuery(jpql, Long.class).setParameter("userId", user.getId()).getResultList().get(0).intValue();
//		System.out.println(count);
//		SingleplayerGame cleanedGame = new SingleplayerGame();
//		SingleplayerGameId gameId = new SingleplayerGameId();
//		gameId.setUser(user.getId());
//		gameId.setId(count+1);
//		cleanedGame.setId(gameId);
//		
//		cleanedGame.setUser(user);
//		cleanedGame.setDescription("fuckign lit");
//		System.out.println(cleanedGame);
//		em.persist(cleanedGame);
//		// generate questions
////		List<SingleplayerQuestion> questions = new ArrayList<>();
////		for(int y = 0; y < 5; y++) {
////			SingleplayerQuestion question = new SingleplayerQuestion();
////			SingleplayerQuestionId questionId = new SingleplayerQuestionId();
////			questionId.setNum(y+1);
////			questionId.setUserId(user.getId());
////			question.setUser(user);
////			question.setId(questionId);
////			question.setGame(cleanedGame);
////			questions.add(question);
////		}
////		cleanedGame.setQuestions(questions);
//		
//		
//		
////		cleanedGame.setUser(userRepo.findByUsername(username));
//		
//		}
	}

}

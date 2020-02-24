package com.skilldistillery.knowsong.entities;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TriviaTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Trivia trivia;

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
		trivia = em.find(Trivia.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	@Test
	void test() {
		assertNotNull(trivia);
		assertNotNull(trivia.getQuestionCategory());
	}

}

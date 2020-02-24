package com.skilldistillery.knowsong.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="trivia_game_question")
public class TriviaGameQuestion {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "trivia_game_id")
	private TriviaGame triviaGame;
	
	@ManyToOne
	@JoinColumn(name = "trivia_id")
	private Trivia trivia;
	
	private Boolean correct;
	
	@Column(name = "question_text")
	private String questionText;
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Boolean getCorrect() {
		return correct;
	}

	public void setCorrect(Boolean correct) {
		this.correct = correct;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}

	public TriviaGame getTriviaGame() {
		return triviaGame;
	}

	public void setTriviaGame(TriviaGame triviaGame) {
		this.triviaGame = triviaGame;
	}

	public Trivia getTrivia() {
		return trivia;
	}

	public void setTrivia(Trivia trivia) {
		this.trivia = trivia;
	}

	

}

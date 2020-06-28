package life.knowsong.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "singleplayer_question")
public class SingleplayerQuestion {

	// SQL VALUES
	@EmbeddedId
	private SingleplayerQuestionId id;

	@JsonIgnore
	@MapsId("fk_singleplayer_game_id")
	@JoinColumns({
		@JoinColumn(name = "fk_singleplayer_game_id", referencedColumnName = "id"),
		@JoinColumn(name = "fk_user_ref", referencedColumnName = "fk_user_id")
	})
	@ManyToOne
	private SingleplayerGame game;

	@JsonIgnore
	@MapsId("fk_user_ref")
	@JoinColumn(name = "fk_user_ref")
	@ManyToOne
	private User user;
	
	@Column(name = "question_text")
	private String questionText;

	private String answer;

	private String option2;

	private String option3;

	private String option4;

	@Column(name = "user_response")
	private String userResponse;
	
	private boolean correct;
	
	@Column(name = "answer_href")
	private String answerHref;

	// GETTERS / SETTERS


	public boolean isCorrect() {
		return correct;
	}

	public void setCorrect(boolean correct) {
		this.correct = correct;
	}

	public SingleplayerGame getGame() {
		return game;
	}

	public void setGame(SingleplayerGame game) {
		this.game = game;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getOption2() {
		return option2;
	}

	public void setOption2(String option2) {
		this.option2 = option2;
	}

	public String getOption3() {
		return option3;
	}

	public void setOption3(String option3) {
		this.option3 = option3;
	}

	public String getOption4() {
		return option4;
	}

	public void setOption4(String option4) {
		this.option4 = option4;
	}

	public String getUserResponse() {
		return userResponse;
	}

	public void setUserResponse(String userResponse) {
		this.userResponse = userResponse;
	}

	public SingleplayerQuestionId getId() {
		return id;
	}

	public void setId(SingleplayerQuestionId id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getAnswerHref() {
		return answerHref;
	}

	public void setAnswerHref(String answerHref) {
		this.answerHref = answerHref;
	}



	@Override
	public String toString() {
		return "SingleplayerQuestion [id=" + id + ", questionText=" + questionText + ", answer=" + answer + ", option2="
				+ option2 + ", option3=" + option3 + ", option4=" + option4 + ", userResponse=" + userResponse
				+ ", correct=" + correct + ", answerHref=" + answerHref + ", userResponseHref="
				+ "]";
	}

	


}

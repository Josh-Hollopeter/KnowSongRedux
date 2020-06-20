package life.knowsong.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="singleplayer_question")
public class SingleplayerQuestion {

	
	// SQL VALUES
	
	@Id
	private int num;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "fk_singleplayer_game_id")
	private SingleplayerGame game;
	
	@Column(name = "question_text")
	private String questionText;
	
	private String answer;
	
	private String option2;
	
	private String option3;
	
	private String option4;
	
	@Column(name = "user_response")
	private String userResponse;

	// GETTERS / SETTERS 
	
	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
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


	@Override
	public String toString() {
		return "SingleplayerQuestion [num=" + num + ", game=" + game + ", questionText=" + questionText + ", answer="
				+ answer + ", option2=" + option2 + ", option3=" + option3 + ", option4=" + option4 + ", userResponse="
				+ userResponse + "]";
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((answer == null) ? 0 : answer.hashCode());
		result = prime * result + ((game == null) ? 0 : game.hashCode());
		result = prime * result + num;
		result = prime * result + ((option2 == null) ? 0 : option2.hashCode());
		result = prime * result + ((option3 == null) ? 0 : option3.hashCode());
		result = prime * result + ((option4 == null) ? 0 : option4.hashCode());
		result = prime * result + ((questionText == null) ? 0 : questionText.hashCode());
		result = prime * result + ((userResponse == null) ? 0 : userResponse.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SingleplayerQuestion other = (SingleplayerQuestion) obj;
		if (answer == null) {
			if (other.answer != null)
				return false;
		} else if (!answer.equals(other.answer))
			return false;
		if (game == null) {
			if (other.game != null)
				return false;
		} else if (!game.equals(other.game))
			return false;
		if (num != other.num)
			return false;
		if (option2 == null) {
			if (other.option2 != null)
				return false;
		} else if (!option2.equals(other.option2))
			return false;
		if (option3 == null) {
			if (other.option3 != null)
				return false;
		} else if (!option3.equals(other.option3))
			return false;
		if (option4 == null) {
			if (other.option4 != null)
				return false;
		} else if (!option4.equals(other.option4))
			return false;
		if (questionText == null) {
			if (other.questionText != null)
				return false;
		} else if (!questionText.equals(other.questionText))
			return false;
		if (userResponse == null) {
			if (other.userResponse != null)
				return false;
		} else if (!userResponse.equals(other.userResponse))
			return false;
		return true;
	}
	
	
	
}

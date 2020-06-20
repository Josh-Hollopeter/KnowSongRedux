package life.knowsong.entities;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "singleplayer_game")
public class SingleplayerGame {

	// SQL VALUES
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;	
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date played;
	
	private String description;
	
	@ManyToOne
	@JoinColumn(name="fk_user_id")
	private User user;

	@ElementCollection
	@OneToMany(mappedBy = "game", cascade= CascadeType.PERSIST)
	private List<SingleplayerQuestion> questions;
	
	
	// GETTERS / SETTERS
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getPlayed() {
		return played;
	}

	public void setPlayed(Date played) {
		this.played = played;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<SingleplayerQuestion> getQuestions() {
		return questions;
	}

	public SingleplayerQuestion addQuestion(SingleplayerQuestion question) {
		if(questions == null) {
			questions = new ArrayList<SingleplayerQuestion>();
		}
		questions.add(question);
		return question;
	}
	public void setQuestions(List<SingleplayerQuestion> questions) {
		this.questions = questions;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + id;
		result = prime * result + ((played == null) ? 0 : played.hashCode());
		result = prime * result + ((questions == null) ? 0 : questions.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
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
		SingleplayerGame other = (SingleplayerGame) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (id != other.id)
			return false;
		if (played == null) {
			if (other.played != null)
				return false;
		} else if (!played.equals(other.played))
			return false;
		if (questions == null) {
			if (other.questions != null)
				return false;
		} else if (!questions.equals(other.questions))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}
}

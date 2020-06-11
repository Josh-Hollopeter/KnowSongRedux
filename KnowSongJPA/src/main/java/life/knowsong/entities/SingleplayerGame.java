package life.knowsong.entities;


import java.util.Date;
import java.util.List;

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

	@OneToMany(mappedBy = "game")
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

	public User getUserId() {
		return user;
	}

	public void setUserId(User user) {
		this.user = user;
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

	public void setQuestions(List<SingleplayerQuestion> questions) {
		this.questions = questions;
	}
	

	
}

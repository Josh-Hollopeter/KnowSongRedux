package life.knowsong.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


import com.fasterxml.jackson.annotation.JsonIgnore;

// auto generating id in composite primary key JPA
// https://vladmihalcea.com/how-to-map-a-composite-identifier-using-an-automatically-generatedvalue-with-jpa-and-hibernate/
@Entity
@Table(name = "singleplayer_game")
public class SingleplayerGame implements Serializable{

	// SQL VALUES

	@EmbeddedId
	private SingleplayerGameId id;

	@JsonIgnore
	@MapsId("fk_user_id")
	@ManyToOne
	@JoinColumn(name ="fk_user_id")
	private User user;

	@Temporal(TemporalType.TIMESTAMP)
	private Date played;

	private String artist;
	
	@Column(name = "game_type")
	private String gameType;

	@ElementCollection
	@OneToMany(mappedBy = "game", cascade = CascadeType.PERSIST)
	private List<SingleplayerQuestion> questions;

	// GETTERS / SETTERS


	public Date getPlayed() {
		return played;
	}

	public void setPlayed(Date played) {
		this.played = played;
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
		if (questions == null) {
			questions = new ArrayList<SingleplayerQuestion>();
		}
		questions.add(question);
		return question;
	}

	public void setQuestions(List<SingleplayerQuestion> questions) {
		this.questions = questions;
	}

	public SingleplayerGameId getId() {
		return id;
	}

	public void setId(SingleplayerGameId id) {
		this.id = id;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getGameType() {
		return gameType;
	}

	public void setGameType(String gameType) {
		this.gameType = gameType;
	}

	@Override
	public String toString() {
		return "SingleplayerGame [id=" + id + ", played=" + played + ", artist=" + artist + ", gameType=" + gameType
				+ ", questions=" + questions + "]";
	}



}

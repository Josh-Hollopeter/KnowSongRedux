package life.knowsong.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Embeddable
public class SingleplayerQuestionId implements Serializable {

	@Column(name="num")
	private int num;

	@Column(name = "fk_singleplayer_game_id")
	private int gameId;

	@Column(name = "fk_user_ref")
	private int userId;

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public SingleplayerQuestionId(int num, int gameId, int userId) {
		super();
		this.num = num;
		this.gameId = gameId;
		this.userId = userId;
	}
	
	public SingleplayerQuestionId() {
		
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + gameId;
		result = prime * result + num;
		result = prime * result + userId;
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
		SingleplayerQuestionId other = (SingleplayerQuestionId) obj;
		if (gameId != other.gameId)
			return false;
		if (num != other.num)
			return false;
		if (userId != other.userId)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "SingleplayerQuestionId [num=" + num + ", gameId=" + gameId + ", userId=" + userId + "]";
	}
	
	
}

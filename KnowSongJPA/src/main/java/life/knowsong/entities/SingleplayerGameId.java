package life.knowsong.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;



@Embeddable
public class SingleplayerGameId  implements Serializable{

	private int id;
	
	@Column(name = "fk_user_id")
	private String user;

	// GETTERS / SETTERS
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public SingleplayerGameId(int id, String user) {
		super();
		this.id = id;
		this.user = user;
	}
	public SingleplayerGameId() {
		
	}

	

	@Override
	public int hashCode() {
		return Objects.hash(id, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SingleplayerGameId other = (SingleplayerGameId) obj;
		return id == other.id && user == other.user;
	}

	@Override
	public String toString() {
		return "SingleplayerGameId [id=" + id + ", user=" + user + "]";
	}
	


}

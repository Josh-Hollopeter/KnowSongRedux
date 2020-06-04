package life.knowsong.entities;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {
	
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "fk_rank_id")
	private Rank rank;
	
	private String username;

	private Boolean enabled;
	
	private Boolean admin;
		
	
	@Column(name = "img_source")
	private String imgSource;
	
//	@OneToMany(cascade=CascadeType.ALL)
//	@JoinColumn(name="fk_user_id")
//	private Set<SingleplayerGame> singleplayerGames;
	
	// not implemented
	@JsonIgnore
	@ManyToMany
	@JoinTable(name="user_playlist",
		joinColumns=@JoinColumn(name="user_id"),
		inverseJoinColumns=@JoinColumn(name="playlist_id"))
	private List<Playlist> playlists;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Rank getRank() {
		return rank;
	}

	public void setRank(Rank rank) {
		this.rank = rank;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Boolean getAdmin() {
		return admin;
	}

	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}

	public String getImgSource() {
		return imgSource;
	}

	public void setImgSource(String imgSource) {
		this.imgSource = imgSource;
	}

	public List<Playlist> getPlaylists() {
		return playlists;
	}

	public void setPlaylists(List<Playlist> playlists) {
		this.playlists = playlists;
	}
	
//	public Set<SingleplayerGame> getSingleplayerGames() {
//		return singleplayerGames;
//	}
//
//	public void setSingleplayerGames(Set<SingleplayerGame> singleplayerGames) {
//		this.singleplayerGames = singleplayerGames;
//	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
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
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}




}

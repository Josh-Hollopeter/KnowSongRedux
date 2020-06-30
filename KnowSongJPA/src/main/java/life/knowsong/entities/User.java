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
	private String id;
	
	private String username;

	private Boolean enabled;
	
	private Boolean admin;
		
	
	@Column(name = "img_source")
	private String imgSource;
	
	@JsonIgnore
	@OneToMany
	@JoinColumn(name="fk_user_id")
	private Set<SingleplayerGame> singleplayerGames;
	
	// not implemented
	@JsonIgnore
	@ManyToMany
	@JoinTable(name="user_playlist",
		joinColumns=@JoinColumn(name="user_id"),
		inverseJoinColumns=@JoinColumn(name="playlist_id"))
	private List<Playlist> playlists;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
	
	public Set<SingleplayerGame> getSingleplayerGames() {
		return singleplayerGames;
	}

	public void setSingleplayerGames(Set<SingleplayerGame> singleplayerGames) {
		this.singleplayerGames = singleplayerGames;
	}




	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((admin == null) ? 0 : admin.hashCode());
		result = prime * result + ((enabled == null) ? 0 : enabled.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((imgSource == null) ? 0 : imgSource.hashCode());
		result = prime * result + ((playlists == null) ? 0 : playlists.hashCode());
		result = prime * result + ((singleplayerGames == null) ? 0 : singleplayerGames.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
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
		if (admin == null) {
			if (other.admin != null)
				return false;
		} else if (!admin.equals(other.admin))
			return false;
		if (enabled == null) {
			if (other.enabled != null)
				return false;
		} else if (!enabled.equals(other.enabled))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (imgSource == null) {
			if (other.imgSource != null)
				return false;
		} else if (!imgSource.equals(other.imgSource))
			return false;
		if (playlists == null) {
			if (other.playlists != null)
				return false;
		} else if (!playlists.equals(other.playlists))
			return false;
		if (singleplayerGames == null) {
			if (other.singleplayerGames != null)
				return false;
		} else if (!singleplayerGames.equals(other.singleplayerGames))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", enabled=" + enabled + ", admin=" + admin
				+ ", imgSource=" + imgSource + "]";
	}




}

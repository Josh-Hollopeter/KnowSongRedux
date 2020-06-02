package life.knowsong.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Genre {

	@Id
	private String name;
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(name="artist_genre",
			joinColumns=@JoinColumn(name="genre_name"),
			inverseJoinColumns=@JoinColumn(name="artist_id"))
	private Set<Artist> Artists;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Artist> getArtists() {
		return Artists;
	}

	public void setArtists(Set<Artist> artists) {
		Artists = artists;
	}
	
	
}

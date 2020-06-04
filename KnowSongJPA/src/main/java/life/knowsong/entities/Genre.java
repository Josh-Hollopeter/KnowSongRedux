package life.knowsong.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "genre")
public class Genre {

	@Id
	private String name;
	
	@JsonIgnore
	@ElementCollection
	@ManyToMany(mappedBy = "artist",fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinTable(name="artist_genre",
			joinColumns=@JoinColumn(name="genre_name"),
			inverseJoinColumns=@JoinColumn(name="artist_id"))
	private Set<Artist> Artists = new HashSet<Artist>();

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Artist> getArtists() {
		return Artists;
	}
		
}

package life.knowsong.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "genre")
public class Genre {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String name;
	
	public Genre() {
		
	}
	
	public Genre(String name) {
		this.name = name;
		
	}
	
	@JsonIgnore
	@ElementCollection
	@ManyToMany(mappedBy = "artist")
	private Set<Artist> artists;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Artist> getArtists() {
		return artists;
	}
	
	public Artist addArtist(Artist artist) {
		
		if(artists == null) {
			artists = new HashSet<Artist>();
		}
		
		artists.add(artist);
		return artist;
		
	}
		
}

package life.knowsong.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "artist")
public class Artist {

	@Id
	private String id;
	
	private String name;
	
	@Column(name = "img_source")
	private String imgSource;
	
	private Integer popularity;
	
	@Column(name = "trivia_ready")
	private boolean triviaReady;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="last_updated")
	private Date lastUpdated;
	
	@ElementCollection
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	@JoinTable(name="artist_album",
			joinColumns=@JoinColumn(name="artist_id"),
			inverseJoinColumns=@JoinColumn(name="album_id"))
	private Set<Album> albums;
	
	@ElementCollection
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name="artist_has_genre",
			joinColumns=@JoinColumn(name="artist_id"),
			inverseJoinColumns=@JoinColumn(name="genre_name"))
	private Set<Genre> genres;

	
	public Artist() {
	}

	public Artist(String id, String name, String imgSource, Integer popularity, boolean triviaReady, Date created,
			Date lastUpdated, Set<Album> albums, Set<Genre> genres) {
		super();
		this.id = id;
		this.name = name;
		this.imgSource = imgSource;
		this.popularity = popularity;
		this.triviaReady = triviaReady;
		this.created = created;
		this.lastUpdated = lastUpdated;
		this.albums = albums;
		this.genres = genres;
	}

	// GETTERS / SETTERS
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImgSource() {
		return imgSource;
	}

	public void setImgSource(String imgSource) {
		this.imgSource = imgSource;
	}


	public Integer getPopularity() {
		return popularity;
	}

	public void setPopularity(Integer popularity) {
		this.popularity = popularity;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}
	
	public boolean isTriviaReady() {
		return triviaReady;
	}

	public void setTriviaReady(boolean triviaReady) {
		this.triviaReady = triviaReady;
	}
	
	public Set<Album> getAlbums() {
		return albums;
	}

	public Set<Genre> getGenres() {
		return genres;
	}


	public Genre addGenre(Genre genre) {
		
		if(genres == null) {
			genres = new HashSet<Genre>();
		}
		
		genres.add(genre);
		return genre;
		
	}
	public Album addAlbum(Album album) {
		
		if(albums == null) {
			albums = new HashSet<Album>();
		}
		
		albums.add(album);
		return album;
		
	}
	
	
	
}

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
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "artist")
public class Artist {

	@Id
	private String id;
	
	private String name;
	
	@Column(name = "img_source")
	private String imgSource;
	
	private String href;
	
	private Integer popularity;
	
	@Column(name = "trivia_ready")
	private boolean triviaReady;
	
	public boolean isTriviaReady() {
		return triviaReady;
	}

	public void setTriviaReady(boolean triviaReady) {
		this.triviaReady = triviaReady;
	}

	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="last_updated")
	private Date lastUpdated;
	
	@ElementCollection
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinTable(name="artist_album",
			joinColumns=@JoinColumn(name="artist_id"),
			inverseJoinColumns=@JoinColumn(name="album_id"))
	private Set<Album> albums = new LinkedHashSet<Album>();
	
	@ElementCollection
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
	@JoinTable(name="artist_genre",
			joinColumns=@JoinColumn(name="artist_id"),
			inverseJoinColumns=@JoinColumn(name="genre_name"))
	private Set<Genre> genres = new HashSet<Genre>();

	
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

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
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

	public Set<Album> getAlbums() {
		return albums;
	}

	public Set<Genre> getGenres() {
		return genres;
	}

	public void addGenre(Genre genre) {
		this.genres.add(genre);
		genre.getArtists().add(this);
	}
	
	
	
}

package life.knowsong.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
public class Album {

	@Id
	private String id;
	
	private String name;
	
	@Column(name="img_source")
	private String imgSource;
	
	private String type;
	
	@Column(name="release_date")
	private String releaseDate;
	
	@Column(name="release_date_precision")
	private String releaseDatePrecision;
	
	private String href;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	
	@ManyToMany
	@JoinTable(name="album_market",
		joinColumns=@JoinColumn(name="album_id"),
		inverseJoinColumns=@JoinColumn(name="available_market_market"))
	private Set<AvailableMarkets> markets;
	
	
	@ManyToMany
	@JoinTable(name="artist_album",
		joinColumns=@JoinColumn(name="album_id"),
		inverseJoinColumns=@JoinColumn(name="artist_id"))
	private Set<Artist> artists;

	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="fk_album_id")
	private Set<Track> tracks;
	
	
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}

	public String getReleaseDatePrecision() {
		return releaseDatePrecision;
	}

	public void setReleaseDatePrecision(String releaseDatePrecision) {
		this.releaseDatePrecision = releaseDatePrecision;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Set<AvailableMarkets> getMarkets() {
		return markets;
	}

	public void setMarkets(Set<AvailableMarkets> markets) {
		this.markets = markets;
	}

	public Set<Artist> getArtists() {
		return artists;
	}

	public void setArtists(Set<Artist> artists) {
		this.artists = artists;
	}

	public Set<Track> getTracks() {
		return tracks;
	}

	public void setTracks(Set<Track> tracks) {
		this.tracks = tracks;
	}
	
}

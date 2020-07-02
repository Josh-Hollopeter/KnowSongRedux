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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "album")
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
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	
	@JsonIgnore
	@ElementCollection
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinTable(name="album_market",
		joinColumns=@JoinColumn(name="album_id"),
		inverseJoinColumns=@JoinColumn(name="available_market_market"))
	private Set<AvailableMarkets> markets = new HashSet<AvailableMarkets>();
	
	@ElementCollection
	@ManyToMany(mappedBy = "albums", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	@JoinTable(name="artist_album",
	joinColumns=@JoinColumn(name="album_id"),
	inverseJoinColumns=@JoinColumn(name="artist_id"))
	private Set<Artist> artists;

	@ElementCollection
	@OneToMany(fetch = FetchType.LAZY, cascade= {CascadeType.MERGE, CascadeType.PERSIST})
	@JoinColumn(name="fk_album_id")
	private Set<Track> tracks = new HashSet<Track>();
	
	public Album() {
	}

	public Album(String id, String name, String imgSource, String type, String releaseDate, String releaseDatePrecision,
			Date created, Set<AvailableMarkets> markets, Set<Artist> artists, Set<Track> tracks) {
		super();
		this.id = id;
		this.name = name;
		this.imgSource = imgSource;
		this.type = type;
		this.releaseDate = releaseDate;
		this.releaseDatePrecision = releaseDatePrecision;
		this.created = created;
		this.markets = markets;
		this.artists = artists;
		this.tracks = tracks;
	}
	
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

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Set<AvailableMarkets> getMarkets() {
		return markets;
	}

	public void addMarkets(AvailableMarkets market) {
		this.markets.add(market);
		market.getAlbums().add(this);
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

	public Set<Track> getTracks() {
		return tracks;
	}

	public void setTracks(Set<Track> tracks) {
		this.tracks = tracks;
	}
	
}

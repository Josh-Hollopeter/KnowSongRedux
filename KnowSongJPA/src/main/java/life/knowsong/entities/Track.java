package life.knowsong.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "track")
public class Track {

	@Id
	private String id;
	
	private String name;
	
	@Column(name="preview_url")
	private String previewUrl;
	
	private boolean explicit;
	
	private int popularity;
	
	@Column(name="spotify_id")
	private String spotifyId;
	
	@Column(name="duration_ms")
	private int durationMs;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	
	// typically only getting tracks from album. not other way around.
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="fk_album_id")
	private Album album;
	
	public Track() {
		super();
	}

	public Track(String id, String name, String previewUrl, boolean explicit, int popularity, int durationMs,
			Date created, Album album) {
		super();
		this.id = id;
		this.name = name;
		this.previewUrl = previewUrl;
		this.explicit = explicit;
		this.popularity = popularity;
		this.durationMs = durationMs;
		this.created = created;
		this.album = album;
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

	public String getPreviewUrl() {
		return previewUrl;
	}

	public void setPreviewUrl(String previewUrl) {
		this.previewUrl = previewUrl;
	}

	public boolean isExplicit() {
		return explicit;
	}

	public void setExplicit(boolean explicit) {
		this.explicit = explicit;
	}

	public int getPopularity() {
		return popularity;
	}

	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}

	public int getDurationMs() {
		return durationMs;
	}

	public void setDurationMs(int durationMs) {
		this.durationMs = durationMs;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}
	
	public String getSpotifyId() {
		return spotifyId;
	}

	public void setSpotifyId(String spotifyId) {
		this.spotifyId = spotifyId;
	}

	public Album getAlbum() {
		return album;
	}

	public void setAlbum(Album album) {
		this.album = album;
	}
	
	
	
}

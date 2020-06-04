package life.knowsong.data;

import java.util.Date;
import java.util.List;

import life.knowsong.entities.Genre;

public class SimpleArtist {

	private String id;
	
	private String name;
	
	private String imgSource;
	
	private Date lastUpdated;
	
	private int popularity;
	
	private List<Genre> genres;

	
	public SimpleArtist(String id, String name, String imgSource, Date lastUpdated, List<Genre> genres) {
		super();
		this.id = id;
		this.name = name;
		this.imgSource = imgSource;
		this.lastUpdated = lastUpdated;
		this.genres = genres;
	}
	
	public SimpleArtist() {
		
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

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}
	
	public int getPopularity() {
		return popularity;
	}

	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}

	public List<Genre> getGenres() {
		return genres;
	}

	public void setGenres(List<Genre> genres) {
		this.genres = genres;
	}

}

package life.knowsong.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class AvailableMarkets {

	@Id
	private String market;
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(name="album_market",
		joinColumns=@JoinColumn(name="available_market_market"),
		inverseJoinColumns=@JoinColumn(name="album_id"))
	private Set<Album> albums;

	public String getMarket() {
		return market;
	}

	public void setMarket(String market) {
		this.market = market;
	}

	public Set<Album> getAlbums() {
		return albums;
	}

	public void setAlbums(Set<Album> albums) {
		this.albums = albums;
	}
	
	
}

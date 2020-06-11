package life.knowsong.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "available_market")
public class AvailableMarkets {

	@Id
	private String market;
	
	@JsonIgnore
	@ElementCollection
	@ManyToMany
	@JoinTable(name="album_market",
		joinColumns=@JoinColumn(name="available_market_market"),
		inverseJoinColumns=@JoinColumn(name="album_id"))
	private Set<Album> albums = new HashSet<Album>();

	public String getMarket() {
		return market;
	}

	public void setMarket(String market) {
		this.market = market;
	}

	public Set<Album> getAlbums() {
		return albums;
	}
	
	
}

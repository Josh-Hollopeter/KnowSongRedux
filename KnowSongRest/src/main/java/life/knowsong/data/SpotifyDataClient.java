package life.knowsong.data;

import java.util.List;

import life.knowsong.entities.Artist;

public interface SpotifyDataClient {

	public List<Artist> listAllArtists();
	
	public Artist getArtist(String accessToken, String artistId);
}

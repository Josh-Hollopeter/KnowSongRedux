package life.knowsong.data;

import java.util.List;

public interface SpotifyDataClient {

	public List<SimpleArtist> listAllArtists();
	
	public boolean isArtistStored(String spotifyId);
}

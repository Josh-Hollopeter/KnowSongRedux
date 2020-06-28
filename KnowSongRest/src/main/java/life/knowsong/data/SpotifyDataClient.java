package life.knowsong.data;

import java.util.List;

import life.knowsong.entities.Artist;
import life.knowsong.entities.SingleplayerGame;

public interface SpotifyDataClient {

	public List<Artist> listAllArtists();
	
	public Artist getArtist(String accessToken, String artistId);
	
	public boolean storeSingleplayerGame(SingleplayerGame game, String username);
	
	public List<SingleplayerGame> getSingleplayerGames(String username);
	
}

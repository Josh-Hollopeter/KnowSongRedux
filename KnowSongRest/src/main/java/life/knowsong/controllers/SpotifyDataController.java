package life.knowsong.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import life.knowsong.buildgame.AudioGame;
import life.knowsong.data.SpotifyDataClient;
import life.knowsong.entities.Artist;

@RestController
@RequestMapping("spotifyData")
@CrossOrigin(origins = "http://localhost:4200")
public class SpotifyDataController {
	
	@Autowired
	SpotifyDataClient ourSpotifyData;
	
//	@Autowired
//	ArtistRepos
	
	@GetMapping("/getAllArtists")
	public List<Artist> getAllArtists(@AuthenticationPrincipal OAuth2User principal, HttpServletResponse response) {
		if(principal != null) {
			response.setStatus(200);
			System.out.println("getting artists");
			return ourSpotifyData.listAllArtists();
		}
		else {
			response.setStatus(401);
			return null;
		}
	}
	
	
	@GetMapping("/buildArtistAudioGame/{artistId}")
	public AudioGame buildArtistLyricGame(@AuthenticationPrincipal OAuth2User principal, 
			@PathVariable("artistId") String artistId,HttpServletResponse response) {
		
		return null;
	}
	
	@GetMapping("/testPersistArtist/{artistId}/{accessToken}")
	public Artist testPersistArtist(@PathVariable("artistId") String artistId
			, @PathVariable("accessToken") String accessToken
			, HttpServletResponse response) {
//		AudioGame ag = new AudioGame();

		Artist artist = ourSpotifyData.getArtist(accessToken, artistId);
		
		return artist;
	}

}

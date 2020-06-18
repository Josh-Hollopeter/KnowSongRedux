package life.knowsong.controllers;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import life.knowsong.buildgame.BuildAudioGame;
import life.knowsong.data.SpotifyDataClient;
import life.knowsong.entities.Artist;
import life.knowsong.entities.SingleplayerGame;
import life.knowsong.entities.Track;

@RestController
@RequestMapping("spotifyData")
@CrossOrigin(origins = "http://localhost:4200")
public class SpotifyDataController {
	
	@Autowired
	SpotifyDataClient ourSpotifyData;
	
	
	@Autowired
	BuildAudioGame buildAudio;
	
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
	
	@GetMapping("/buildArtistAudioGame/{artistId}/{accessToken}")
	public SingleplayerGame BuildArtistAudioGame(@AuthenticationPrincipal OAuth2User principal
			, @PathVariable("artistId") String artistId
			, @PathVariable("accessToken") String accessToken
			, HttpServletResponse response) {
		if(principal != null) {
			
			boolean isExplicit = true;
			SingleplayerGame game = buildAudio.build(artistId, accessToken, isExplicit);
			if(game == null) {
				response.setStatus(404);	// game was not created. artist may have too few tracks
				return null;
			}
			
			response.setStatus(200);	// game was built 
			return game;
		}
		else {
			response.setStatus(401);	// unauthorized request
			return null;
		}
		
	}

}

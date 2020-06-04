package life.knowsong.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import life.knowsong.data.SimpleArtist;
import life.knowsong.data.SpotifyDataClient;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SpotifyDataController {
	
	@Autowired
	SpotifyDataClient ourSpotifyData;
	
	@GetMapping("/spotifyData/getAllArtists")
	public List<SimpleArtist> getAllArtists(@AuthenticationPrincipal OAuth2User principal, HttpServletResponse response) {
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
	
	@GetMapping("/spotifyData/getArtistPresent/{id}")
	public boolean isArtistStored(// @AuthenticationPrincipal OAuth2User principal, 
			@PathVariable("id") String spotifyId,HttpServletResponse response) {
//		 if(principal != null) {
			response.setStatus(200);
			System.out.println("checking if artist stored");
			return ourSpotifyData.isArtistStored(spotifyId);
//		 }
//		 else {
//			response.setStatus(401);
//			return false;
//		}
	}

}

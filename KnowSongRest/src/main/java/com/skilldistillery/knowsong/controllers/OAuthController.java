package com.skilldistillery.knowsong.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.wrapper.spotify.SpotifyApi;

@RestController
@CrossOrigin({"*", "http://localhost:4250"})
public class OAuthController {
	private SpotifyApi spotifyApi = new SpotifyApi.Builder()
			.setAccessToken("").build();
	
	public void getAuthToken() {
		
	}
	//redirect url: https://lukesprogrammingtech.com
}

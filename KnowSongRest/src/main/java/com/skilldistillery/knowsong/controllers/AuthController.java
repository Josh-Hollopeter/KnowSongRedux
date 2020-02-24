package com.skilldistillery.knowsong.controllers;

import java.io.IOException;
import java.net.URI;
import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.services.AuthService;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.SpotifyHttpManager;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;

@RestController
@CrossOrigin({ "*", "http://localhost:4250" })

public class AuthController {

	
	@Autowired
	private AuthService authService;

	@RequestMapping(path = "/register", method = RequestMethod.POST)
	public User register(@RequestBody User user, HttpServletResponse res) {

		if (user == null) {
			res.setStatus(400);
		}

		user = authService.register(user);

		return user;
	}

	@GetMapping("/authenticate")
	public Principal authenticate(Principal principal) {
		return principal;
	}

	// ------------------------------------------
	// --------------- OAuth2 -------------------
	// -- @thelinmichael's spotify api wrapper --
	// ------------------------------------------
	private static final String clientId = "a2398fd3acd54cf8b645af6884251a55";
	private static final String clientSecret = "e8c8ceef3b064187ada929c80caaca17";
	private static final URI redirectUri = SpotifyHttpManager.makeUri("https://lukesprogrammingtech.com");
	private static final String code = "code";
	private static final String scope = "user-read-private user-read-email";
	
	// STEP 1 : GET AUTHORIZED BROH
	
	private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
			.setClientId(clientId)
			.setClientSecret(clientSecret)
			.setRedirectUri(redirectUri)
			.build();
	
	private static final AuthorizationCodeUriRequest authorizationCodeUriRequest = 
			spotifyApi
			.authorizationCodeUri()
			.scope(scope).show_dialog(false).build();
	
	@GetMapping("/getAuthorized")
	public String getAuthorized(@RequestParam("state") String state, HttpServletResponse response) {
		
		final URI uri = authorizationCodeUriRequest.execute();
		System.out.println("URI : " + uri.toString());
		return uri.toString();
	}
	
	// STEP 2: RETRIEVE THE TOKENS FROM SPOTIFY BROH
	
	private static final AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
	          .build();
	
	@GetMapping("/authorizeUser")
	public void getTokens(@RequestParam("code") String code, HttpServletResponse response) {
		try {
		/*
		 * Request an access token and refresh token by creating an
		 * <a href="https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow">Authorization Code</a>
		 * request.
		 */
			System.out.println(code);
			final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
			spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
			spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
			System.out.println(spotifyApi.getAccessToken());
			System.out.println(spotifyApi.getRefreshToken());
		} catch (IOException | SpotifyWebApiException e) {
			System.err.println("ERROR: " + e.getMessage());
		}
	}
	
//	@PostMapping("")
//	// not working rn just hard coding
//	public String[] clientSecret() {
//		String array[] = new String[2];
//		try {
//			Scanner scanner = new Scanner(new File("/KnowSongRest/src/main/string.txt"));
//
//			int x = 0;
//			while (scanner.hasNext()) {
//				array[x] = scanner.nextLine();
//				++x;
//			}
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//
//		System.out.println(array[0]);
//		System.out.println(array[1]);
//		return array;
//	}

	
	// ------------------------------------------

}

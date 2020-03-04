package com.skilldistillery.knowsong.controllers;

import java.io.IOException;
import java.net.URI;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.entities.User;
import com.skilldistillery.knowsong.services.AuthService;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.SpotifyHttpManager;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRefreshRequest;
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
		//gives user a new auth token valid for 3600 seconds
		exchangeRefreshToken(authService.findUser(principal.getName()));
		return principal;
	}
	


	// ------------------------------------------
	// --------------- OAuth2 -------------------
	// -- @thelinmichael's spotify api wrapper --
	// ------------------------------------------
	private static final String clientId = "a2398fd3acd54cf8b645af6884251a55";
	private static final String clientSecret = "e8c8ceef3b064187ada929c80caaca17";
	private static final URI redirectUri = SpotifyHttpManager.makeUri("https://joshhollopeter.com/KnowSongRest/callback");
	private static final String scope = "user-read-private user-read-email";

	// STEP 1 : GET AUTHORIZED BROH

	private SpotifyApi spotifyApi = new SpotifyApi.Builder().setClientId(clientId)
			.setClientSecret(clientSecret).setRedirectUri(redirectUri).build();

	private AuthorizationCodeUriRequest authorizationCodeUriRequest;
	private String stateKey;

	@PostMapping("/getAuthorized")
	public String getAuthorized(@RequestBody String state, HttpServletResponse response, Principal principal) {
		this.stateKey = state;
		System.out.println("local state" + state);
		System.out.println("global state: " +this.stateKey);
		authorizationCodeUriRequest = spotifyApi.authorizationCodeUri().scope(scope).show_dialog(true).state(state)
				.build();
		final URI uri = authorizationCodeUriRequest.execute();
		System.out.println("URI : " + uri.toString());
		return uri.toString();
	}

	// STEP 2: RETRIEVE THE TOKENS FROM SPOTIFY BROH

	private AuthorizationCodeRequest authorizationCodeRequest;

	//	only called for new registering users!
	@PostMapping("/authorizeUser")
	public void getTokens(@RequestBody String packet, HttpServletResponse response, Principal principal) {
		try {
			/*
			 * Request an access token and refresh token by creating an <a href=
			 * "https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow"
			 * >Authorization Code</a> request.
			 */
			List<String> packetString = Arrays.asList(packet.split(","));
			String code = packetString.get(0);
			String state = packetString.get(1);
			String username = principal.getName();
			System.out.println(username);
			
			System.out.println("new state " +state);
			System.out.println("this.state key " + this.stateKey);
			System.out.println("state key " + stateKey);
			//verify the state is the same get back to this later
			if (state.equals(stateKey)) {
				 authorizationCodeRequest = spotifyApi
						.authorizationCode(code)
				          .build();
				final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
				User user = authService.findUser(username);
				spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
				spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
				user.setAuthToken(spotifyApi.getAccessToken());
				user.setRefreshToken(spotifyApi.getRefreshToken());
				if(user.getAuthToken() == null || user.getRefreshToken() == null) {
					System.err.println("AUTH TOKEN WAS NOT SET :(");
				}
				authService.save(user);
				System.out.println("ACCESS TOKEN " + spotifyApi.getAccessToken());
				System.out.println("REFRESH TOKEN " + spotifyApi.getRefreshToken());
			}
		} catch (IOException | SpotifyWebApiException e) {
			System.err.println("ERROR: " + e.getMessage());
		}

	}
	
	private void exchangeRefreshToken(User user) {
		spotifyApi.setRefreshToken(user.getRefreshToken());
		
		
		AuthorizationCodeRefreshRequest authorizationCodeRefreshRequest = spotifyApi.authorizationCodeRefresh()
		          .build();
		try {
			AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRefreshRequest.execute();
			user.setAuthToken(authorizationCodeCredentials.getAccessToken());
			System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());
			authService.save(user);
		} catch (SpotifyWebApiException | IOException e) {
			e.printStackTrace();
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

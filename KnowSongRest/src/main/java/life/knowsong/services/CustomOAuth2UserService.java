package life.knowsong.services;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.endpoint.DefaultRefreshTokenTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2RefreshTokenGrantRequest;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import life.knowsong.entities.Rank;
import life.knowsong.entities.User;
import life.knowsong.repositories.RankRepository;
import life.knowsong.repositories.UserRepository;

@Component
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	@Autowired
	UserRepository userRepo;

	@Autowired
	RankRepository rankRepo;

	@Autowired
	OAuth2AuthorizedClientService clientService;

	// user must go through this method every time they authenticate with the server
	// (login / use the app)
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		// create new user object and get the attributes
		OAuth2User oauthUser = super.loadUser(userRequest);
		Map<String, Object> attributes = oauthUser.getAttributes();

//		String clientRegistrationId = userRequest.getClientRegistration()
		String username = oauthUser.getName();
//		refreshAccessToken(clientRegistrationId, username);
		String imgSource = null;
		if (((ArrayList<LinkedHashMap<String, String>>) attributes.get("images")).size() > 0) {

			try {
				// Map -> ArrayList -> LinkedHashMap -> String
				imgSource = ((LinkedHashMap<String, String>) ((ArrayList<LinkedHashMap<String, String>>) attributes
						.get("images")).get(0)).get("url"); // get first image for your spotify account..
			} catch (Exception e) {
				System.err.println(
						"user has no profile photo, not sure what error will look like. feel free to delete this ");
				e.printStackTrace();
			}
		}
		User user = userRepo.findByUsername(username);

		// check if user is in database, register new user or update image
		if (user != null) {
			user.setImgSource(imgSource);
			userRepo.saveAndFlush(user);
		} else {
			User newUser = new User();
			newUser.setEnabled(true);
			newUser.setImgSource(imgSource);
			newUser.setUsername(username);
			Rank rank = rankRepo.findById(1).get();
			newUser.setRank(rank);
			userRepo.saveAndFlush(newUser);
		}
		return oauthUser;
	}
//	
//	private void refreshAccessToken(String id, String username){
//		System.out.println(id);
//		System.out.println(username);
//		OAuth2AuthorizedClient authorizedClient = clientService.loadAuthorizedClient(id, username);
//		System.out.println("After: " + authorizedClient.getAccessToken());
//		OAuth2RefreshTokenGrantRequest grantRequest = new OAuth2RefreshTokenGrantRequest(
//				authorizedClient.getClientRegistration(), 
//				authorizedClient.getAccessToken(), 
//				authorizedClient.getRefreshToken());
//		
//		DefaultRefreshTokenTokenResponseClient refreshResponseClient = new DefaultRefreshTokenTokenResponseClient();
//		refreshResponseClient.getTokenResponse(grantRequest).getAccessToken();
//		System.out.println("After: " + authorizedClient.getAccessToken());
//	}
}

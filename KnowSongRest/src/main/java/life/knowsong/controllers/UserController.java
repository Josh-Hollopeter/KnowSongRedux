package life.knowsong.controllers;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.endpoint.DefaultRefreshTokenTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2RefreshTokenGrantRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import life.knowsong.entities.User;
import life.knowsong.repositories.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/user")
    public User user(@AuthenticationPrincipal OAuth2User principal) {
		Optional<User> optionalUser = userRepo.findById(principal.getName());
		if(optionalUser.isPresent()) {
			return optionalUser.get();
		} else {
			return null;
		}
    }

	@GetMapping("/getAccessToken")
	public OAuth2AccessToken accessToken(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
		return authorizedClient.getAccessToken();
	}
	
	@GetMapping("/refreshAccessToken")
	public OAuth2AccessToken refreshAccessToken(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
		
		OAuth2RefreshTokenGrantRequest grantRequest = new OAuth2RefreshTokenGrantRequest(
				authorizedClient.getClientRegistration(), 
				authorizedClient.getAccessToken(), 
				authorizedClient.getRefreshToken());
		
		DefaultRefreshTokenTokenResponseClient refreshResponseClient = new DefaultRefreshTokenTokenResponseClient();
		
		return refreshResponseClient.getTokenResponse(grantRequest).getAccessToken();
	}
	
	@GetMapping("/isLoggedIn")
	public Boolean isLoggedIn(@AuthenticationPrincipal OAuth2User principal, HttpServletResponse response) {
		if(principal != null) {
			response.setStatus(200);
			return true;
		}else {
			response.setStatus(401);
			return false;
		}
	}
	
}

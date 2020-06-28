package life.knowsong.buildgame;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import life.knowsong.data.SpotifyDataClient;
import life.knowsong.entities.Album;
import life.knowsong.entities.Artist;
import life.knowsong.entities.SingleplayerGame;
import life.knowsong.entities.SingleplayerQuestion;
import life.knowsong.entities.SingleplayerQuestionId;
import life.knowsong.entities.Track;

@Service
public class BuildAudioGame {

	@Autowired
	SpotifyDataClient spotifyData;

	public SingleplayerGame build(String artistId, String accessToken, String gameType, boolean explicit) {
		Artist artist = spotifyData.getArtist(accessToken, artistId);

		Set<Album> albums = artist.getAlbums();
		Map<String, Track> trackMap = new HashMap<>();
		// put all tracks into list
		for (Album album : albums) {
			for (Track track : album.getTracks()) {
				// Spotify SEEMS to use a standard notation for live and remade versions of
				// songs
				// To avoid building questions with live vs studio quality versions of songs,
				// I've decided to remove any track that contains ' - ' OR '(Live ..' in the
				// title
				// Example: 'Song - Live In ..', 'Song - Remastered', 'Song - 2013 Mix' 'Song
				// (Live at ..)'
				if (track.getName().contains(" - ") || track.getName().contains("(Live")) {
					continue;
				}
				trackMap.put(track.getName(), track);
			}
		}

		if (trackMap.size() < 6) {
			return null; // not enough tracks for artist, choose a different artist
		}

		// create new game
		SingleplayerGame game = new SingleplayerGame();
		game.setArtist(artist.getName());
		game.setGameType(gameType);
		
		// get track names and shuffle
		List<String> trackNames = new ArrayList<String>(trackMap.keySet());
		Collections.shuffle(trackNames);
		
		// build 5 questions
		for (int x = 0; x < 5; x++) {
			SingleplayerQuestion question = new SingleplayerQuestion();
			SingleplayerQuestionId questionId = new SingleplayerQuestionId();
			questionId.setNum(x+1);	// will give game and user id upon completion of game
			question.setId(questionId); // the question number
			question.setQuestionText(trackMap.get(trackNames.get(x)).getPreviewUrl()); // get preview url from key mapping
			String answer = trackNames.get(x);
			question.setAnswer(answer);
			question.setAnswerHref(trackMap.get(answer).getHref());

			// get 3 random indexes

			// -----------------------------------------------------
			// random number generator between 0 and size of track list
			int range = trackNames.size();
			int intArray[] = new int[3];
			for (int y = 0; y < 3; y++) {
				int random;
				boolean flag = true;
				// conditions ensure answer is not duplicated & options are not duplicate
				while(flag){
					random = (int) (Math.random() * range);
					if(random == x) {
						continue;
					}
					if(random == intArray[0]){
					    continue;
					}
					    
					if(random == intArray[1]){
					    continue;
					}
					flag = false;	// no infinite loop please
					intArray[y] = random;
				}	
				
			}
			// -----------------------------------------------------
			question.setOption2(trackNames.get(intArray[0]) );
			question.setOption3(trackNames.get(intArray[1]) );
			question.setOption4(trackNames.get(intArray[2]) );
			game.addQuestion(question);
		}
		// get the album for each track

		return game;
	}
}

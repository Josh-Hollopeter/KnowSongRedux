package life.knowsong.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import life.knowsong.entities.Artist;
import life.knowsong.repositories.ArtistRepository;

@Service
public class SpotifyDataServiceImpl implements SpotifyDataService {

	// REPOSITORIES
	
	@Autowired
	private ArtistRepository artistRepo;
	
	//-----------------------------------------------
	//       ARTIST METHODS
	//------------------------------------------------
	
	@Override
	public List<Artist> listAllArtists() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Artist findArtistById(String id) {
		Optional<Artist> optionalArtist = artistRepo.findById(id);
		
		if(optionalArtist.isPresent()) {
			Artist artist = optionalArtist.get();
			return artist;
		}
		
		return null;
	}

	
	//-----------------------------------------------
	//       ALBUM METHODS
	//------------------------------------------------
}

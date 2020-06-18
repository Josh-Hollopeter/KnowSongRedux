package life.knowsong.data;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Service;

import com.neovisionaries.i18n.CountryCode;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.AlbumSimplified;
import com.wrapper.spotify.model_objects.specification.ArtistSimplified;
import com.wrapper.spotify.model_objects.specification.Image;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.TrackSimplified;
import com.wrapper.spotify.requests.data.albums.GetAlbumsTracksRequest;
import com.wrapper.spotify.requests.data.artists.GetArtistRequest;
import com.wrapper.spotify.requests.data.artists.GetArtistsAlbumsRequest;

import life.knowsong.entities.Album;
import life.knowsong.entities.Artist;
import life.knowsong.entities.Genre;
import life.knowsong.entities.Track;
import life.knowsong.repositories.ArtistRepository;
import life.knowsong.repositories.GenreRepository;

@Transactional
@Service
public class SpotifyDataClientImpl implements SpotifyDataClient {

	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private ArtistRepository artistRepo;
	
	@Autowired
	private GenreRepository genreRepo;
	
	private SpotifyApi spotifyApi;
	
	@Override
	public List<Artist> listAllArtists() {
		return artistRepo.findAll();
	}
	
	private Artist populateArtistAlbumsToJavaMemory(String artistId) {
		Optional<Artist> optionalArtist = artistRepo.findById(artistId);
		Artist artist = null;
		if(optionalArtist.isPresent()) {
			// artist exists, pull their albums as well
			String jpql = "SELECT a FROM Artist a JOIN FETCH a.albums WHERE a.id = :artistId";
			artist = em.createQuery(jpql, Artist.class)
					.setParameter("artistId", artistId)
					.getResultList()
					.get(0);
		}
		return artist;
	}
	
	@Override
	public Artist getArtist(String accessToken, String artistId) {
		this.spotifyApi = new SpotifyApi.Builder()
				.setAccessToken(accessToken)
				.build();
		
		Artist artist = this.populateArtistAlbumsToJavaMemory(artistId);
		
		if(artist != null && artist.isTriviaReady()) { // null pointer on 2nd is avoided by && operand
			// artist is in db with albums populated
			return artist;
		}
		else if (artist != null){
			// artist exists but has only a few albums by relation to another artist's pull
			
			Set<Album> albums = artist.getAlbums();	// WHY: by saving the list of albums already in database, we can prevent more sql calls later
			
			if(!albums.isEmpty()) {
				// artist has albums
				List<String> albumIds = new ArrayList<String>();
				
				albums.forEach( album -> {
					albumIds.add( album.getId() );
				});
				
				System.out.println("Beginning persistence of all albums for existing artist with n albums!");
				try {
					int offset = 0;	// first call's offset is 0 (for more than 50 artist albums)
					this.getAllAlbumsFromArtist(artist, offset, albumIds);	
				} catch (org.apache.hc.core5.http.ParseException e) {
					e.printStackTrace();
				}
			} else {
				// artist doesn't have albums
				System.out.println("Beginning persistence of all albums for existing artist with no albums!");
				try {
					int offset = 0;	// first call's offset is 0 (for more than 50 artist albums)
					this.getAllAlbumsFromArtist(artist, offset, null);	
				} catch (org.apache.hc.core5.http.ParseException e) {
					e.printStackTrace();
				}
			}
			em.refresh(artist);
			System.out.println("Refresh Artist");
			return artist;
			
			
		} else {
			// artist is not in db
			
			System.out.println("Beginning persistence of new artist!");
			artist = this.buildNewArtist(artistId);	// new artist
			
			System.out.println("Beginning persistence of all albums for new artist!");
			try {
				int offset = 0;	// first call's offset is 0 (for more than 50 artist albums)
				this.getAllAlbumsFromArtist(artist, offset, null);	
			} catch (org.apache.hc.core5.http.ParseException e) {
				e.printStackTrace();
			}
			System.out.println("Refresh Artist");
			em.refresh(artist);
			return artist;
		}
	}
	
	//
	// triviaReady is necessary because when grabbing albums, we also populate artists for that album.
	// if we populated albums for every artist associated with an album.. well, thats an infinite loop.
	// therefore, when searching through artist collection, we will have many artists, but only some will be ready for trivia
	// NOTE: having a large collection of artists and genres will provide us with a recommendations capability in the future!
	//
	private Artist buildNewArtist(String artistId) {
		 
		
		GetArtistRequest getArtistRequest = spotifyApi.getArtist(artistId)
			    .build();
		Artist artist = new Artist();
		
		try {
		      com.wrapper.spotify.model_objects.specification.Artist fullArtist = null;
			try {
				fullArtist = getArtistRequest.execute();
			} catch (org.apache.hc.core5.http.ParseException e1) {
				e1.printStackTrace();
			}
		      
		      artist.setTriviaReady(false); // IS THIS ARTIST ALSO GETTING ALBUMS STORED? // depends on the parameter, if(true) store albums else don't
			  artist.setId(artistId);
		      artist.setName(fullArtist.getName());
		      Image[] image = fullArtist.getImages();
		      try {
			      artist.setImgSource(image[0].getUrl());
		      } catch(Exception e) {
		    	  e.printStackTrace();
		      }
		      artist.setPopularity(fullArtist.getPopularity());
		      artist.setCreated(new Timestamp(new Date().getTime()));
		      artist.setLastUpdated(new Timestamp(new Date().getTime()));
		      
		      em.persist(artist);	// register primary key before mapping genres
		      fullArtist.getGenres();
		      String[] genresUnparsed = fullArtist.getGenres();
		      // genres are persisted through cascade effect with new artist
		      for ( String x :genresUnparsed ) {
		    	  Optional<Genre> managedGenre = this.genreRepo.findById(x);
		    	  
		    	  //check if genre stored
		    	  if(managedGenre.isPresent()) {
		    		 Genre storedGenre = managedGenre.get();
		    		 artist.addGenre(storedGenre);
		    		 em.persist(storedGenre);
		    	  } else {
		    		  Genre genre = new Genre();
			    	  genre.setName(x);
			    	  artist.addGenre(genre);
			    	  em.persist(genre);
		    	  }
		    	  
		      }
		      em.persist(artist);
		      System.out.println(artist.getName() + " has been added to the collection.");
		    } catch (IOException | SpotifyWebApiException | ParseException e) {
		      System.out.println("Error: " + e.getMessage());
		    }
		em.flush();
		return artist;
	}
	
	private void getAllAlbumsFromArtist(Artist artist, int offset, List<String> albumIds) throws org.apache.hc.core5.http.ParseException {
		GetArtistsAlbumsRequest getArtistsAlbumsRequest = this.spotifyApi
				.getArtistsAlbums(artist.getId())
				.album_type("album,single")
				.limit(50)
				.offset(offset)
				.market(CountryCode.US)
				.build();
		
		//Issue:
		// There is a legacy bug in spotify code...
		// When pulling Deluxe, Super Deluxe, and regular versions of an album
		// There are songs that are posted as seperate tracks, but contain the same ID.
		// This breaks our persistence. 
		// A spotify employee responds here
		// https://stackoverflow.com/questions/32019376/spotify-api-same-music-with-differents-ids-in-app-get-the-same-ids-from-api
		//My Solution:
		// Add albums with tracks to a List.
		// Before persisting each album in the list
		// Check if any albums contain the word Deluxe Edition or Super Deluxe
		//Thoughts: 
		// Realistically for the purposes of Trivia, we won't be using the various live and remixed versions
		// and will focus mainly on the original songs for the simplicity of questions.
		// I mean, will someone know the difference, or care to know the difference between the San Francisco live version vs the New York Live version?? etc.
		// In some cases the super deluxe version will contain new and novel songs but most are remakes of the same releases.
		List<Album> albums = new ArrayList<Album>();
		try {
			Paging<AlbumSimplified> pagingAlbums = null;
			try {
				pagingAlbums = getArtistsAlbumsRequest.execute();	// HTTP Request to Spotify API
			} catch (org.apache.hc.core5.http.ParseException e1) {
				e1.printStackTrace();
			}
			
			// recursion for getting all albums and singles
			// ---------------------------------------
				// if there is another page of items, call method again.
				if(pagingAlbums.getNext() != null) {
					int newOffset = offset + 50;
					getAllAlbumsFromArtist(artist, newOffset, albumIds);	// add 50 until total IE: (0 -> 50 -> 100 -> 112(done) )
				}
			// ---------------------------------------
			
			AlbumSimplified[] simplifiedAlbums = pagingAlbums.getItems();
			parseAlbums: 
			for(int x = 0; x < simplifiedAlbums.length; x++) {
				AlbumSimplified sa = simplifiedAlbums[x];
		// check if album is already stored via list of stored album id's
				if (albumIds != null) {
					for(String id : albumIds) {
						if(id.equals(sa.getId())) {
							System.out.println("DUPLICATE ALBUM");
							continue parseAlbums;
						}
							
					}
				}
				String albumName = sa.getName();	// performance instead of calling object 3 times :p
				// Remove the Deluxe Edition OR Super Deluxe album types for 2 reasons said above
				if(albumName.contains("Deluxe Edition") || albumName.contains("Super Deluxe")) {
					continue parseAlbums;
				}
					
				
				Album album = new Album();
				album.setId(sa.getId());
				album.setName(albumName);
				
				Image[] image = sa.getImages();
			    try {
			    	album.setImgSource(image[0].getUrl());
			    } catch(Exception e) {
			    	e.printStackTrace();
			    }
			    album.setType(sa.getAlbumType().getType());
			    album.setReleaseDate(sa.getReleaseDate());
			    album.setReleaseDatePrecision(sa.getReleaseDatePrecision().precision);
			    album.setCreated(new Timestamp(new Date().getTime()));
			    
			    // IF MARKET IS SPECIFIED, OBJECT IS "is_local: false;"
//			    CountryCode[] codes = sa.getAvailableMarkets();
//			    Set<AvailableMarkets> markets = new HashSet<>();
//			    for ( CountryCode c : codes ) {
//			    	AvailableMarkets market = new AvailableMarkets();
//			    	market.setMarket(c.getAlpha2());
//			    	markets.add(market);
//			    }
//			    album.setMarkets(markets);
			    
			    ArtistSimplified[] simplifiedArtists = sa.getArtists();
			    
			    // gather associated artists (another HTTP to spotify server)
			    artist.setTriviaReady(true);
				album.addArtist(artist);	//add the primary artist
			    
			    for(ArtistSimplified sas : simplifiedArtists) {
			    	//ignore the main artist
			    	if(sas.getId() != artist.getId()) {
			    		Optional<Artist> managedArtist = this.artistRepo.findById(sas.getId());
			    		if(managedArtist.isPresent()) {
			    			Artist storedNonPrimaryArtist = managedArtist.get();
			    			album.addArtist(storedNonPrimaryArtist);
			    		} else {
			    			Artist newArtist = this.buildNewArtist(sas.getId());
			    			album.addArtist(newArtist);
			    		}
			    	}
			    }
			    
			    // now get all tracks :) (another HTTP to spotify server)
			    Set<Track> tracks = this.getAllTracksFromAlbum(album);
			    album.setTracks(tracks);
			    em.persist(album);
			}
			
		} catch (IOException | SpotifyWebApiException | ParseException e) {
		      System.out.println("Error: " + e.getMessage());
		}
		
	}
	
	private Set<Track> getAllTracksFromAlbum(Album album) throws org.apache.hc.core5.http.ParseException {
		GetAlbumsTracksRequest getAlbumsTracksRequest = this.spotifyApi.getAlbumsTracks(album.getId())
				.limit(50)	// ever see an album with more than 50 tracks? i haven't. . . 
				.offset(0)
				.market(CountryCode.US)
				.build();
		Set<Track> tracks = new LinkedHashSet<Track>();
		try {
		      Paging<TrackSimplified> trackSimplifiedPaging = getAlbumsTracksRequest.execute();
		      TrackSimplified[] st = trackSimplifiedPaging.getItems();
		      
		      for( int x = 0; x < st.length; x++ ) {
		    	  TrackSimplified ts = st[x];
		    	  Track track = new Track();
		    	  track.setId(ts.getId());
		    	  track.setName(ts.getName());
		    	  track.setPreviewUrl(ts.getPreviewUrl());
		    	  track.setExplicit(ts.getIsExplicit());
//		    	  track.setPopularity(ts.get);	// simple object doesn't provide popularity :/
		    	  track.setDurationMs(ts.getDurationMs());
		    	  track.setCreated(new Timestamp(new Date().getTime()));
		    	  track.setAlbum(album);
		    	  tracks.add(track);
		    	  System.out.println(track.getName() + " ID: " + track.getId());
		      }
		      
		      System.out.println("Added <" + trackSimplifiedPaging.getTotal() + "> tracks.");
		    } catch (IOException | SpotifyWebApiException | ParseException e) {
		      System.out.println("Error: " + e.getMessage());
		    }
		return tracks;
	}
	

	// 
	// For artists with new album releases
	// must add tables. to be added later.
	//
}

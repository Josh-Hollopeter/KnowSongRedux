package life.knowsong.data;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityManager;
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
		//leaving this here because its a nice query, but LAZY Loading made it unnecessary :)
//		String jpql = "SELECT a.id AS id, a.name AS name, a.img_source AS imgSource, a.last_updated AS lastUpdated, a.popularity AS popularity, g.name AS genres"
//				+ "FROM Artist a " + "JOIN artist_genre ag ON a.id = ag.artist_id "
//				+ "JOIN Genre g ON ag.genre_name = g.name";
//
//		List<SimpleArtist> simpleArtists = em.createQuery(jpql, SimpleArtist.class).getResultList();
		
	}
	
	private boolean isArtistStoredAndTriviaReady(String artistId) {
		String jpql = "SELECT COUNT(*) FROM Artist a WHERE a.id = :spotifyId";
		List<Long> isPresent = em.createQuery(jpql, Long.class).setParameter("spotifyId", artistId).getResultList();
		if (isPresent.get(0) > 0) {
			String jpql2 = "SELECT trivia_ready FROM Artist a WHERE a.id = :spotifyId";
			List<Boolean> ready = em.createQuery(jpql2, Boolean.class).setParameter("spotifyId", artistId).getResultList();
			return ready.get(0);
		} else {
			return false;
		}
	}


	@Override
	public Artist getArtist(String accessToken, String artistId) {

		if(this.isArtistStoredAndTriviaReady(artistId)) {
			return em.find(Artist.class, artistId);
		} else {
			this.spotifyApi = new SpotifyApi.Builder()
					.setAccessToken(accessToken)
					.build();
			
			System.out.println("Beginning persistence of new artist!");
			Artist artist = this.buildNewArtist(artistId, true);
			
			System.out.println("Beginning persistence of all albums!");
			try {
				int offset = 0;	// first call's offset is 0 (for more than 50 artist albums)
				this.getAllAlbumsFromArtist(artist, offset);	
			} catch (org.apache.hc.core5.http.ParseException e) {
				e.printStackTrace();
			}
			return artist;
		}
	}
	
	//
	// triviaReady is necessary because when grabbing albums, we also populate artists for that album.
	// if we populated albums for every artist associated with an album.. well, thats an infinite loop.
	// therefore, when searching through artist collection, we will have many artists, but only some will be ready for trivia
	// NOTE: having a large collection of artists and genres will provide us with a recommendations capability in the future!
	//
	private Artist buildNewArtist(String artistId, boolean triviaReady) {
		 
		
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
		      
		      artist.setTriviaReady(triviaReady); // IS THIS ARTIST ALSO GETTING ALBUMS STORED? // depends on the parameter, if(true) store albums else don't
		      artist.setId(artistId);
		      artist.setName(fullArtist.getName());
		      Image[] image = fullArtist.getImages();
		      try {
			      artist.setImgSource(image[0].getUrl());
		      } catch(Exception e) {
		    	  e.printStackTrace();
		      }
		      artist.setHref(fullArtist.getHref());
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
		return artist;
	}
	
	private void getAllAlbumsFromArtist(Artist artist, int offset) throws org.apache.hc.core5.http.ParseException {
		GetArtistsAlbumsRequest getArtistsAlbumsRequest = this.spotifyApi
				.getArtistsAlbums(artist.getId())
				.album_type("album,single")
				.limit(50)
				.offset(offset)
				.market(CountryCode.US)
				.build();

		try {
			Paging<AlbumSimplified> pagingAlbums = null;
			try {
				pagingAlbums = getArtistsAlbumsRequest.execute();	// HTTP Request to Spotify API
			} catch (org.apache.hc.core5.http.ParseException e1) {
				e1.printStackTrace();
			}
			AlbumSimplified[] simplifiedAlbums = pagingAlbums.getItems();
			
		// recursion for getting all albums and singles
		// ---------------------------------------
			// if there is another page of items, call method again.
			if(pagingAlbums.getNext() != null) {
				int newOffset = offset + 50;
				getAllAlbumsFromArtist(artist, newOffset);	// add 50 until total IE: (0 -> 50 -> 100 -> 112(done) )
			}
		// ---------------------------------------
			
			for(int x = 0; x < simplifiedAlbums.length; x++) {
				AlbumSimplified sa = simplifiedAlbums[x];
				Album album = new Album();
				album.setId(sa.getId());
				album.setName(sa.getName());
				
				Image[] image = sa.getImages();
			    try {
			    	album.setImgSource(image[0].getUrl());
			    } catch(Exception e) {
			    	e.printStackTrace();
			    }
			    
			    album.setType(sa.getType().type);
			    album.setReleaseDate(sa.getReleaseDate());
			    album.setReleaseDatePrecision(sa.getReleaseDatePrecision().precision);
			    album.setHref(sa.getHref());
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
			    album.addArtist(artist);	//add the primary artist
			    for(ArtistSimplified sas : simplifiedArtists) {
			    	//ignore the main artist
			    	if(sas.getId() != artist.getId()) {
			    		Optional<Artist> managedArtist = this.artistRepo.findById(sas.getId());
			    		if(managedArtist.isPresent()) {
			    			Artist storedArtist = managedArtist.get();
			    			album.addArtist(storedArtist);
			    		} else {
			    			Artist newArtist = this.buildNewArtist(sas.getId(), false);
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
		    	  track.setHref(ts.getHref());
		    	  track.setDurationMs(ts.getDurationMs());
		    	  track.setCreated(new Timestamp(new Date().getTime()));
		    	  track.setAlbum(album);
		    	  tracks.add(track);
		      }
		      
		      System.out.println("Added <" + trackSimplifiedPaging.getTotal() + "> tracks.");
		    } catch (IOException | SpotifyWebApiException | ParseException e) {
		      System.out.println("Error: " + e.getMessage());
		    }
		return tracks;
	}
	
}

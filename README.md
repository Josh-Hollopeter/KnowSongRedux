# Know Song | A Spotify Trivia Web Application

- Josh Hollopeter
- Neal Savant

### Overview
A RESTful web application using Musixmatch and Spotify API to generate trivia questions on music artists. A user can log in through spotify using OAuth2 setup in Spring Security. Artist information is stored in the database for the purpose of developing questions for users, with the additional functionality of limiting external API requests. Database also keeps track of all games played.

Note: We are not UI designers, but did our best.

Note 2:  This application is intended for premium Spotify accounts due to licensing issues with record labels.

Game modes include:

- Identify song from 30 second audio segment

- Identify song from lyrics (currently not available due to rate limiting issues)

### Data Flow
![Diagram.png](https://user-images.githubusercontent.com/55298338/90298411-6d8d9780-de4f-11ea-8d6e-bfa2749edad0.png)

### Database (New v 1.0 Release)
Simplified the question and game history storage with expansion for multiplayer in mind. More noticeably, storage of Spotify media metadata is implemented. This is a necessary transition due to the limitations of API requests. Client side instances will check the database for artist information before hitting Spotify's API.
![Database.png](https://user-images.githubusercontent.com/55298338/86310676-dab8d680-bbdb-11ea-8e37-14d16a3070be.png)

### Technologies and Development Techniques
- Java 8
- TypeScript
- Javascript
- Angular 10
- Spring REST
- Spring Boot
- Spring Security
- Java Persistence API (JPA)
- SQL
- MySQL Workbench
- OAuth2
- HTML / CSS
- Gradle
- Postman: API Testing
- JUnit 5: Test Driven Java Development
- Apache Tomcat
- AWS EC2
- Github/Git: Version Control
- Agile Development
# Gameplay Photos
## Searching for an Artist using Spotify's catalogue
![ArtistSearch.png](https://user-images.githubusercontent.com/55298338/87256634-a4881c00-c451-11ea-84f7-4b241542025f.PNG)

## Dynamically generated questions using the artist's full music catalogue
![Game.png](https://user-images.githubusercontent.com/55298338/87256637-a94cd000-c451-11ea-8458-e73c198869d4.PNG)

## A user's game history page
![GameHistory.png](https://user-images.githubusercontent.com/55298338/87256636-a6ea7600-c451-11ea-9b23-3b34d470d006.PNG)

## Future Versions

- Web Socket Application Layer Protocol
  - Multiplayer Trivia
- Clean up and overhaul CSS (In progress v 1.0)
- Achievements and Statistics
- Game logic improvements (In progress v 1.0)
- All changes will be updated with stable release.

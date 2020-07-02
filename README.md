## Know Song | A Spotify Trivia Web Application

- Josh Hollopeter
- Neal Savant

### Overview
A RESTful web application using Musixmatch and Spotify API to generate trivia questions on music artists. A user can log in through spotify using OAuth2 setup in Spring Security. Artist information is stored in the database for the purpose of developing questions for users, with the additional functionality of limiting external API requests. Database also keeps track of all games played.
Note: We are not UI designers, but did our best.

Game modes include:

- Identify song from 30 second audio segment

- Identify song from lyrics (currently not available due to rate limiting issues)

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
- OAuth2
- HTML / CSS
- Gradle
- Postman: API Testing
- JUnit 5: Test Driven Java Development
- Apache Tomcat
- AWS EC2
- Github/Git: Version Control
- Agile Development

### Database (New v 1.0 Release)
Simplified the question and game history storage with expansion for multiplayer in mind. More noticeably, storage of Spotify media metadata is implemented. This is a necessary transition due to the limitations of API requests. Client side instances will check the database for artist information before hitting Spotify's API.
![Database.png](https://user-images.githubusercontent.com/55298338/86310676-dab8d680-bbdb-11ea-8e37-14d16a3070be.png)

### Future Versions

- Web Socket Application Layer Protocol
  - Multiplayer Trivia
- Clean up and overhaul CSS (In progress v 1.0)
- Achievements and Statistics
- Game logic improvements (In progress v 1.0)
- All changes will be updated with stable release.

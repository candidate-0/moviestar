const Actor = require("./Actor");

class Movie {
  constructor(movie, cast) {
    // adult
    // genre_ids
    // original_title
    // original_language
    // backdrop_path
    // popularity
    // vote_count
    // video
    // vote_average

    this.id = movie.id;
    this.title = movie.title;
    this.posterURL = "http://image.tmdb.org/t/p/w300/" + movie.poster_path;
    this.overview = movie.overview;
    this.releaseDate = movie.release_date;
    this.revenue = movie.revenue;
    this.runtime = movie.runtime;

    if (cast) {
      this.cast = cast.map((actor) => new Actor(actor));
    }
  }
}

module.exports = Movie;

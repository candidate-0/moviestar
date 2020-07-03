const Actor = require("./Actor");

class Movie {
  constructor(movie, cast) {
    this.id = movie.id;
    this.title = movie.title;
    this.overview = movie.overview;
    this.releaseDate = movie.release_date;
    this.revenue = movie.revenue;
    this.runtime = movie.runtime;

    if (movie.poster_path) {
      this.posterURL = "http://image.tmdb.org/t/p/w300/" + movie.poster_path;
    }

    if (cast) {
      this.cast = cast.map((actor) => new Actor(actor));
    }
  }
}

module.exports = Movie;

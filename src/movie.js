class Movie {
  constructor(json) {
    // poster_path
    // adult
    // overview
    // release_date
    // genre_ids
    // original_title
    // original_language
    // title
    // backdrop_path
    // popularity
    // vote_count
    // video
    // vote_average

    this.id = json.id;
    this.title = json.title;
  }
}

module.exports = Movie;

const fetch = require("cross-fetch");
const Movie = require("./movie");

class TMDbClient {
  static baseURL = "https://api.themoviedb.org/3";

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async popular() {
    return await this.request.data.results.map((movie) => new Movie(movie));
  }

  async request(path) {
    const response = await fetch(
      `${TMDbClient.baseURL}${path}?api_key=${this.apiKey}`
    );

    if (response.status !== 200) {
      throw "TODO";
    }

    return await response.json();
  }
}

module.exports = TMDbClient;

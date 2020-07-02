const fetch = require("cross-fetch");
const Movie = require("./movie");

class TMDbClient {
  static baseURL = "https://api.themoviedb.org/3";

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async popular() {
    const data = await this.request("/movie/popular");

    return data.results.map((movie) => new Movie(movie));
  }

  async movie(id) {
    const data = await this.request(`/movie/${id}`);

    return new Movie(data);
  }

  async request(path) {
    const response = await fetch(
      `${TMDbClient.baseURL}${path}?api_key=${this.apiKey}`
    );

    if (response.status !== 200) {
      console.error(response);

      throw "TODO";
    }

    return await response.json();
  }
}

module.exports = TMDbClient;

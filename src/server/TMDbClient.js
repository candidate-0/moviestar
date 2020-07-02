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

  async search(query) {
    const data = await this.request(`/search/movie`, {
      query,
    });

    return data.results.map((movie) => new Movie(movie));
  }

  async request(path, params = {}) {
    let url = `${TMDbClient.baseURL}${path}?api_key=${this.apiKey}`;

    for (const [key, value] of Object.entries(params)) {
      url = `${url}&${key}=${value}`;
    }

    const response = await fetch(url);

    if (response.status !== 200) {
      console.error(response);

      throw "TODO";
    }

    return await response.json();
  }
}

module.exports = TMDbClient;

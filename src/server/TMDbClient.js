const fetch = require("cross-fetch");
const Movie = require("./movie");
const LRU = require("lru-cache");

class TMDbClient {
  static baseURL = `https://api.themoviedb.org/3`;

  constructor(apiKey, baseURL = TMDbClient.baseURL) {
    this.cache = new LRU(100);
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  async popular() {
    const data = await this.request("/movie/popular");

    return data.results.map((movie) => new Movie(movie));
  }

  async movie(id) {
    const [data, credits] = await Promise.all([
      this.request(`/movie/${id}`),
      this.request(`/movie/${id}/credits`),
    ]);

    return new Movie(data, credits.cast);
  }

  async search(query) {
    const data = await this.request(`/search/movie`, {
      query,
    });

    return data.results.map((movie) => new Movie(movie));
  }

  async request(path, params = {}) {
    let url = `${this.baseURL}${path}?api_key=${this.apiKey}`;

    for (const [key, value] of Object.entries(params)) {
      url = `${url}&${key}=${value}`;
    }

    return await this.fetchFromCache(url);
  }

  async fetchFromCache(url) {
    if (this.cache.has(url)) {
      console.debug(`Cache hit for URL: ${url}`);

      return this.cache.get(url);
    } else {
      console.debug(`Cache miss for URL: ${url}`);

      const response = await fetch(url);

      if (response.status !== 200) {
        console.error("Error from TMDb API");
        console.error(response);

        throw "TODO";
      }

      const data = response.json();

      this.cache.set(url, data);

      return data;
    }
  }
}

module.exports = TMDbClient;

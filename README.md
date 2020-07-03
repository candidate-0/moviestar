# 🍿 Moviestar

Simple TMDb browser, created for
[Lattice](https://gist.github.com/andrewhubbs/74084457bf74f136605d0346f932c85b).

## Usage

A relatively modern Node version and TMDb API key are required. The application
has no external service dependencies.

```sh
sed 's/__key__/[your key]/' .env.example > .env
yarn
yarn start
curl -I localhost:8080
```

## Tests

```sh
yarn test

# To enable live API requests and re-record snapshots:
RECORD=1 yarn test -u
```

## Points of interest

- The backend is a GraphQL API using Apollo server and the frontend uses the
  Apollo client and React bindings.
- API requests are proxied through `webpack-dev-server` to the backend.
- CSS is provided by [twin.macro](https://github.com/ben-rogerson/twin.macro),
  a babel macro that converts Tailwind utility class names to
  [Emotion](https://emotion.sh) styled components.
- API connectivity implements an in-memory LRU cache. In production this should
  be replaced by a shared networked cache (e.g. memcached, Redis).
- The API is tested using Jest snapshots, mostly because it was a cool concept
  I was excited to try out. Sample API responses are available in the
  `test/__snapshots__` directory.
- Tests use a mocked backend via [talkback](https://github.com/ijpiantanida/talkback) by default to prevent failures due to network connectivity or upstream
  data updates.
- I have anonymized the commit data on request.

## Not implemented

- There is no transpilation or hot reloading on the server. Given the time constraints, this would have taken too long to implement.
- Code is very loosely organized, representing the small nature of the
  project.
- There is no server-side rendering of the React tree. I'm a huge
  proponent of this so it somewhat pains me to have to leave it out.
- There is no component, end-to-end or visual testing.
- There is no pagination of the popularity sort or searches.
- There are likely some UI bugs with responsivity and missing data states.
- Accessibility was largely not considered.

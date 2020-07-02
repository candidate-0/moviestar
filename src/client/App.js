import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Popular from "./Popular";
import Movie from "./Movie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql",
});

const NotFound = () => <h1>Not found :(</h1>;

const App = () => (
  <ApolloProvider client={client}>
    <h1>🍿 Moviestar</h1>
    <Router>
      <Switch>
        <Route exact path="/" children={<Popular />} />
        <Route path="/movie/:id" children={<Movie />} />
        <Route path="*" children={<NotFound />} />
      </Switch>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("mstar"));

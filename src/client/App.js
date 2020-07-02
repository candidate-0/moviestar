import "tailwindcss/dist/base.min.css";
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Popular from "./Popular";
import Movie from "./Movie";
import Search from "./Search";
import NotFound from "./NotFound";
import Shell from "./Shell";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql",
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Shell>
        <Switch>
          <Route exact path="/" children={<Popular />} />
          <Route path="/search" children={<Search />} />
          <Route path="/movie/:id" children={<Movie />} />
          <Route path="*" children={<NotFound />} />
        </Switch>
      </Shell>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("mstar"));

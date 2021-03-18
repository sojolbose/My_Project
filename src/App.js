import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client"
import {onError} from "@apollo/client/link/error"
import {
  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Continents from "./Components/Continents"
import ContinentDetails from "./Components/ContinentDetails"


const errorLink = onError(({graphqlErrors, networkError})=>{
  if (graphqlErrors){
    graphqlErrors.map(({message, location, path})=>(
      alert(`GraphQL error: ${message}`)
    )) 
  }
})

const link = from([
  errorLink,
  new HttpLink({
    uri: "https://countries.trevorblades.com/"
  })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          {/* <Continents /> */}
          {/* <ContinentDetails /> */}
          <Switch>
            <Route exact path="/">
              <Continents />
            </Route>
            <Route path="/:continentName" component={ContinentDetails} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
    
    
  );
}

export default App;

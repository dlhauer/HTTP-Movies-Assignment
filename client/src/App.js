import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect( () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        // console.log(res.data);
        setMovies(res.data);
      })
      .catch( err => console.log(err))
  },[])

  return (
    <>
      <SavedList list={savedList} />
      <Route 
        exact
        path="/"
        render={ props => {
          return <MovieList movies={movies} />
        }}
        />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} updateMovies={setMovies} movies={movies}addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
        path='/update-movie/:id'
        render={props => {
          return <UpdateMovie {...props} movies={movies} updateMovies={setMovies}/>
        }}
        />
    </>
  );
};

export default App;
